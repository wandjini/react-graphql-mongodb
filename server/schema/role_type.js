const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString
} = graphql;

const RoleType = new GraphQLObjectType({
  name: 'RoleType',
  fields: () => ({
    description: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    roleType: {
      type: GraphQLString
    },
  })
});

module.exports = RoleType;