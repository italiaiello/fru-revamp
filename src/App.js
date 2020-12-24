import React, { useState } from 'react';

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
import LeagueTable from './pages/LeagueTable/LeagueTable';

const App = () => {

  const [selectedLeague, setSelectedLeague] = useState('cheese')
  const [selectedLeagueDetails, setSelectedLeagueDetails] = useState({})

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

            <Route exact path="/search-competitions">
              <SearchLeagues setSelectedLeague={setSelectedLeague} setSelectedLeagueDetails={setSelectedLeagueDetails} />
            </Route>
            <Route path={`/search-competitions/${selectedLeague}`}>
              <LeagueTable leagueId={selectedLeagueDetails.idLeague} leagueName={selectedLeagueDetails.strLeague} />
            </Route>
          </Switch>
      </div>

      
    </Router>
  );
}

export default App;
