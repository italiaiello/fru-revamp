import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading/Loading'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useDataFetch } from '../../hooks/useDataFetch'
import './EventStatistics.scss'

const EventStatistics = () => {

    const {resultId} = useParams()

    const [isLoadingStats, statistics, errorStats] = useDataFetch(`https://www.thesportsdb.com/api/v1/json/50130162/lookupeventstats.php?id=${resultId}`)
    const [isLoadingEvent, event, errorEvent] = useDataFetch(`https://www.thesportsdb.com/api/v1/json/50130162/lookupevent.php?id=${resultId}`)

    const [teamNames, setTeamNames] = useState([])

    useEffect(() => {
        if (event?.events[0]) {
            setTeamNames(event.events[0].strEvent.split("vs"))
        }
    }, [event])
    
    
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
                            <h2>{statistics?.eventstats[0]?.strEvent}</h2>
                            {
                                event?.events[0]?.strVideo.length ?
                                <article className="event-statistics__video-container">
                                    <div className="event-statistics__video-container--wrapper">
                                        <iframe className="event-statistics__video-container--wrapper__video" title={event?.events[0]?.strEvent}
                                            src={event?.events[0]?.strVideo.split("/watch?v=").join("/embed/")} allowFullScreen="true">
                                        </iframe>
                                    </div>
                                </article>
                                :
                                (
                                    event?.events[0]?.strThumb &&
                                    <figure className="event-statistics__figure">
                                        <img src={`${event?.events[0]?.strThumb}/preview`} alt={`${event?.events[0]?.strEvent}`} className="responsive-img" />
                                    </figure> 
                                )
                            }
                            <h3>Match Stats</h3>
                            <article className="event-statistics__stats-table">
                                <article className="event-statistics__stats-table--row event-statistics__stats-table--row__teams">
                                    <h4 className="left-align">{teamNames[0]}</h4>
                                    <h4 className="right-align">{teamNames[1]}</h4>
                                </article>
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