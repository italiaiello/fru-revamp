import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import { usePlayerFetch } from '../../hooks/usePlayerFetch'
import './PlayerDetails.scss'

const PlayerDetails = () => {
    
    const { playerId } = useParams()

    const [isLoading, playerDetails, error] = usePlayerFetch(`https://www.thesportsdb.com/api/v1/json/50130162/lookupplayer.php?id=${playerId}`)

    const getPlayerAge = (dateOfBirth) => new Date().getFullYear() - new Date(dateOfBirth).getFullYear()

    const [playerImage, setPlayerImage] = useState(null)

    useEffect(() => {
        if (playerDetails) {
            if (playerDetails.strCutout) {
                setPlayerImage(playerDetails.strCutout)
            } else if (playerDetails.strThumb) {
                setPlayerImage(playerDetails.strThumb)
            } else if (playerDetails.strRender) {
                setPlayerImage(playerDetails.strRender)
            } else if (playerDetails.strBanner) {
                setPlayerImage(playerDetails.strBanner)
            }
        }
    }, [playerDetails])

    if (error) {
        console.log(error)
        return <>Network error</>
    }


    return (
        <section className="player-details">
            {
                isLoading || !playerDetails ?
                <Loading message={"Loading player details..."} />
                :
                <>
                    <article>
                        <article className="player-details__header">
                            {
                                playerImage &&
                                <figure className="player-details__header--figure">
                                    <img src={playerImage} alt={playerDetails.strPlayer} className="responsive-img" />
                                </figure>
                            }
                            <h2 className="player-details__header--name">{playerDetails.strPlayer}</h2>
                        </article>
                        <article className='player-details__info-box-container'>
                            <article className="player-details__info-box-container--info-box">
                                <h4>Age</h4>
                                <p>{`${getPlayerAge(playerDetails.dateBorn)}`}</p>
                            </article>
                            <article className="player-details__info-box-container--info-box">
                                <h4>Height</h4>
                                <p>{playerDetails.strHeight === "" ? "Unknown" : playerDetails.strHeight}</p>
                            </article>
                            <article className="player-details__info-box-container--info-box">
                                <h4>Weight</h4>
                                <p>{playerDetails.strWeight === "" ? "Unknown" : playerDetails.strWeight}</p>
                            </article>
                            <article className="player-details__info-box-container--info-box">
                                <h4>Position</h4>
                                <p>{playerDetails.strPosition === "" ? "Unknown" : playerDetails.strPosition}</p>
                            </article>
                            <article className="player-details__info-box-container--info-box">
                                <h4>Preferred Foot</h4>
                                <p>{playerDetails.strSide === "" ? "Unknown" : playerDetails.strSide}</p>
                            </article>
                            <article className="player-details__info-box-container--info-box">
                                <h4>Birth Location</h4>
                                <p>{playerDetails.strBirthLocation === "" ? "Unknown" : playerDetails.strBirthLocation}</p>
                            </article>
                            <article className="player-details__info-box-container--info-box">
                                <h4>Agent</h4>
                                <p>{playerDetails.strAgent === "" ? "Unknown" : playerDetails.strAgent}</p>
                            </article>
                            <article className="player-details__info-box-container--info-box">
                                <h4>Wage</h4>
                                <p>{playerDetails.strWage  === "" ? "Unknown" : playerDetails.strWage}</p>
                            </article>
                            <article className="player-details__info-box-container--info-box">
                                <h4>Signing Fee</h4>
                                <p>{playerDetails.strSigning  === "" ? "Unknown" : playerDetails.strSigning}</p>
                            </article>
                            <article className="player-details__info-box-container--info-box">
                                <h4>Shirt Number</h4>
                                <p>{playerDetails.strNumber === "" ? "Unknown" : playerDetails.strNumber}</p>
                            </article>
                            <article className="player-details__info-box-container--info-box">
                                <h4>Nationality</h4>
                                <p>{playerDetails.strNationality  === "" ? "Unknown" : playerDetails.strNationality}</p>
                            </article>
                        </article>
                    </article>
                    <article className="player-details__about">
                        <h3>About {playerDetails.strPlayer}</h3>
                        <p className="desc-text white-space">{playerDetails.strDescriptionEN}</p>
                    </article>
                </>
            }
        </section>
    )
}

export default PlayerDetails