const { ApolloServer, gql } = require("apollo-server-express");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const typeDefs = require("./schema.graphql");
const isAuth = require("./middleware/is-auth");
const express = require("express");
const connect = require("./db.js");
const cors = require("cors");
const app = express();

// connect
//   .then(() => {
//     app.listen({ port: process.env.PORT || 4000 }, () =>
//       console.log(
//         `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
//       )
//     );
//   })
//   .catch((e) => console.log(e));

const start = async () => {
  try {
    await connect()
    console.log("Connected 🚀 To MongoDB Successfully");

    const resolvers = {
      Query,
      Mutation,
    };

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req }) => {
        return isAuth(req);
      },
    });
    server.applyMiddleware({ app });

    app.use(cors());

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
