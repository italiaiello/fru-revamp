import React, { useContext, useState } from 'react'
import { useHistory } from "react-router-dom"

const ThemeContext = React.createContext()
const ThemeUpdateContext = React.createContext()

export const useHistoryUpdate = () => {
    return useContext(ThemeUpdateContext)
}

export const ThemeProvider = ({ children }) => {
    let history = useHistory()

    const updateHistory = (route) => {
        history.push(route)
        window.location.reload()
    }

    return (
        <ThemeContext.Provider value={history}>
            <ThemeUpdateContext.Provider value={updateHistory}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}