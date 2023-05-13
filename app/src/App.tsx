import React from 'react';
import logo from './logo.svg';
import './App.css';
import graphql from 'babel-plugin-relay/macro';
import {
  useQueryLoader,
  usePreloadedQuery,
  useLazyLoadQuery,
} from 'react-relay';
import type { AppQuery as AppQueryType } from './__generated__/AppQuery.graphql';

const AppQuery = graphql`
  query AppQuery {
    hello
  }
`;

function App() {
  const data = useLazyLoadQuery<AppQueryType>(AppQuery, {});

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{data.hello}</h1>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
