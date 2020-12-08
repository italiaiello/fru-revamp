import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import Entrance from './components/Entrance/Entrance';
import SignIn from "./components/SignIn/SignIn";

const App = () => {

  return (
    <Router>
      <div className="App">
          <Switch>
            <Route exact path="/">
              <Entrance />
            </Route>
            <Route path="/sign-in">
              <SignIn />
            </Route>
          </Switch>
      </div>

      
    </Router>
  );
}

export default App;
