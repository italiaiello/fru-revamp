import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Dropdown from '../../components/Dropdown/Dropdown'
import Loading from '../../components/Loading/Loading'
import { useDataFetch } from '../../hooks/useDataFetch'

const LeagueTable = ({ leagueId, leagueName }) => {

    console.log(leagueId, leagueName)

    const [selectedSeason, setSelectedSeason] = useState('2019-2020')
    const [isLoading, data, error] = useDataFetch(`https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagueId}&s=${selectedSeason}`)

    const [leagueTable, setLeagueTable] = useState([])

    const onSeasonSelect = e => setSelectedSeason(e.target.value)


    useEffect(() => {
        if(data) {
            setLeagueTable(data.table)
        }
    }, [data])

    let history = useHistory();

    const formattedLeagueName = leagueName.toLowerCase().split(' ').join('-');

    if (error) {
        console.log(error)
        return <>Network Error</>
    }

    return (
        <section className="fru-section">
            {
                isLoading || !leagueTable ?
                <Loading message={"Loading league table..."} />
                :
                <>
                    <h2>{leagueName}</h2>
                    <button className="league-details-button highlight" onClick={() => history.push(`/search-competitions/${formattedLeagueName}/details`)}>Learn More</button>
                    <br />
                    <br />
                    <Dropdown dropdownOptions={["2020-2021", "2019-2020", "2018-2019", "2017-2018"]} prompt={"Select a season"} onChangeFunction={onSeasonSelect} />
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
                                    const formattedTeamName = team.name.toLowerCase().split(' ').join('-')
                                    const formattedLeagueName = leagueName.toLowerCase().split(' ').join('-')
                                    return (
                                        <article key={team.teamid} 
                                            className="league-table-row option" 
                                            onClick={() => history.push(`/search-competitions/${formattedLeagueName}/${formattedTeamName}/${team.teamid}`)}
                                        >
                                            <div className="table-cell curve-first-cell">{index + 1}</div>
                                            <div className="table-cell team-name-cell">{team.name}</div>
                                            <div className="table-cell">{team.played}</div>
                                            <div className="table-cell">{team.win}</div>
                                            <div className="table-cell">{team.draw}</div>
                                            <div className="table-cell">{team.loss}</div>
                                            <div className="table-cell">{team.goalsfor}</div>
                                            <div className="table-cell">{team.goalsagainst}</div>
                                            <div className="table-cell">{team.goalsdifference}</div>
                                            <div className="table-cell curve-last-cell">{team.total}</div>
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
