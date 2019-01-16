import gql from 'graphql-tag';

export default gql `
    query GetWebcontent($id: String!){
        webcontent(id: $id){
            description
            title
            renderedContentsByTemplate{
                elements{
                    renderedContent
                }
            }
        }
    }
    
`;