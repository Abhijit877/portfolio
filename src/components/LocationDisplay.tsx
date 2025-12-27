import React, { useState, useEffect } from 'react';

interface LocationState {
    city: string;
    country: string;
}

const LocationDisplay: React.FC = () => {
    const [location, setLocation] = useState<LocationState | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/');

                if (!response.ok) {
                    throw new Error('Location fetch failed');
                }

                const data = await response.json();

                if (data.error) {
                    throw new Error(data.reason || 'API Error');
                }

                setLocation({
                    city: data.city || 'Unknown',
                    country: data.country_code || ''
                });
            } catch (err) {
                console.warn('Geolocation failed:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, []);

    if (loading) {
        return <span className="animate-pulse">Locating...</span>;
    }

    if (error || !location) {
        return <span>Earth</span>;
    }

    return (
        <span>
            {location.city}, {location.country}
        </span>
    );
};

export default LocationDisplay;
