import { useEffect, useState } from 'react';

export function useDisplayError() {

    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    // Hide the  message after 5 seconds if theres an error to display
    useEffect(() => {
        if (errorMessage) {
        console.log("inside display error message hook");
        console.log("in timeout for 8 seconds");
        const timer = setTimeout(() => {
            setErrorMessage(null);
            }, 8000);
            // Cleanup function to clear the timer
            return () => clearTimeout(timer);
        }
    },[errorMessage]); 

    return [errorMessage, setErrorMessage] as const;
}