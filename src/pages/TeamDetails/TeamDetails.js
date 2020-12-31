import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import TeamSocials from '../../components/TeamSocials/TeamSocials'
import { useDataFetch } from '../../hooks/useDataFetch'

const TeamDetails = () => {

    const { teamId } = useParams()

    const [isLoading, data, error] = useDataFetch(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`)

    const [teamDetails, setTeamDetails] = useState({})

    useEffect(() => {
        if (data) {
            setTeamDetails(data.teams[0])
            console.log(data)
        }
    }, [data])

    console.log(teamDetails)

    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    if (error) return <>Network Error</>

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
                            <img src={`${teamDetails.strTeamBadge}/preview`} alt={`${teamDetails.strTeam} badge`} />
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
                            <p>{teamDetails.intStadiumCapacity ? numberWithCommas(teamDetails.intStadiumCapacity) : 'No Data'}</p>
                        </article>
                    </article>
                    <p className="team-description">{teamDetails.strDescriptionEN}</p>
                    <hr className="divider" />
                    <TeamSocials    teamName={teamDetails.strTeam} 
                                    websiteUrl={teamDetails.strWebsite} 
                                    facebookUrl={teamDetails.strFacebook}
                                    instagramUrl={teamDetails.strInstagram}
                                    twitterUrl={teamDetails.strTwitter}
                                    youtubeUrl={teamDetails.strYoutube}
                    />
                </>
            }
        </section>
    )
}

export default TeamDetails
