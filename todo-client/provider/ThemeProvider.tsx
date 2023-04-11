import {createContext, useState, PropsWithChildren} from 'react';
import * as React from 'react';

type ThemeContextType = {
    isDarkTheme: boolean;
    toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

    const toggleTheme = (): void => {
        setIsDarkTheme(prevTheme => !prevTheme);
    };

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

