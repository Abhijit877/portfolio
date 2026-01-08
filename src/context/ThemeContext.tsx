import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type Persona = 'architect' | 'consultant';

interface ThemeContextType {
  theme: Theme;
  persona: Persona;
  toggleTheme: () => void;
  togglePersona: () => void;
  setTheme: (theme: Theme) => void;
  setPersona: (persona: Persona) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Map persona to theme
const personaToTheme: Record<Persona, Theme> = {
  architect: 'dark',
  consultant: 'light',
};

const themeToPersona: Record<Theme, Persona> = {
  dark: 'architect',
  light: 'consultant',
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [persona, setPersonaState] = useState<Persona>('architect'); // Default to Architect (dark)
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    // Check localStorage or system preference on mount
    const savedPersona = localStorage.getItem('persona') as Persona | null;
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedPersona) {
      setPersonaState(savedPersona);
      setThemeState(personaToTheme[savedPersona]);
    } else if (savedTheme) {
      setThemeState(savedTheme);
      setPersonaState(themeToPersona[savedTheme]);
    } else if (systemPrefersDark) {
      setPersonaState('architect');
      setThemeState('dark');
    } else {
      setPersonaState('consultant');
      setThemeState('light');
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a preference
      if (!localStorage.getItem('persona') && !localStorage.getItem('theme')) {
        const newPersona = e.matches ? 'architect' : 'consultant';
        setPersonaState(newPersona);
        setThemeState(personaToTheme[newPersona]);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []);

  useEffect(() => {
    // Apply theme class to html element with smooth transition
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark', 'architect', 'consultant');
    root.classList.add(theme, persona);
    localStorage.setItem('theme', theme);
    localStorage.setItem('persona', persona);
  }, [theme, persona]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setThemeState(newTheme);
    setPersonaState(themeToPersona[newTheme]);
  };

  const togglePersona = () => {
    const newPersona = persona === 'architect' ? 'consultant' : 'architect';
    setPersonaState(newPersona);
    setThemeState(personaToTheme[newPersona]);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    setPersonaState(themeToPersona[newTheme]);
  };

  const setPersona = (newPersona: Persona) => {
    setPersonaState(newPersona);
    setThemeState(personaToTheme[newPersona]);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      persona,
      toggleTheme,
      togglePersona,
      setTheme,
      setPersona
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
