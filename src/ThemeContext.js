import React, { useContext, useState } from 'react'

const ThemeContext = React.createContext()

export const useThemeContext = () => {
    return useContext(ThemeContext)
}

export const ThemeProvider = ({ children }) => {
    const [selectedLeagueDetails, setSelectedLeagueDetails] = useState({})

    return (
        <ThemeContext.Provider value={{selectedLeague: selectedLeagueDetails, setSelectedLeague: setSelectedLeagueDetails}}>
                {children}
        </ThemeContext.Provider>
    )
}