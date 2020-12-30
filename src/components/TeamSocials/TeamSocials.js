import React from 'react'
import Facebook from '../../assets/icons/facebook.svg'
import Website from '../../assets/icons/website.svg'
import Instagram from '../../assets/icons/instagram.svg'
import Twitter from '../../assets/icons/twitter.svg'
import YouTube from '../../assets/icons/youtube.svg'

const TeamSocials = ({ website, facebook, instagram, twitter, youtube }) => {
    return (
        <article>
            {
                website &&
                <figure>
                    <img src="" />
                </figure>
            }
        </article>
    )
}

export default TeamSocials
