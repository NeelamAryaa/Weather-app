import React, { useState } from 'react';
import axios from 'axios';
import Config from './config'

const api = {
  key: Config.key,
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({}); 

    

    const search = (event) => {
      // console.log(Key)
      if(event.key === "Enter" && query !== '')  {
        const url = `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`;
        console.log(url)
        axios.get(url)
        .then(result => {
          // console.log(result.data)
            setWeather(result.data)
            setQuery('');
          })
  
          .catch(error => {
            console.log(error)
            alert("Something went wrong");
          })
        }
    };

 
  


  

  console.log(weather)
  return (
    <div className={(typeof weather.main != "undefined") 
      ? ((weather.main.temp > 16) 
        ? 'app warm' 
        : 'app cold') 
      : 'app'}>

      <main>
        <div className="search-box">
          <input 
          className="search-bar" 
          type="text" 
          placeholder="Search" 
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{new Date().toDateString()}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div className="first-view">Weather App</div>
        )}
        
      </main>
    </div>
  );
}

export default App;
