import React from 'react'
import LeagueCard from '../LeagueCard/LeagueCard'

const Leagues = ({ leagues, setSelectedLeague, setSelectedLeagueDetails }) => {

    if (!leagues) return <>No leagues found</>


    return (
        <article className="leagues">
            {
                leagues.map(league => {
                    return <LeagueCard  key={league.idLeague} 
                                        leagueId={league.idLeague} 
                                        leagueName={league.strLeague} 
                                        setSelectedLeague={setSelectedLeague}
                                        setSelectedLeagueDetails={setSelectedLeagueDetails}
                            />
                })
            }
        </article>
    )
}

export default Leagues
