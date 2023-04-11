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
                                <h3>Age</h3>
                                <p>{`${getPlayerAge(playerDetails.dateBorn)}`}</p>
                            </article>
                            <article className="player-details__info-box-container--info-box">
                                <h3>Height</h3>
                                <p>{playerDetails.strHeight === "" ? "Unknown" : playerDetails.strHeight}</p>
                            </article>
                            <article className="player-details__info-box-container--info-box">
                                <h3>Weight</h3>
                                <p>{playerDetails.strWeight === "" ? "Unknown" : playerDetails.strWeight}</p>
                            </article>
                            <article className="player-details__info-box-container--info-box">
                                <h3>Position</h3>
                                <p>{playerDetails.strPosition === "" ? "Unknown" : playerDetails.strPosition}</p>
                            </article>
                            <article className="player-details__info-box-container--info-box">
                                <h3>Preferred Foot</h3>
                                <p>{playerDetails.strSide === "" ? "Unknown" : playerDetails.strSide}</p>
                            </article>
                            <article className="player-details__info-box-container--info-box">
                                <h3>Birth Location</h3>
                                <p>{playerDetails.strBirthLocation === "" ? "Unknown" : playerDetails.strBirthLocation}</p>
                            </article>
                            <article className="player-details__info-box-container--info-box">
                                <h3>Agent</h3>
                                <p>{playerDetails.strAgent === "" ? "Unknown" : playerDetails.strAgent}</p>
                            </article>
                            <article className="player-details__info-box-container--info-box">
                                <h3>Wage</h3>
                                <p>{playerDetails.strWage  === "" ? "Unknown" : playerDetails.strWage}</p>
                            </article>
                            <article className="player-details__info-box-container--info-box">
                                <h3>Signing Fee</h3>
                                <p>{playerDetails.strSigning  === "" ? "Unknown" : playerDetails.strSigning}</p>
                            </article>
                            <article className="player-details__info-box-container--info-box">
                                <h3>Shirt Number</h3>
                                <p>{playerDetails.strNumber === "" ? "Unknown" : playerDetails.strNumber}</p>
                            </article>
                            <article className="player-details__info-box-container--info-box">
                                <h3>Nationality</h3>
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