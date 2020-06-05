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
const Review = require("./resolvers/Review")

const start = async () => {
  try {
    await connect();
    console.log("Connected 🚀 To MongoDB Successfully");

    const resolvers = {
      Query,
      Mutation,
      Listing,
      User,
      Review
    };

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req, res }) => {
        return {...isAuth(req)};
      },
    });
    server.applyMiddleware({ app });

    app.use(cors());  


    //makes folder available public
    app.use(express.static("images"));

    app.use(express.static("doc"));

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
