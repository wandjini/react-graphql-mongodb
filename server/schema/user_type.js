const mongoose = require('mongoose');
const graphql = require('graphql');
const axios = require('axios');
const RoleType = require('./role_type');
const constants = require('../services/constants');

const {
    USER_ACCOUNT_BASE_URL,
    USER_ID,
    USER_NAME,
    PASSWORD
} = constants;
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} = graphql;

const UserType = new GraphQLObjectType({
  name:  'UserType',
  fields: () => ({
    birthDate: { type: GraphQLString },
    alternateName: { type: GraphQLString },
    email: { type: GraphQLString },
    name: { type: GraphQLString },
    roles: {
      type: new GraphQLList(RoleType),
      resolve(parentValue) {
        return axios.get(`${USER_ACCOUNT_BASE_URL}${USER_ID}/roles`,
                            { auth: { username: USER_NAME, password: PASSWORD } })
                            .then(res => res.data.elements)
                            .catch(error => console.log(error))
      }
    }
  })
});

module.exports = UserType;
