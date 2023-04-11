import React from 'react'
import Loading from '../../components/Loading/Loading'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useDataFetch } from '../../hooks/useDataFetch'
import './EventStatistics.scss'

const EventStatistics = () => {

    const {resultId} = useParams()

    const [isLoadingStats, statistics, errorStats] = useDataFetch(`https://www.thesportsdb.com/api/v1/json/50130162/lookupeventstats.php?id=${resultId}`)
    const [isLoadingEvent, event, errorEvent] = useDataFetch(`https://www.thesportsdb.com/api/v1/json/50130162/lookupevent.php?id=${resultId}`)

    if (errorStats) {
        console.log(errorStats)
        return <>Network Error</>
    }

    if (errorEvent) {
        console.log(errorEvent)
        return <>Network Error</>
    }
    
    return (
        <section className="event-statistics">
            {
                isLoadingStats || isLoadingEvent ?
                <Loading message={"Loading statistics..."} />
                :
                (
                    <>
                    {
                        statistics?.eventstats === null ?
                        <p>No stats available for this event</p>
                        :
                        <>
                            <figure className="event-statistics__figure">
                                <img src={`${event?.events[0]?.strThumb}/preview`} alt={`${event?.events[0]?.strEvent} banner`} className="responsive-img" />
                            </figure>
                            <h2>{statistics?.eventstats[0]?.strEvent}</h2>
                            <article className="event-statistics__stats-table">
                                <article className="event-statistics__stats-table--row">
                                    <p>{event?.events[0]?.intHomeScore}</p>
                                    <p>Goals</p>
                                    <p>{event?.events[0]?.intAwayScore}</p>
                                </article>
                                {
                                    statistics?.eventstats?.map(stat => {
                                        if (stat.strStat === "expected_goals") {
                                            stat.strStat = "Expected Goals"
                                        }
                                        return <article className="event-statistics__stats-table--row">
                                            <p>{stat.intHome}</p>
                                            <p>{stat.strStat}</p>
                                            <p>{stat.intAway}</p>
                                        </article>
                                    })
                                }
                            </article>
                        </>
                    }
                    </>

                )
            }
        </section>
    )
}

export default EventStatistics