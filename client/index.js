import "./style/style.css";
import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { Router, Route, hashHistory, IndexRoute } from "react-router";

import App from "./components/App";
import SongList from "./components/SongList";
import SongCreate from "./components/SongCreate";
import SongDetail from "./components/SongDetail";
import 'bootstrap/dist/css/bootstrap.min.css';

const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

ReactDOM.render(
  
  <ApolloProvider client={client}>
   <div>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList}/>
          <Route path="/songs/new" component={SongCreate} />{" "}
          <Route path="/songs/:id" component={SongDetail} />
        </Route>
      </Router>{" "}
    </div>
  </ApolloProvider>,
  document.getElementById("root")
);
