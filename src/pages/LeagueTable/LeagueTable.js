import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Dropdown from '../../components/Dropdown/Dropdown'
import Loading from '../../components/Loading/Loading'
import { useDataFetch } from '../../hooks/useDataFetch'

const LeagueTable = () => {

    const params = useParams();
    let history = useHistory();

    const formattedLeagueName = params.league.split('-').map(word => `${word.charAt(0).toUpperCase()}${word.substring(1)}`).join(' ')

    const currentYear = new Date().getFullYear()
    const currentSeason = `${currentYear - 1}-${currentYear}`
    const listOfSeasons = [`${currentYear - 1}-${currentYear}`, `${currentYear - 2}-${currentYear - 1}`, `${currentYear - 3}-${currentYear - 2}`,
    `${currentYear - 4}-${currentYear - 3}`, `${currentYear - 5}-${currentYear - 4}`, `${currentYear - 6}-${currentYear - 5}`]

    const [selectedSeason, setSelectedSeason] = useState(currentSeason)
    const [isLoading, data, error] = useDataFetch(`https://www.thesportsdb.com/api/v1/json/50130162/lookuptable.php?l=${params.leagueId}&s=${selectedSeason}`)

    const [leagueTable, setLeagueTable] = useState([])

    const onSeasonSelect = e => setSelectedSeason(e.target.value)


    useEffect(() => {
        if(data) {
            setLeagueTable(data.table)
        }
    }, [data])


    if (error) {
        console.log(error)
        return <>Network Error</>
    }

    return (
        <section className="fru-section league-table-section">
            {
                isLoading || !leagueTable ?
                <Loading message={"Loading league table..."} />
                :
                <>
                    <h2>{formattedLeagueName}</h2>
                    <button className="league-details-button highlight" onClick={() => history.push(`/search-competitions/${params.league}/${params.leagueId}/details`)}>Learn More</button>
                    <br />
                    <br />
                    <Dropdown dropdownOptions={listOfSeasons} prompt={"Select a season"} onChangeFunction={onSeasonSelect} />
                    <h3>{`${selectedSeason} Season`}</h3>
                    {
                        <section className="league-table">
                            <header className="table-row">
                                <div className="table-cell">Pos</div>
                                <div className="table-cell team-name-cell">Team</div>
                                <div className="table-cell">MP</div>
                                <div className="table-cell">W</div>
                                <div className="table-cell">D</div>
                                <div className="table-cell">L</div>
                                <div className="table-cell">GF</div>
                                <div className="table-cell">GA</div>
                                <div className="table-cell">GD</div>
                                <div className="table-cell">Pts</div>
                            </header>
                            {
                                leagueTable.map((team, index) => {
                                    if (index === 0) {
                                        console.log(team.strTeam);
                                    }
                                    const formattedTeamName = team.strTeam.toLowerCase().split(' ').join('-')
                                    return (
                                        <article key={team.idTeam} 
                                            className="league-table-row option" 
                                            onClick={() => history.push(`/search-competitions/${params.league}/${formattedTeamName}/${leagueTable[index].idTeam}`)}
                                        >
                                            <div className="table-cell curve-first-cell">{team.intRank}</div>
                                            <div className="table-cell team-name-cell">{team.strTeam}</div>
                                            <div className="table-cell">{team.intPlayed}</div>
                                            <div className="table-cell">{team.intWin}</div>
                                            <div className="table-cell">{team.intDraw}</div>
                                            <div className="table-cell">{team.intLoss}</div>
                                            <div className="table-cell">{team.intGoalsFor}</div>
                                            <div className="table-cell">{team.intGoalsAgainst}</div>
                                            <div className="table-cell">{team.intGoalDifference}</div>
                                            <div className="table-cell curve-last-cell">{team.intPoints}</div>
                                        </article>
                                    )
                                })
                            }
                        </section>
                        
                    }
                </>
                
            }
        </section>
    )
}

export default LeagueTable
