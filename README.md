<p>
Tutorial Docs: https://docs.google.com/document/d/1p-XKWWrN3Eyz0aVwlyN44jXuRlNS3CwWs_eanr88tiw/edit?tab=t.0
<br>
Website to Test: https://studio.apollographql.com/sandbox/explorer/
<br>
<pre style="background-color: #f5f5f5; padding: 10px; border-radius: 5px; overflow-x: auto;">
<code style="font-family: Consolas, monospace; color: #d6336c;">
npm init --yes && npm pkg set type="module"
</code>
</pre>
This line of code helps to initialie a new Node.js project in the current folder,creating a package.json file automatically  and the npm pkg set type="module" tells the Node.js that your project uses ES Modules (ESM) instead of Common JS
<br>
<pre>
<code>
npm install @apollo/server graphql
</code>
</pre>
</p>

<hr>
<h2> Difference between Apollo Client and Server </h2>
<p>
Apollo Server is the backend part that receives GraphQL queries/mutations from clients and sends back data and it essentially runs the GraphQL API 

<pre>
<code>
// server.js
import { ApolloServer, gql } from 'apollo-server';

// 1. Define schema (types)
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// 2. Define resolvers (functions that return data)
const resolvers = {
  Query: {
    hello: () => 'Hello from Apollo Server!',
  },
};

// 3. Create server
const server = new ApolloServer({ typeDefs, resolvers });

// 4. Start server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

</code>
</pre>
Apollo Client is the frontend part that sends queries/mutations to the Apollo Server and manages the data in your frontend app 
<pre>
<code>
// apollo.js
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000', // Apollo Server URL
  cache: new InMemoryCache(),
});

export default client;

</code>
</pre>
</p>

<h2>GraphQL Terminology</h2>

<h4>Schema</h4>
<p>
Definition: The schema is like a blueprint for GraphQL API. It defines what types of data can be queried or modified and how the API behaves
</p>
<pre>
<code>
type User {
  id: ID!
  name: String!
  email: String!
}

type Query {
  getUser(id: ID!): User
}

type Mutation {
  createUser(name: String!, email: String!): User
}

</code>
</pre>

<h4>Query</h4>
<p>
Definition: Queries are how clients request data from the server. They are read-only and can return nested data in a single request
</p>
<pre>
<code>
query {
  getUser(id: "1") {
    id
    name
    email
  }
}

</code>
</pre>

<h4>Mutation</h4>
<p>
Mutation are used to create, update, or delete data on the server
</p>
<pre>
<code>
mutation {
  createUser(name: "Jonas", email: "jonas@example.com") {
    id
    name
    email
  }
}
</code>
</pre>

<h4>Resolvers </h4>
<p>
Definition: Resolvers are functions that tell the server how to fetch or modify data for a particular field in the schema
</p>

<pre>
<code>
const resolvers = {
  Query: {
    getUser: (parent, args, context, info) => {
      // args.id contains the id from the query
      return database.findUserById(args.id);
    }
  },
  Mutation: {
    createUser: (parent, args, context, info) => {
      const newUser = { id: Date.now(), name: args.name, email: args.email };
      database.saveUser(newUser);
      return newUser;
    }
  }
};

</code>
</pre>
