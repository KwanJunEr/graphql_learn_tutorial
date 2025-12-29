import { getAccessToken } from '../auth';
import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, gql, concat } from '@apollo/client';

// const client = new GraphQLClient('http://localhost:9000/graphql', {
//   headers: () => {
//     const accessToken = getAccessToken();
//     if (accessToken) {
//       return { 'Authorization': `Bearer ${accessToken}` };
//     }
//     return {};
//   },
// });
const httpLink = createHttpLink({ uri: 'http://localhost:9000/graphql' })
const authLink = new ApolloLink((operation, forward) => {
  // console.log('[customLink] operation', operation);
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: { 'Authorization': `Bearer ${accessToken}` },
    });
  }
  return forward(operation);
})

const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
  // defaultOptions: {
  //   query: {
  //     fetchPolicy: 'network-only', //get fresh data
  //   },
  //   watchQuery: {
  //     fetchPolicy: 'network-only'
  //   }
  // }

})

const jobDetailFragment = gql`
  fragment JobDetail on Job{
        id
        date
        title
        company {
          id
          name
        }
        description
  }
`

const jobByIdQuery = gql`
    query JobById($id: ID!) {
      job(id: $id) {
        ...JobDetail
}
    }
${jobDetailFragment}
  `;

export async function createJob({ title, description }) {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
      job: createJob(input: $input) {
        ...JobDetail
      }
    }
      ${jobDetailFragment}
  `;
  const { data } = await apolloClient.mutate({
    mutation,
    variables: { input: { title, description } },
    update: (cache, { data }) => {
      // console.log('[createJob] resuklt', result);
      cache.writeQuery({
        query: jobByIdQuery,
        variables: { id: data.job.id },
        data,
      })
    }
    //one option is to add context here 

  });
  return data.job;
}

export async function getCompany(id) {
  const query = gql`
    query CompanyById($id: ID!) {
      company(id: $id) {
        id
        name
        description
        jobs {
          id
          date
          title
        }
      }
    }
  `;
  const { data } = await apolloClient.query({
    query,
    variables: { id },
  })
  return data.company;
}

export async function getJob(id) {
  const { data } = await apolloClient.query({
    query: jobByIdQuery,
    variables: { id },
  })
  return data.job;
}

export async function getJobs() {
  const query = gql`
    query {
      jobs {
        id
        date
        title
        company {
          id
          name
        }
      }
    }
  `;
  const { data } = await apolloClient.query({
    query,
    fetchPolicy: 'network-only',
  });
  return data.jobs;
}
