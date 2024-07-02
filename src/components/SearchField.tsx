'use client';

import { useState, ChangeEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { suggestionType } from '@/types/types';
import { IoSearch } from "react-icons/io5";
import useDebounce from '@/hooks/useDebounce';


export default function Searchfield() {
    const [inputValue, setInputValue] = useState<string>('');
    const [error, setError] = useState<string>("");
    const [suggestions, setSuggestions] = useState<suggestionType[]>([]);
    const [, setCity]=useState<string>('');   //state to store city name
    
    const debouncedValue = useDebounce(inputValue, 500); // Debounce the input value to reduce the number of API calls

    const router = useRouter();
    // Fetch suggestions based on the debounced value. Debouncing is done to reduce the number of API calls. This improves performance.
    useEffect(() => {
        if (debouncedValue.trim() === '') {
            setSuggestions([]);
            setError('');
            return;
        }
    
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${debouncedValue.trim()}&limit=5&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
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
    }, [debouncedValue]);
    
    //updated handleInputChange function
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        setError('');
    };

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
          console.log("This is inputValue: " + inputValue);
    
          const { lat, lon } = data[0];
          const currentQuery = { ...router.query };
          const newQuery = { ...currentQuery, lat, lon, city: inputValue };
          
          // Log city and newQuery after setting the state
          setCity(inputValue);
          console.log("This is city: " + inputValue); //checking if city is set
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
        const city = `${suggestion.name}, ${suggestion.country}`;
        setInputValue(city);
        setSuggestions([]);
        setError('');
        fetchWeatherDataAndNavigate(city); // Fetch weather data and navigate to the forecast page (click and get data immediately)
    }

    // Function to fetch weather data and navigate to the forecast page
    const fetchWeatherDataAndNavigate = async (location: string) => {
        try {
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location.trim()}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`);
            const data = await response.json();
            if (data.length === 0) {
                setError("No suggestions found. Please enter a valid location.");
                return;
            }
    
            const { lat, lon } = data[0];
            const currentQuery = { ...router.query };
            const newQuery = { ...currentQuery, lat, lon, city: location };
    
            setCity(location);
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
    }
    

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setError('');
    }


        return (
            <form onSubmit={handleOnSubmit} className="relative items-center h-10 w-full max-w-lg border rounded-md" >
            <input
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                value={inputValue}
                type="text"
                className="bg-gray-50 border border-gray-500 h-full pl-3 pr-10 w-full rounded-md"
            />
            <button type="submit" className="absolute right-0 top-0 h-full px-3 flex items-center justify-center">
                <IoSearch className="text-gray-500 text-xl" />
            </button>
            <ul className="bg-gray-50 border border-gray-500 relative z-10 top-auto rounded-md">
                {error && suggestions.length < 1 && (
                <li className="text-red-600 p-1 ">{error}</li>
                )}
                {suggestions.map((suggestion, index) => (
                <li key={`${suggestion.name}-${index}`}>
                    <button
                    className="hover:bg-gray-700 w-full text-left hover:text-white text-sm rounded-sm"
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
