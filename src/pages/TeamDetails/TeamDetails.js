import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import Modal from '../../components/Modal/Modal'
import Socials from '../../components/Socials/Socials'
import TeamPlayersAndManager from '../../components/TeamPlayersAndManager/TeamPlayersAndManager'
import { useDataFetch } from '../../hooks/useDataFetch'

const TeamDetails = () => {

    const { league, team, teamId } = useParams()

    const [isLoading, data, error] = useDataFetch(`https://www.thesportsdb.com/api/v1/json/50130162/lookupteam.php?id=${teamId}`)

    const [teamDetails, setTeamDetails] = useState({})

    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (data) {
            setTeamDetails(data.teams[0])
        }
    }, [data])

    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    const toggleModal = (showModal) => setShowModal(showModal)

    if (error) {
        console.log(error)
        return <>Network Error</>
    }

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
                            <img src={`${teamDetails.strTeamBadge}/preview`} alt={`${teamDetails.strTeam} badge`} className="responsive-img" />
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
                            <button className="stadium-button highlight" onClick={() => toggleModal(true)}>More Info</button>
                        </article>
                        <article className="summary-box">
                            <h3>Stadium Capacity</h3>
                            <p>{teamDetails.intStadiumCapacity ? numberWithCommas(teamDetails.intStadiumCapacity) : 'No Data'}</p>
                        </article>
                    </article>
                    <p className="team-description desc-text white-space">{teamDetails.strDescriptionEN}</p>
                    <TeamPlayersAndManager league={league} team={team} />
                    <hr className="divider" />
                    <Socials    
                        name={teamDetails.strTeam} 
                        websiteUrl={teamDetails.strWebsite} 
                        facebookUrl={teamDetails.strFacebook}
                        instagramUrl={teamDetails.strInstagram}
                        twitterUrl={teamDetails.strTwitter}
                        youtubeUrl={teamDetails.strYoutube}
                    />
                    {
                        showModal ? <Modal toggleModal={toggleModal} teamDetails={teamDetails} /> : null
                    }
                </>
            }
        </section>
    )
}

export default TeamDetails
