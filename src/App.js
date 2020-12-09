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
          </Switch>
      </div>

      
    </Router>
  );
}

export default App;
