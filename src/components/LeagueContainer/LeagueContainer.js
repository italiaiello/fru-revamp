import React from 'react'
import {
    Switch,
    Route
  } from "react-router-dom";
import LeagueDetails from '../../pages/LeagueDetails/LeagueDetails';
import LeagueTable from '../../pages/LeagueTable/LeagueTable';
import SearchLeagues from '../../pages/SearchLeagues/SearchLeagues'
import TeamDetails from '../../pages/TeamDetails/TeamDetails';

const LeagueContainer = () => {

    return (
        <section className="fru-section">
            <Switch>
                <Route exact path={"/search-competitions"}>
                    <SearchLeagues />
                </Route>
                <Route exact path={`/search-competitions/:league/:leagueId`}>
                    <LeagueTable />
                </Route>
                <Route path={`/search-competitions/:league/:leagueId/details`}>
                    <LeagueDetails />
                </Route>
                <Route path={`/search-competitions/:league/:leagueId/:team/:teamId`}>
                    <TeamDetails />
                </Route>
            </Switch>
        </section>
    )
}

export default LeagueContainer
