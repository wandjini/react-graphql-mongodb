import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import fetchSong from '../queries/fetchSong';
class LyricCreate extends Component{

    constructor(){
        super();
        this.state = {content: ''};
    }
    onContentChange(event){
        this.setState({content: event.target.value});
    }
    onCreateLyric(){
        this.props.mutate({
            variables:{
                content: this.state.content,
                songId: this.props.songId
            }
        }).then(resp => console.log(resp))
        .catch(error => {console.log('error', error)})
    }
    render(){
        //console.log(this);
        return (
            <form >
                <label>Add a Lyric</label>
                <input
                   onChange={this.onContentChange.bind(this)} 
                  value={this.state.content}  
                    />
                <div className="btn-floating btn-large red right">
                    <i  
                        className="material-icons"
                        onClick={() => this.onCreateLyric()}>add</i>
                </div>
            </form>
        )
    }
}

const mutation =gql`

    mutation AddLyricToSong($songId: ID!, $content: String){
        addLyricToSong(songId: $songId, content: $content ){
            id
            lyrics{
                id
                content
                likes
            }
        }
    }`;

export default graphql(mutation)(LyricCreate);