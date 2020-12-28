import React, { useState } from 'react'
import {
    Switch,
    Route
  } from "react-router-dom";
import LeagueDetails from '../../pages/LeagueDetails/LeagueDetails';
import LeagueTable from '../../pages/LeagueTable/LeagueTable';
import SearchLeagues from '../../pages/SearchLeagues/SearchLeagues'
import TeamDetails from '../../pages/TeamDetails/TeamDetails';

const LeagueContainer = () => {

    const [selectedLeagueDetails, setSelectedLeagueDetails] = useState({})

    return (
        <section className="fru-section">
            <Switch>
                <Route exact path={"/search-competitions"}>
                    <SearchLeagues setSelectedLeagueDetails={setSelectedLeagueDetails} />
                </Route>
                <Route exact path={`/search-competitions/:selectedLeague`}>
                    <LeagueTable leagueId={selectedLeagueDetails.idLeague} leagueName={selectedLeagueDetails.strLeague} />
                </Route>
                <Route path={`/search-competitions/:selectedLeague/details`}>
                    <LeagueDetails />
                </Route>
                <Route path={`/search-competitions/:selectedLeague/:selectedTeam/:teamId`}>
                    <TeamDetails />
                </Route>
            </Switch>
        </section>
    )
}

export default LeagueContainer
