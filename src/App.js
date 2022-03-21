import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { ThemeProvider } from './ThemeContext';

import './App.css';
import FormHeader from "./components/FormHeader/FormHeader";
import Entrance from './pages/Entrance/Entrance';
import SignIn from "./pages/SignIn/SignIn";
import Register from "./pages/Register/Register";
import SearchLeagues from './pages/SearchLeagues/SearchLeagues';
import LeagueTable from './pages/LeagueTable/LeagueTable';
import LeagueDetails from './pages/LeagueDetails/LeagueDetails';
import TeamDetails from './pages/TeamDetails/TeamDetails';
import PlayerDetails from './pages/PlayerDetails/PlayerDetails';


const App = () => {

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
            <Switch>
              <Route exact path="/">
                <Entrance />
              </Route>
              <Route path="/sign-in">
                <FormHeader currentForm={"SignIn"} />
                <SignIn/>
              </Route>
              <Route path="/register">
                <FormHeader currentForm={"Register"} />
                <Register/>
              </Route>
              <Route exact path={"/search-competitions"}>
                    <SearchLeagues />
                </Route>
                <Route exact path={`/search-competitions/:league/:leagueId`}>
                    <LeagueTable />
                </Route>
                <Route path={`/search-competitions/:league/:leagueId/details`}>
                    <LeagueDetails />
                </Route>
                <Route exact path={`/search-competitions/:league/:team/:teamId`}>
                    <TeamDetails />
                </Route>
                <Route exact path={`/search-competitions/:league/:team/:player/:playerId`}>
                    <PlayerDetails />
                </Route>
            </Switch>
        </div>  
      </Router>
    </ThemeProvider>
  );
}

export default App;
