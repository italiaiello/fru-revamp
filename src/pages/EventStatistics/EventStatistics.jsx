import React from 'react'
import Loading from '../../components/Loading/Loading'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useDataFetch } from '../../hooks/useDataFetch'
import './EventStatistics.scss'

const EventStatistics = () => {

    const {resultId} = useParams()

    const [isLoading, statistics, error] = useDataFetch(`https://www.thesportsdb.com/api/v1/json/50130162/lookupeventstats.php?id=${resultId}`)

    if (error) {
        console.log(error)
        return <>Network Error</>
    }
    
    return (
        <section className="event-statistics">
            {
                isLoading ?
                <Loading message={"Loading statistics..."} />
                :
                <>
                    <h2>{statistics?.eventstats[0]?.strEvent}</h2>
                    <article className="event-statistics__stats-table">
                        {
                            statistics?.eventstats?.map(stat => (
                                <article className="event-statistics__stats-table--row">
                                    <p>{stat.intHome}</p>
                                    <p>{stat.strStat}</p>
                                    <p>{stat.intAway}</p>
                                </article>
                            ))
                        }
                    </article>
                </>
            }
        </section>
    )
}

export default EventStatistics