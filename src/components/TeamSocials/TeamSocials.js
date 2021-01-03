import React from 'react'
import Facebook from '../../assets/icons/facebook.svg'
import Website from '../../assets/icons/website.svg'
import Instagram from '../../assets/icons/instagram.svg'
import Twitter from '../../assets/icons/twitter.svg'
import YouTube from '../../assets/icons/youtube.svg'
import { Link } from 'react-router-dom'

const TeamSocials = ({ teamName, websiteUrl, facebookUrl, instagramUrl, twitterUrl, youtubeUrl }) => {
    return (
        <section className="team-socials">
            <h4>{`Check Out ${teamName}'s Socials`}</h4>
            <article className="social-logo-container">
                {
                    websiteUrl &&
                    <figure className="social-logo option">
                        <Link to={{ pathname: `https://${websiteUrl}` }} target="_blank">
                            <img src={Website} alt={`${teamName}'s Website`} className="responsive-img" />
                        </Link>
                    </figure>
                }  
                {
                    facebookUrl &&
                    <figure className="social-logo option">
                        <Link to={{ pathname: `https://${facebookUrl}` }} target="_blank">
                            <img src={Facebook} alt={`${teamName}'s Facebook`} className="responsive-img" />
                        </Link>
                    </figure>
                }
                {
                    instagramUrl &&
                    <figure className="social-logo option">
                        <Link to={{ pathname: `https://${instagramUrl}` }} target="_blank">
                            <img src={Instagram} alt={`${teamName}'s Instagram`} className="responsive-img" />
                        </Link>
                    </figure>
                }
                {
                    twitterUrl &&
                    <figure className="social-logo option">
                        <Link to={{ pathname: `https://${twitterUrl}` }} target="_blank">
                            <img src={Twitter} alt={`${teamName}'s Twitter`} className="responsive-img" />
                        </Link>
                    </figure>
                }
                {
                    youtubeUrl &&
                    <figure className="social-logo option">
                        <Link to={{ pathname: `https://${youtubeUrl}` }} target="_blank">
                            <img src={YouTube} alt={`${teamName}'s YouTube`} className="responsive-img" />
                        </Link>
                    </figure>
                }
            </article>
        </section>
    )
}

export default TeamSocials
