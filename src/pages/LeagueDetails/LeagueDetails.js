import React, { useState } from 'react'
import Socials from '../../components/Socials/Socials'

const LeagueDetails = ({ leagueDetails }) => {

    console.log(leagueDetails)

    const [isImageLoaded, setIsImageLoaded] = useState(false)

    return (
        <section className="fru-section">
            <h2>{leagueDetails.strLeague}</h2>
            <article className="league-badge-and-trophy">
                <article className="badge-trophy-container">
                    <figure className="badge">
                        <img 
                            src={`${leagueDetails.strBadge}/preview`} 
                            alt={`${leagueDetails.strLeague}'s Badge`} 
                            className="responsive-img"
                        />
                    </figure>
                </article>
                <article className="badge-trophy-container">
                    <figure className="trophy">
                        {
                            isImageLoaded ?
                            null
                            :
                            (
                                leagueDetails.strTrophy ?
                                (
                                    <div style={{margin: '0 auto'}} className="no-image responsive-img">
                                        Loading trophy...
                                    </div>
                                )
                                :
                                (
                                    <div style={{margin: '0 auto'}} className="no-image responsive-img">
                                        No trophy available
                                    </div>
                                )
                            )
                        }
                        {
                            <img 
                                style={isImageLoaded ? {} : {display: 'none'}}
                                src={leagueDetails.strTrophy} 
                                alt={`${leagueDetails.strLeague}'s Trophy`}
                                className="responsive-img"
                                onLoad={() => setIsImageLoaded(true)}
                            />
                        }
                        
                    </figure>
                </article>
            </article>
            <p className="league-desc desc-text white-space">{leagueDetails.strDescriptionEN}</p>
            <hr className="divider" />
            <Socials 
                name={leagueDetails.strLeague}
                facebookUrl={leagueDetails.strFacebook}
                instagramUrl={leagueDetails.strInstagram}
                twitterUrl={leagueDetails.strTwitter}
                youtubeUrl={leagueDetails.strYoutube}
            />
        </section>
    )
}

export default LeagueDetails
