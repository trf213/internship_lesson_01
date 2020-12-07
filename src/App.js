
import React, { createContext, useContext, useReducer } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Todo from './screens/Todo'
import Login from './screens/Login'

import { AuthProvider, AuthContext } from './context/Auth'

const App = () => {

  // const currentUser = useContext(AuthContext)
  return (
    <AuthProvider>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/todo">Todo</Link>
              </li>
              {/* <li>Welcome back, {currentUser.name}</li> */}
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/about" component={About} />

            <Route path="/todo" component={Todo} />

            <Route path="/" component={Home} />

          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App