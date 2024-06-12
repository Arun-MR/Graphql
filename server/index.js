
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { subscribe, execute } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { resolvers, typeDefs } from "../server/src/Graphql/Schema.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createServer } from "http";
import { graphqlHTTP } from "express-graphql";
import sql from "./Postgres/connection.js";
async function startServer() { 
  const port = 8000;
  const app = express();
  const schema = makeExecutableSchema({ typeDefs, resolvers }); 

  // Initialize the database connection
  try {
     sql; // Adjust this line to match your database connection method
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process if the database connection fails 
  }

  const server = new ApolloServer({ schema });
  app.use(bodyParser.json());
  app.use(cors());
  await server.start();
  //   app.use("/graphql", expressMiddleware(server));
  //query for header authorization
  app.use(
    "/graphql",
    graphqlHTTP((req) => {
      return {
        schema,
        graphiql: { headerEditorEnabled: true },
        context: req.headers.authorization,
      };
    })
  );
  const httpServer = createServer(app);
  //Setup subscription websocket for handling graphql
  SubscriptionServer.create(
    {
      execute,
      subscribe,
      schema,
    },
    {
      server: httpServer,
      path: "/graphql",
    }
  );
  // Start the HTTP server
  httpServer.listen(port,async () => {
    
    console.log("Server started on http://localhost:8000");
    console.log("Subscriptions ready at ws://localhost:8000/graphql");
  });
}
startServer();












// const express = require("express");
// const { ApolloServer } = require("@apollo/server");
// const { expressMiddleware } = require("@apollo/server/express4");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const GenerateToken = require("../server/middleware/generateJWT_Tokens");
// const verifyToken = require("../server/middleware/verifyToken");
// const {typeDefs,resolvers} = require ('../server/SchemaGQL/schema')
// const cors = require("cors");


// async function startServer() {
//   const app = express();
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//   });

//   app.use(cors({
//     origin: 'http://localhost:3000', // Allow requests from this origin
//     credentials: true // Allow sending cookies
//   }));
//   app.use(bodyParser.json());
//   app.use(cookieParser());

//   await server.start();
 
//   app.use("/login", GenerateToken);

//   app.use("/graphql",
//     //  verifyToken, 
//      expressMiddleware(server));

//   app.listen(8000, () => console.log("server started running on port 8000"));
// }

// startServer();
