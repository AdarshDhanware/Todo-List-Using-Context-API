import { useContext,createContext } from "react";

export const ThemeContext=createContext({
    theme:"light",
    lightTheme:()=>{},
    darkTheme:()=>{}
})

export const ThemeProvider=ThemeContext.Provider

export default function useTheme(){
    return useContext(ThemeContext)
}