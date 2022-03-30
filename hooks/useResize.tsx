import { useEffect, useState } from 'react';

export default function useResize<T>(callback: () => T) {
    const [returnValue, setReturn] = useState<T>();
    const handleResize = () => setReturn(callback());

    useEffect(() => {
        handleResize();

        window.addEventListener('resize', () => handleResize());
    }, []);

    return returnValue;
}
