import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import TodoList from "./components/TodoList";
import Login from "./pages/Login";

function App() {
  const [token, setToken] = useState(false);

  return (
    <div className="App">
      <Router>
        {token ? (
          <>
            <div className="container mt-5">
              <div className="row">
                <Switch>
                  <Route path="/" exact>
                    <div className="col-sm-6">
                      <TodoList />
                    </div>{" "}
                  </Route>{" "}
                </Switch>
              </div>
            </div>
          </>
        ) : (
          <Switch>
            <Route path="/" exact>
              <Login setToken={setToken} />
            </Route>{" "}
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
