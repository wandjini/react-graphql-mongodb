const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql;

const RenderContentType =  new GraphQLObjectType({
    name: 'RenderContentType',
    fields: () => ({
        template: {
            type: GraphQLString
        },
        renderedContent: {
            type: GraphQLString
        }
    })
});
const WebcontentType = new GraphQLObjectType({
  name: 'WebcontentType',
  fields: () => ({
    description: {
      type: GraphQLString
    },
    title: {
      type: GraphQLString
    },
    id: {
        type: GraphQLString
    },
    renderedContentsByTemplate: {
      type: new GraphQLObjectType({
          name: 'RenderContentsByTemplate',
          fields: () => ({
              totalNumberOfItems: {
                  type: GraphQLInt
              },
              elements: {
                  type: new GraphQLList(RenderContentType)
              }
          })
      })    
    },
    
  })
});

module.exports = WebcontentType;