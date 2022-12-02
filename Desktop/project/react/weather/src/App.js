import './App.css';
import {useState} from 'react';
function App() {
  const api ={
    base:"http://api.openweathermap.org/data/2.5/",
    key:"a5595f5e396c4743f195b3dcdc0b0a38"
  }
  const dateBuilder=(d)=>{
    let months =["january","february","March","April",
  "May","June","July","August","September","october","November","December"
  ];
  let days=["sunday","Monday","Tuesday","Wednesday","Thursday"
  ,"friday","Saturday"];
  let day= days[d.getDay()];
  let date = d.getDate();
  let Month= months[d.getMonth()];
  let annee = d.getFullYear();
  return `${day} ${date} ${Month} ${annee}`
  }
  const [query, setquery] = useState("");
  const [weather ,setweather] = useState({});

  const search =(evt)=>{
    if(evt.key==='Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res=>res.json())
      .then(data=>{
        setweather(data);
        setquery("")
        console.log(data)
    }
      )

    }
  }
  return (
    <div className={ (typeof weather.main !="undefined")?
    (( weather.main.temp>16)) ?
    'app-warm'
    :'App'
    :"App "}>
      <main>
      <div className='box'>
        <input type="text" placeholder='votre localisation ....'
         onChange={e=>setquery(e.target.value)}
         value={query}
         onKeyPress={search}
        ></input>
      </div>
      {
        (typeof weather.main !="undefined") ?(
          <>
          <div className='location'>
        <h3>{weather.name},{weather.sys.country}</h3>
        <div className='day'>
          {dateBuilder(new Date())}
        </div>
      </div>
      <div className='condition'>
        <div className='temp'>
    <h2>{Math.round(weather.main.temp)}°C</h2>
        </div>
        <div className=' weather'>
          <h4>Humidity</h4>
        <h2>{weather.main.humidity}</h2>
        <h2 className='desc'>{weather.weather[0].description}</h2>
        </div>
       
      </div>
          </>
        ):(" ")  
      }
      </main>
      </div>

  );
  
}

export default App;
