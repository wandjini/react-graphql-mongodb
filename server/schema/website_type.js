const graphql = require('graphql');
const axios = require('axios');
const WebcontentType = require('./webcontent_type');
const constants = require('../services/constants');

const {
    STRUCTURED_CONTENTS_URL,
    USER_NAME,
    PASSWORD
} = constants;
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    G
} = graphql;

const WebsiteType = new GraphQLObjectType({
    name: 'WebsiteType',
    fields: () => ({
        name: {
            type: GraphQLString
        },
        availableLanguages: {
            type: new GraphQLList(GraphQLString)
        },
        structuredContents: {
            type: new GraphQLList(WebcontentType),
            resolve(parentValue) {
                return axios.get(`${STRUCTURED_CONTENTS_URL}`, {
                        auth: {
                            username: USER_NAME,
                            password: PASSWORD
                        }
                    })
                    .then(res => {
                        //console.log(res.data.elements);
                        return res.data.elements
                    })
                    .catch(error => console.log(error))
            }
        },
        contentStructures: {
            type: GraphQLString
        }
    })

});
module.exports = WebsiteType;