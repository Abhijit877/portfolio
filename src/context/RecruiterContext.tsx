import React, { createContext, useContext, useState } from 'react';

interface RecruiterContextType {
    isRecruiterMode: boolean;
    toggleRecruiterMode: () => void;
}

const RecruiterContext = createContext<RecruiterContextType | undefined>(undefined);

export const RecruiterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isRecruiterMode, setIsRecruiterMode] = useState(false);

    const toggleRecruiterMode = () => {
        setIsRecruiterMode((prev) => !prev);
    };

    return (
        <RecruiterContext.Provider value={{ isRecruiterMode, toggleRecruiterMode }}>
            {children}
        </RecruiterContext.Provider>
    );
};

export const useRecruiter = () => {
    const context = useContext(RecruiterContext);
    if (context === undefined) {
        throw new Error('useRecruiter must be used within a RecruiterProvider');
    }
    return context;
};
