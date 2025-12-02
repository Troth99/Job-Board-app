import { useState } from "react";


export  function useLocalStorage<T>(key: string, initialValue: T) {
const [value, setValue] = useState<T>(() => {
    try {
        const item =localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
    } catch (error) {
        return initialValue
    }
})

const setStoredValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue))
}
return [value, setStoredValue] as const
}