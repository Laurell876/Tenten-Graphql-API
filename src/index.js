const { ApolloServer, gql, PubSub } = require("apollo-server-express");
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
const Subscription = require("./resolvers/Subscription");
const http = require("http");
const app = express();

const pubsub = new PubSub();
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
          return {...connect.context, pubsub};
        } else {
          return { ...isAuth(req),pubsub:pubsub };
        }
      },
    });

    server.applyMiddleware({ app });

    const httpServer = http.createServer(app);
    server.installSubscriptionHandlers(httpServer);

    app.use(cors());

    //makes folder available public
    app.use(express.static("images"));

    app.use(express.static("doc"));

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
