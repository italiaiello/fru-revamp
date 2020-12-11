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
import { useDataFetch } from "./hooks/useDataFetch";

const App = () => {

  const { isLoading, leaguesData, error } = useDataFetch('https://www.thesportsdb.com/api/v1/json/1/all_leagues.php');

  console.log(leaguesData);

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
              <Register isLoading={isLoading} leaguesData={leaguesData}/>
            </Route>
          </Switch>
      </div>

      
    </Router>
  );
}

export default App;
