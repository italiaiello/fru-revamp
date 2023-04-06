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

    return (
        <section className="recent-results">
            {
                isLoading ?
                <Loading message={"Loading results..."} />
                :
                <>
                    <h2>Recent Results (Last 15)</h2>
                    <article className="recent-results__fixture-container">
                        {
                            results?.events?.map(result => (
                                <article className="recent-results__fixture-container--fixture option" onClick={() => history.push(`/search-competitions/${league}/${leagueId}/results/${result.idEvent}`)}>
                                    <h3>{`${result.strHomeTeam} ${result.intHomeScore} - ${result.intAwayScore} ${result.strAwayTeam}`}</h3>
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