require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { typeDefs: userTypeDefs, resolvers: userResolvers } = require('./schema/user');
const { typeDefs: jobTypeDefs, resolvers: jobResolvers } = require('./schema/job');

const server = new ApolloServer({
    typeDefs: [userTypeDefs, jobTypeDefs],
    resolvers: [userResolvers, jobResolvers],
    introspection: true
});

startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
}).then(({ url}) => {
    console.log(`api gateway Ry graphQl: ${url}`)
})