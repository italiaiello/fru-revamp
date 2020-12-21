import React from 'react'
import { useDataFetch } from '../../hooks/useDataFetch'

const Leagues = ({ leagues }) => {

    if (!leagues) return <>I like chicken</>

    console.log(leagues)

    return (
        <article className="leagues">
            {
                leagues.map(league => (
                    <article className="league-card option">
                        <figure className="league-badge">
                            <img src={league.strBadge} />
                        </figure>
                        <p className="league-name">{league.strLeague}</p>
                    </article>
                ))
            }
        </article>
    )
}

export default Leagues
