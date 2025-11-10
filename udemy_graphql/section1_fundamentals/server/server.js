import {ApolloServer} from "@apollo/server"
import {startStandaloneServer} from "@apollo/server/standalone"

const typeDefs = `#graphql
    type Query{
        greeting: String  
    }
    #this is a comment
`;

const resolvers = {
    Query: {
        greeting: ()=> "Hello World",
    },
};

const server = new ApolloServer({typeDefs, resolvers});
const {url} = await startStandaloneServer(server, {listen: {port:9000}});
console.log(`Server running at ${url}`);
