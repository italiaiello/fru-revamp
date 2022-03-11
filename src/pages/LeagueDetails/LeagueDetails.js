import React, { useState } from 'react'
import Socials from '../../components/Socials/Socials'
import { useDataFetch } from '../../hooks/useDataFetch'
import Loading from '../../components/Loading/Loading'
import { useParams } from 'react-router-dom'

const LeagueDetails = () => {
    
    const params = useParams()
    const [ isLoading, leagueDetails, error ] = useDataFetch(`https://www.thesportsdb.com/api/v1/json/50130162/lookupleague.php?id=${params.leagueId}`)
    const [isImageLoaded, setIsImageLoaded] = useState(false)

    if (error) {
        console.log(error)
        return <>Network Error</>
    }

    return (
        <section className="fru-section">
            {
                isLoading || leagueDetails === undefined ?
                <Loading message={'Loading team details...'} />
                :
                <>
                    <h2>{leagueDetails.leagues[0].strLeague}</h2>
                    <article className="league-badge-and-trophy">
                        <article className="badge-trophy-container">
                            <figure className="badge">
                                <img 
                                    src={`${leagueDetails.leagues[0].strBadge}/preview`} 
                                    alt={`${leagueDetails.leagues[0].strLeague}'s Badge`} 
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
                                        leagueDetails.leagues[0].strTrophy ?
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
                                        src={leagueDetails.leagues[0].strTrophy} 
                                        alt={`${leagueDetails.leagues[0].strLeague}'s Trophy`}
                                        className="responsive-img"
                                        onLoad={() => setIsImageLoaded(true)}
                                    />
                                }
                                
                            </figure>
                        </article>
                    </article>
                    <p className="league-desc desc-text white-space">{leagueDetails.leagues[0].strDescriptionEN}</p>
                    <hr className="divider" />
                    <Socials 
                        name={leagueDetails.leagues[0].strLeague}
                        facebookUrl={leagueDetails.leagues[0].strFacebook}
                        instagramUrl={leagueDetails.leagues[0].strInstagram}
                        twitterUrl={leagueDetails.leagues[0].strTwitter}
                        youtubeUrl={leagueDetails.leagues[0].strYoutube}
                    />
                </>
            }
        </section>
    )
}

export default LeagueDetails
