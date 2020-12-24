import React, { useState, useEffect } from 'react'
import Dropdown from '../../components/Dropdown/Dropdown'
import { useDataFetch } from '../../hooks/useDataFetch'

const LeagueTable = ({ leagueId, leagueName }) => {

    const [selectedSeason, setSelectedSeason] = useState('2020-2021')
    const [isLoading, data, error] = useDataFetch(`https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagueId}&s=${selectedSeason}`)

    const [leagueTable, setLeagueTable] = useState([])

    const onSeasonSelect = e => setSelectedSeason(e.target.value)


    useEffect(() => {
        if(data) {
            setLeagueTable(data.table)
        }
    }, [data])

    return (
        <section className="fru-section">
            {
                isLoading || !leagueTable ?
                <h2>Loading league table...</h2>
                :
                <>
                    <h2>{leagueName}</h2>
                    <h3>{`${selectedSeason} Season`}</h3>
                    <Dropdown dropdownOptions={["2020-2021", "2019-2020", "2018-2019", "2017-2018"]} prompt={"Select a season"} onChangeFunction={onSeasonSelect} />
                    {   
                        <table className="league-table">
                            <thead>
                                <tr>
                                    <th>Pos</th>
                                    <th>Team</th>
                                    <th>MP</th>
                                    <th>W</th>
                                    <th>D</th>
                                    <th>L</th>
                                    <th>GF</th>
                                    <th>GA</th>
                                    <th>GD</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    leagueTable.map((team, index) => {
                                        return (
                                            <tr key={team.teamid} className="league-table-row">
                                                <td>{index + 1}</td>
                                                <td>{team.name}</td>
                                                <td>{team.played}</td>
                                                <td>{team.win}</td>
                                                <td>{team.draw}</td>
                                                <td>{team.loss}</td>
                                                <td>{team.goalsfor}</td>
                                                <td>{team.goalsagainst}</td>
                                                <td>{team.goalsdifference}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        
                    }
                </>
            }
        </section>
    )
}

export default LeagueTable
