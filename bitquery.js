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
          address(address: {is: "0x53f042f3e809d2dcc9492de2dbf05d1da0ef5fbb"}) {
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

// Get Total Burned Tokens

const TokenAddress = '0x53f042f3e809d2dcc9492de2dbf05d1da0ef5fbb';

async function getBurnedTotal(addressToken) {
  try {
      const endpoint = 'https://graphql.bitquery.io';

      const variables = {
          burnAddress: "0x000000000000000000000000000000000000dead",
          tokenAddress: addressToken
      };
      
      const client = new GraphQLClient(endpoint, {
      headers: {
          'X-API-KEY': process.env.BITQUERY_API,
          },
      });
  
      const query = gql`
          query getBurned($burnAddress: String!, $tokenAddress: String! )
          {
              ethereum(network: bsc) {
                  address(
                      address: {is: $burnAddress}
                  ) {
                      address
                      balances(
                      currency: {is: $tokenAddress}
                      )   {
                      value
                          }
                      }
              }
          }
      `
      const data = await client.request(query, variables)
      const totalBurnt = data.ethereum.address[0].balances[0].value;
      console.log(totalBurnt);
      return totalBurnt;
  } catch (error) {
      console.log(error);
  }
}

getBurnedTotal(TokenAddress);