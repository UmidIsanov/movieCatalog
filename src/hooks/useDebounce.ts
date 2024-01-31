import { useEffect, useState } from "react";

interface UseDebounceIProps<T>{
    value: T;
    delay: number;
}



export default function useDebounce<T>({value, delay}: UseDebounceIProps<T>) {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay)

        return () => {
            clearTimeout(timer);
        }
    }, [value, delay])

    return debouncedValue;
}