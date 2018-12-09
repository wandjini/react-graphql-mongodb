const graphql = require('graphql');
const constants = require('../services/constants');

const {
    USER_ACCOUNT_BASE_URL,
    USER_ID,
    USER_NAME,
    PASSWORD
} = constants;
const {
  GraphQLObjectType,
  GraphQLString
} = graphql;

const RoleType = new GraphQLObjectType({
  name:  'RoleType',
  fields: () => ({
    description: { type: GraphQLString },
    name: { type: GraphQLString },
    roleType: { type: GraphQLString },
  })
});

module.exports = RoleType;
