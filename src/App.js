import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigator from './Components/Navigator';
import CustomerList from './Components/CustomerList';
import TrainingsList from './Components/TrainingsList';


function App() {
  return (
    <Router>
      <div>
        <Navigator />
          <Switch>
          <Route path="/Trainings" component={TrainingsList}/>
          <Route exact path="/" component={CustomerList}/>
          <Route render={() => <h1>Page not found</h1>}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
