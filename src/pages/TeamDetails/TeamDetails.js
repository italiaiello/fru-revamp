import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import { useDataFetch } from '../../hooks/useDataFetch'
import { parse } from 'node-html-parser'

const TeamDetails = () => {

    const { teamId } = useParams()

    const [isLoading, data, error] = useDataFetch(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`)

    const [teamDetails, setTeamDetails] = useState({})

    useEffect(() => {
        if (data) {
            setTeamDetails(data.teams[0])
        }
    }, [data])

    console.log(teamDetails)

    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    let parser = new DOMParser();

    return (
        <section className="fru-section">
            {
                isLoading || !teamDetails
                ?
                <Loading message={"Loading team details..."} />
                :
                <>
                    <article className="team-details-header">
                        <figure className="team-logo">
                            <img src={`${teamDetails.strTeamBadge}/preview`} />
                        </figure>
                        <h2>{teamDetails.strTeam}</h2>
                    </article>
                    <article className="summary">
                        <article className="summary-box">
                            <h3>Year Formed</h3>
                            <p>{teamDetails.intFormedYear}</p>
                        </article>
                        <article className="summary-box">
                            <h3>Stadium</h3>
                            <p>{teamDetails.strStadium}</p>
                            <button className="stadium-button">More Info</button>
                        </article>
                        <article className="summary-box">
                            <h3>Stadium Capacity</h3>
                            <p>{numberWithCommas(teamDetails.intStadiumCapacity)}</p>
                        </article>
                    </article>
                    <p className="team-description">{teamDetails.strDescriptionEN}</p>
                    <hr className="divider" />
                </>
            }
        </section>
    )
}

export default TeamDetails
