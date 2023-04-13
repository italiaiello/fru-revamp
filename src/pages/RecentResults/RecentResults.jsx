import React from 'react'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useDataFetch } from '../../hooks/useDataFetch'
import Loading from '../../components/Loading/Loading'
import './RecentResults.scss'

const RecentResults = () => {

    const { league, leagueId } = useParams()
    let history = useHistory()

    const [isLoading, results, error] = useDataFetch(`https://www.thesportsdb.com/api/v1/json/50130162/eventspastleague.php?id=${leagueId}`)
    
    if (error) {
        console.log(error)
        return <>Network Error</>
    }

    const formattedLeague = league.split('-').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')

    const handleResultSelect = (e, league, leagueId, resultId) => {
        e.preventDefault();
        history.push(`/search-competitions/${league}/${leagueId}/results/${resultId}`)
    }

    return (
        <section className="recent-results">
            {
                isLoading ?
                <Loading message={"Loading results..."} />
                :
                <>
                    <h2>{formattedLeague}</h2>
                    <h3>Recent Results (Last 15)</h3>
                    <article className="recent-results__fixture-container">
                        {
                            results?.events?.map(result => (
                                <article className="recent-results__fixture-container--fixture">
                                    {
                                        result.strThumb &&
                                        <figure className="recent-results__fixture-container--fixture__figure option" onClick={(e) => handleResultSelect(e, league, leagueId, result.idEvent)}>
                                            <img src={`${result.strThumb}/preview`} alt={result.strEvent} className="responsive-img"/>
                                        </figure>
                                    }
                                    <p className="recent-results__fixture-container--fixture__result option" onClick={(e) => handleResultSelect(e, league, leagueId, result.idEvent)}>{`${result.strHomeTeam} ${result.intHomeScore} - ${result.intAwayScore} ${result.strAwayTeam}`}</p>
                                </article>
                            ))
                        }
                    </article>
                </>


            }
            
        </section>
    )
}

export default RecentResults