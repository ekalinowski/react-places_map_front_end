import React, { Component } from 'react'
import { Map } from './components/Map'
import './App.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

 
class App extends Component {
  render() {
    return (
      <Router>
      <div>
        <ul>
          <li>
            <Link to="/show">Map</Link>
          </li>
        </ul>

        <hr />

        <Route path="/show" component={Map} />
      </div>
    </Router>
    );
  }
}
 
export default App