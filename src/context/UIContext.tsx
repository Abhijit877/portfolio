import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface UIContextType {
    isChatOpen: boolean;
    setChatOpen: (open: boolean) => void;
    toggleChat: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isChatOpen, setChatOpen] = useState(false);

    const toggleChat = () => setChatOpen(prev => !prev);

    return (
        <UIContext.Provider value={{ isChatOpen, setChatOpen, toggleChat }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (context === undefined) {
        throw new Error('useUI must be used within a UIProvider');
    }
    return context;
};
