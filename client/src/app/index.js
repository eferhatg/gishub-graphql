import React from 'react'
import {  Route } from 'react-router-dom'
import {MapPage,LoginPage,TablePage} from '../routes'

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/map" component={MapPage} />
      {/* <Route exact path="/test" component={Test} /> */}
    </main>
  </div>
);

export default App;
