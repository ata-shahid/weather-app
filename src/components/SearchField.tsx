import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { suggestionType } from '@/types/types';
import { IoSearch } from "react-icons/io5";


export default function Searchfield() {
    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<string>("");
    const [suggestions, setSuggestions] = useState<suggestionType[]>([]);
    const router = useRouter();

    const getSearchSuggestions = (value: string) => {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
            .then((res) => res.json())
            .then((data) => {
                const uniqueNames = new Set();
                const mappedData = data.map((item: suggestionType) => ({
                    name: item.name,
                    country: item.country,
                    lat: item.lat,
                    lon: item.lon
                })).filter((item: suggestionType) => {
                    if (!uniqueNames.has(item.name)) {
                        uniqueNames.add(item.name);
                        return true;
                    }
                    return false;
                });
                setSuggestions(mappedData);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        if (value.trim() === '') {
            setSuggestions([]);
            setError('');
            return;
        }
        getSearchSuggestions(value);
        setError('');
    }

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputValue.trim() === "") {
            setError("Please enter a location");
            return;
        }
        
        try {
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${inputValue.trim()}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`);
            const data = await response.json();
            if (data.length === 0) {
                setError("No suggestions found. Please enter a valid location.");
                return;
            }

            const { lat, lon } = data[0];
            const currentQuery = { ...router.query };
            const newQuery = { ...currentQuery, lat, lon };
            router.push({
                pathname: '/forecast',
                query: newQuery,
            });
        } catch (error) {
            setError("An error occurred. Please try again.");
            console.error("Error fetching data:", error);
        }
        
        setInputValue("");
        setSuggestions([]);
    };

    const onSuggestionSelect = (suggestion: suggestionType) => {
        setInputValue(`${suggestion.name}, ${suggestion.country}`);
        setSuggestions([]);
        setError('');
    }

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setError('');
    }

        return (
            <form onSubmit={handleOnSubmit} className="relative items-center h-10 w-full max-w-lg border" >
            <input
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                value={inputValue}
                type="text"
                className="bg-gray-50 border border-gray-500 h-full pl-3 pr-10 w-full "
            />
            <button type="submit" className="absolute right-0 top-0 h-full px-3 flex items-center justify-center">
                <IoSearch className="text-gray-500 text-xl" />
            </button>
            <ul className="bg-gray-50 border border-gray-500 relative z-10">
                {error && suggestions.length < 1 && (
                <li className="text-red-600 p-1 ">{error}</li>
                )}
                {suggestions.map((suggestion, index) => (
                <li key={`${suggestion.name}-${index}`}>
                    <button
                    className="hover:bg-gray-700 w-full text-left hover:text-white text-sm"
                    type="button"
                    onClick={() => onSuggestionSelect(suggestion)}
                    >
                    {suggestion.name}, {suggestion.country}
                    </button>
                </li>
                ))}
            </ul>
            </form>
        );
    }
