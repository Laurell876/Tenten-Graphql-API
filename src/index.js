const {
  ApolloServer,
  gql,
  PubSub,
  withFilter,
} = require("apollo-server-express");

require('dotenv').config() // pull env variables from .env file
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const typeDefs = require("./schema.graphql");
const isAuth = require("./middleware/is-auth");
const express = require("express");
const connect = require("./db.js");
const cors = require("cors");
const Listing = require("./resolvers/Listing");
const User = require("./resolvers/User");
const Review = require("./resolvers/Review");
const Chat = require("./resolvers/Chat");
const Message = require("./resolvers/Message");
const http = require("http");
const jwt = require("jsonwebtoken");
const isAuthSubscription = require("./middleware/is-auth-subscription");
require("dotenv/config");
const cookieParser = require("cookie-parser");

const pubsub = new PubSub();
const { createRefreshToken } = require("../auth_v2");
const { createAccessToken } = require("../auth_v2");

const UserModel = require("./models/User");
const sendRefreshtoken = require("../send_refresh_token");
const path = require("path");

const Subscription = require("./resolvers/Subscription");


const start = async () => {
  try {
    await connect();
    console.log("Connected 🚀 To MongoDB Successfully");

    const resolvers = {
      Query,
      Mutation,
      Subscription,
      Listing,
      User,
      Review,
      Chat,
      Message,
    };

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req, res, connection }) => {
        if (connection) {
          return { ...connection, pubsub, res, req };
        } else {
          return { ...isAuth(req), pubsub: pubsub, res, req };
        }
      },
      subscriptions: {
        onConnect: (connection, webSocket) => {
          if (!connection.authToken) throw new Error("User is not authenticated");

          let userId = null;
          if (connection.authToken) {
            let decodedToken = jwt.verify(
              connection.authToken,
              process.env.ACCESS_TOKEN_SECRET
            );
            userId = decodedToken.userId;
          }

          return {
            currentUserToken: connection,
            currentUserId: userId
          };
        },
      },
    });

    const app = express()



    app.use(cors({
      origin: "https://tenten-react-site.herokuapp.com/",
      credentials: true
    }));

    app.use(cookieParser())

    //makes folder available public
    app.use("/images", express.static(path.join(__dirname, "../images")))

    app.use(express.static("doc"));



    //Parse cookies for auth
    app.post("/refresh_token", async (req, res) => {

      // Get refresh token from cookies
      const token = req.cookies.refresh_token;
      if (!token) {
        return res.send({ ok: false, accessToken: '' })
      }

      let payload = null;
      // validate token
      try {
        payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET); // ensures token is a refresh token
      } catch (err) {
        console.log(err)
        return res.send({ ok: false, accessToken: '' })
      }

      // token is valid so we can send back an access token
      const user = await UserModel.findOne({ _id: payload.userId });
      if (!user) return res.send({ ok: false, accessToken: '' });

      if (user.tokenVersion !== payload.tokenVersion) {
        return res.send({ ok: false, accessToken: " " });
      }


      // Send new refresh token as user, to extend session by 7 days
      let newRefreshToken = await createRefreshToken(user)
      sendRefreshtoken(res, newRefreshToken)

      // return new access token
      return res.send({ ok: true, accessToken: await createAccessToken(user) })
    })

    server.applyMiddleware({ app, cors: false });


    const httpServer = http.createServer(app);
    server.installSubscriptionHandlers(httpServer);


    //THIS SERVER ALLOWS US TO USE SUBSCRIPTIONS

    // ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
    httpServer.listen(process.env.PORT || 4000, () => {
      console.log(
        `🚀 Server ready at http://localhost:${process.env.PORT || 4000}${
        server.graphqlPath
        }`
      );
      console.log(
        `🚀 Subscriptions ready at ws://localhost:${process.env.PORT || 4000}${
        server.subscriptionsPath
        }`
      );
    });
  } catch (err) {
    console.error(err);
  }
};

start();

module.exports = start;
