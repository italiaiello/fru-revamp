import React, { useState } from 'react'
import Socials from '../../components/Socials/Socials'
import { useThemeContext } from '../../ThemeContext'

const LeagueDetails = () => {

    const { selectedLeague } = useThemeContext()

    const [isImageLoaded, setIsImageLoaded] = useState(false)

    return (
        <section className="fru-section">
            <h2>{selectedLeague.strLeague}</h2>
            <article className="league-badge-and-trophy">
                <article className="badge-trophy-container">
                    <figure className="badge">
                        <img 
                            src={`${selectedLeague.strBadge}/preview`} 
                            alt={`${selectedLeague.strLeague}'s Badge`} 
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
                                selectedLeague.strTrophy ?
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
                                src={selectedLeague.strTrophy} 
                                alt={`${selectedLeague.strLeague}'s Trophy`}
                                className="responsive-img"
                                onLoad={() => setIsImageLoaded(true)}
                            />
                        }
                        
                    </figure>
                </article>
            </article>
            <p className="league-desc desc-text white-space">{selectedLeague.strDescriptionEN}</p>
            <hr className="divider" />
            <Socials 
                name={selectedLeague.strLeague}
                facebookUrl={selectedLeague.strFacebook}
                instagramUrl={selectedLeague.strInstagram}
                twitterUrl={selectedLeague.strTwitter}
                youtubeUrl={selectedLeague.strYoutube}
            />
        </section>
    )
}

export default LeagueDetails
