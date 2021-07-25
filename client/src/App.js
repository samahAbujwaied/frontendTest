import React, { Component } from 'react'
import Header from './componants/Header'
import HomePage from './componants/HomePage'
import FavDrink from './componants/FavDrink'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
export class App extends Component {
  render() {
    return (
      <>
     
      <Router>
      <Header/>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/fav">
            <FavDrink />
          </Route> 
        </Switch>  
    </Router>
      </>
    )
  }
}

export default App
