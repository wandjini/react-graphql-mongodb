import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { optimistic } from 'apollo-client/optimistic-data/store';

class LyricList extends Component{
    
    onLike(id, likes){
        console.log('Liking', id);
        this.props.mutate({
            variables:{ id },
            optimisticResponse: {
                __typename: 'Mutation',
                likeLyric: {
                    id: id,
                    __typename: 'LyricType',
                    likes: likes +1
                }
            }
        }).then(res => console.log(res.data))
        .catch(error => console.log(error));
    }
    renderLyric(){
        
        return(
            
            this.props.lyrics.map(({content, id, likes}) => {
                return(
                    <li 
                        className="collection-item" 
                        key={id}>
                            {content}
                        <div className="vote-box">    
                            <i 
                                className="material-icons"
                                onClick={() => this.onLike(id, likes)}
                            >
                                thumb_up 
                            </i>{likes}
                        </div>
                    </li>
                );       
            })
        );
    } 
    
    render(){
        return(
            <div>
                <h3>Lyrics</h3>
                <ul className="collection">
                    {this.renderLyric()}
                </ul>
            </div>
        )
    }
}

const mutation = gql`
  mutation AddLikeLyric($id: ID!){
    likeLyric(id: $id){
      id
      content
      likes
    }
}`;
export default graphql(mutation)(LyricList);