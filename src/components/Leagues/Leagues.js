import React from 'react'

const Leagues = ({ leagues }) => {

    if (!leagues) return <>I like chicken</>

    console.log(leagues)

    return (
        <article className="leagues">
            {
                leagues.map(league => (
                    <article className="league-card option">
                        <p className="league-name">{league.strLeague}</p>
                    </article>
                ))
            }
        </article>
    )
}

export default Leagues
