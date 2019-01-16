import React, { Component } from 'react';
import {graphql} from 'react-apollo';
import query from "../queries/fetchWebContents";

class WebcontentRenderer extends Component {
    renderFirstContent() {
        if (this.props.data.loading === true) {
            return <div> Loading... </div>;
        }
        console.log(this.props.data);
        const structuredContent = this.props.data.webcontent;
        const html = structuredContent.renderedContentsByTemplate.elements[0].renderedContent;
        return (
            <div dangerouslySetInnerHTML={{__html: html}} />
        );
    }
    render() { 
        return ( <div>{this.renderFirstContent()}</div> );
    }
}

export default graphql(query, {
    options: props => {
      console.log(props);  
      return { variables: { id:  props.webcontentId} };
    }
  })(WebcontentRenderer);