import React from 'react'
import LeagueCard from '../LeagueCard/LeagueCard'

const Leagues = ({ leagues }) => {

    if (!leagues) return <>No leagues found</>

    return (
        <article className="leagues">
            {
                leagues.map(league => {
                    return <LeagueCard leagueId={league.idLeague} leagueName={league.strLeague} />
                })
            }
        </article>
    )
}

export default Leagues
