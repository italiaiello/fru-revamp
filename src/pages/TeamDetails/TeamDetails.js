import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import { useDataFetch } from '../../hooks/useDataFetch'

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
                </>
            }
        </section>
    )
}

export default TeamDetails
