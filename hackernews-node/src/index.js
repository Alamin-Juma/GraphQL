const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");
const { getUserId } = require("./utils");
const prisma = new PrismaClient();

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')

// 1
// let links = [
//   {
//     id: "link-0",
//     url: "www.howtographql.com",
//     description: "Fullstack tutorial for GraphQL",
//   },
// ];

// 2
/*
const resolvers = {
  Query: {
    info: () => `This is the API  of a Hackernews Clone`,
    //
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
  },
  Mutation: {
    //2
    // type Mutation {
    //the post in schema has arguments passed into it, reasons behind passing the args in the post down 👇
    //   post(url: String!, description: String!): Link!
    // }
    post: (parent, args, context, info) => {
      // let idCount = links.length
      //   const link = {
      //      id: `link-${idCount++}`,
      //      description: args.description,
      //      url: args.url,
      //   }
      //   links.push(link)
      //   return link
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });
      return newLink;
    },
  },

  // //3
  // Link: {
  //   //parent here resolves 2-level execution
  //   //invokes feeds with links data
  //   //resolves the link type - for all of the 3 link resolvers, the incoming parent object is element inside the links lists
  //   id: (parent) => parent.id,
  //   description: (parent) => parent.description,
  //   url: (parent) => parent.url
  // }
};

// 3

//lets pass in the request object to context
// Instead of attaching an object directly, you’re now creating the context as a function which returns the context.
//  The advantage of this approach is that you can attach the HTTP request that carries the incoming GraphQL
//  query (or mutation) to the context as well. This will allow your resolvers to read the Authorization
//   header and validate if the user who submitted the request is eligible to perform the requested operation.

*/

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    };
  }
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
