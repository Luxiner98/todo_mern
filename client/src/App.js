import {Route,BrowserRouter as Router, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Todo from './pages/Todo';
import './App.css';
import React,{ useState } from 'react';

export const userDataContext = React.createContext(null);

function App() {
  const userData = useState(null);
  return (
    <div className='App'>
    <userDataContext.Provider value={userData}>
        <Router>
          <Switch>
            <Route exact path='/'>
              <LandingPage />
            </Route>
            <Route exact path='/todo'>
              <Todo />
            </Route>
          </Switch>
        </Router>
      </userDataContext.Provider>
    </div>
  );
}

export default App;
