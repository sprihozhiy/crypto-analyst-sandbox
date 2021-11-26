const { GraphQLClient, gql }  = require('graphql-request');
require('dotenv').config();

async function main() {
    const endpoint = 'https://graphql.bitquery.io'
  
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        'X-API-KEY': process.env.BITQUERY_API,
      },
    })
  
    const query = gql`
    {
        ethereum(network: bsc) {
          address(address: {is: "0xb698fb4e7052f2b6f25c22a7caf081683cfb2e0b"}) {
            balances {
              currency {
                symbol
              }
              value
            }
          }
        }
      }
    `
  
    const data = await graphQLClient.request(query)
    console.log(JSON.stringify(data, undefined, 2))
  }
  
  main().catch((error) => console.error(error))