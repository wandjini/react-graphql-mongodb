import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { Link, hashHistory } from 'react-router';


import query from '../queries/fetchSongs';

class SongCreate extends Component{

    constructor(){
        super();
        this.state = {
            title: ''
        }
    }
    onSubmit(event){
        event.preventDefault();
        
        this.props.mutate({
            variables:{
                title: this.state.title
            },
            refetchQueries: [{ query }]
        })
        .then(() => {
                hashHistory.push('/');
        })
        .catch((error) => {
            console.log(error);
        });
    }
    onChange(event){
        //console.log(this.props);
        this.setState({title: event.target.value}) 

    }
    render(){
        //console.log('state', this.state.title)
        return(
            <div className="container">
                <Link to="/">
                    Back
                </Link>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <h3>Add New Song</h3>
                    <label>Song Title: </label>
                    <input type="text"
                     onChange={this.onChange.bind(this)}
                     value={this.state.title}/>
                </form>
            </div>
        );
    }
}

const addSongMutation =gql`
    mutation AddSong($title: String){
        addSong(title: $title){
            id
            title
        }
    }
`;

export default graphql(addSongMutation)(SongCreate);