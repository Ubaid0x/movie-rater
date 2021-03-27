import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Auth from './components/auth';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter } from 'react-router-dom';

export const TokenContext = createContext(null)

const Router = () => {
  const [ Token, setToken ] = useState("");

  return (
    <React.StrictMode>
      <TokenContext.Provider value={{Token, setToken}}>
        <BrowserRouter>
          <Route exact path={"/"} component={Auth} />
          <Route path={"/movies"} component={App} />
        </BrowserRouter>
      </TokenContext.Provider>
  </React.StrictMode>
  )
}

ReactDOM.render(<Router />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
