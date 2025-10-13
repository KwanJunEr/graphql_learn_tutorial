import {ApolloServer} from '@apollo/server'
import {startStandaloneServer} from "@apollo/server/standalone"

const server =  new ApolloServer({});

const {url} = await startStandaloneServer(server,{
    listen:{port:4000},
});

console.log(`Server Running at: ${url}`);


////Query- the definition of the data, Mutation


///typeDefs, resolvers