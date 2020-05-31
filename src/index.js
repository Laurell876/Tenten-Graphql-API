const { ApolloServer, gql } = require("apollo-server-express");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const typeDefs = require("./schema.graphql");
const isAuth = require("./middleware/is-auth");
const express = require("express");
const connect = require("./db.js");
const cors = require("cors");
const app = express();
const Listing = require("./resolvers/Listing");
const User = require("./resolvers/User");

const start = async () => {
  try {
    await connect();
    console.log("Connected 🚀 To MongoDB Successfully");

    const resolvers = {
      Query,
      Mutation,
      Listing,
      User,
    };

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req, res }) => {
        return { ...isAuth(req), res: res };
      },
    });
    server.applyMiddleware({ app });

    app.use(
      cors({
        //allows cookie to be set
        credentials:true,
        //uri of front end
        origin:"http://localhost:3000"
      })
    );

    //makes folder available public
    app.use(express.static("images"));
    //example of image link: localhost://4000/nameoffile

    app.listen({ port: process.env.PORT || 4000 }, () =>
      console.log(
        `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
      )
    );
  } catch (err) {
    console.error(err);
  }
};

start();

module.exports = start;
