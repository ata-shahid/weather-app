import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { suggestionType } from '@/types/types';


export default function Searchfield() {
    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<suggestionType[]>([]);
    const router = useRouter();

    const getSearchSuggestions = (value: string) => {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
            .then((res) => res.json())
            .then((data) => {
                const mappedData = data.map((item: any) => ({
                    name: item.name,
                    country: item.country,
                    lat: item.lat,
                    lon: item.lon
                }));
                setSuggestions(mappedData);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        if (value.trim() === '') {
            setSuggestions([]);
            return;
        }
        getSearchSuggestions(value);
    }

    const onSuggestionSelect = (suggestion: suggestionType) => {
        setInputValue('');
        setSuggestions([]);
        const currentQuery = { ...router.query };
        const newQuery = { ...currentQuery, lat: suggestion.lat, lon: suggestion.lon};
        router.push({
            pathname: '/forecast',
            query: newQuery,
        });
    }

    return (
        <form className="relative items-center h-10 w-full max-w-lg border">
            <input
                onChange={handleInputChange}
                value={inputValue}
                type="text"
                className="bg-gray-50 border border-gray-500 h-full pl-3 pr-10 w-full "
            />
            <ul className="bg-gray-50 border border-gray-500">
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
