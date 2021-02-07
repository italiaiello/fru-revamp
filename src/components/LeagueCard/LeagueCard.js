import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'

const LeagueCard = ({ leagueId, leagueName, setSelectedLeagueDetails }) => {

    const [leagueBadge, setLeagueBadge] = useState('')
    const [leagueDetails, setLeagueDetails] = useState({})
    
    const getLogo = (id) => {
        fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=${id}`)
            .then(response => response.json())
            .then(data => {
                setLeagueBadge(`${data.leagues[0].strBadge}/preview`)
                setLeagueDetails(data.leagues[0])
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getLogo(leagueId)
    }, [leagueId])

    let history = useHistory();

    const onLeagueSelect = e => {
        const formattedLeague = leagueDetails.strLeague.toLowerCase().split(' ').join('-')
        setSelectedLeagueDetails(leagueDetails)
        history.push(`/search-competitions/${formattedLeague}`)
    }

    return (
        <article className="league-card option" onClick={onLeagueSelect}>
            {   
                leagueBadge ?
                <figure className="league-badge" >
                    <img src={leagueBadge} alt={leagueName} className="responsive-img" />
                </figure>
                :
                <article className="no-image">
                    <p>No Badge Available</p>
                </article>

            }
            <article className="league-name-container">
                <p className="league-name" data-details={leagueDetails}>{leagueName}</p>
            </article>
        </article>
    )
}

export default LeagueCard
