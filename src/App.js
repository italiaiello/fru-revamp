import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import FormHeader from "./components/FormHeader/FormHeader";
import Entrance from './pages/Entrance/Entrance';
import SignIn from "./pages/SignIn/SignIn";
import Register from "./pages/Register/Register";
import SearchLeagues from "./pages/SearchLeagues/SearchLeagues";

const App = () => {

  return (
    <Router>
      <div className="App">
          <Switch>
            <Route exact path="/">
              <Entrance />
            </Route>
            <Route path="/sign-in">
              <FormHeader currentForm={"SignIn"} />
              <SignIn />
            </Route>
            <Route path="/register">
              <FormHeader currentForm={"Register"} />
              <Register />
            </Route>
            <Route path="/search-leagues">
              <SearchLeagues />
            </Route>
          </Switch>
      </div>

      
    </Router>
  );
}

export default App;
