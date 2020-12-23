import React, {useState, useEffect} from 'react'

const LeagueCard = ({ leagueId, leagueName }) => {

    const [leagueBadge, setLeagueBadge] = useState('')

    const getLogo = (id) => {
        fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=${leagueId}`)
            .then(response => response.json())
            .then(data => setLeagueBadge(data.leagues[0].strBadge))
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getLogo(leagueId)
    })

    return (
        <article className="league-card option">
            {
                leagueBadge ?
                <figure className="league-badge">
                    <img src={leagueBadge} alt={leagueName} />
                </figure>
                :
                <article className="no-image">
                    <p>No Badge Available</p>
                </article>

            }
            <p>{leagueName}</p>
        </article>
    )
}

export default LeagueCard
