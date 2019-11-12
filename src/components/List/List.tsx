import React from 'react';
import PropTypes from 'react';
import './_List.scss';
import ListItem from '../ListItem/ListItem';
import Container from '../ListItem/Example';

const axios = require('axios');

interface IWeatherState {
  weather: IWeatherDetails[];
  lang: string;
}

interface IWeatherDetails {
  name: string;
  id: number;
  temp: number;
  humidity: number;
  latitude: number;
  longitude: number;
}

const ApiKey = "3b6cac1b1e318668b680ae452215be56";
const ApiUrl = "https://api.openweathermap.org/data/2.5/weather?";
const metric = "units=metric";

class List extends React.Component<{}, IWeatherState> {

  constructor(props: any) {
    super(props)

    this.state = {
      weather: [],
      lang: 'se'
    }
    this.getLocalWeater = this.getLocalWeater.bind(this);
    this.getDefaultWeather = this.getDefaultWeather.bind(this);
    this.removeWeather = this.removeWeather.bind(this);
    this.changeLang = this.changeLang.bind(this);
    this.setDataToState = this.setDataToState.bind(this);
  }
  

  setDataToState = (response: any) => {
    const weather = this.state.weather;
    this.setState({weather: [...weather,{
      name: response.data.name, 
      id: response.data.id,
      temp: response.data.main.temp.toFixed(),
      humidity: response.data.main.humidity,
      longitude: response.data.coord.lon,
      latitude: response.data.coord.lat
    }]}, () => {
      console.log(this.state.weather)
      localStorage.setItem("weather", JSON.stringify(this.state.weather))
    })
  }

  getDefaultWeather() {
    axios.get(`${ApiUrl}q=Stockholm&${metric}&appid=${ApiKey}`)
    .then((response: any[]) => {
      this.setDataToState(response)
    })
  }

  getWeatherByCoords(lat: number, long: number) {
    axios.get(`${ApiUrl}lat=${lat}&lon=${long}&${metric}&appid=${ApiKey}`)
    .then((response: any[]) => {
      this.setDataToState(response)
    })
  }

  getWeatherByName(city: string) {
    const weather = this.state.weather;

    for (let index = 0; index < weather.length; index++) {
      if(city === weather[index].name) {
        return null;
      }
    }

    axios.get(`${ApiUrl}q=${city}&${metric}&appid=${ApiKey}`)
      .then((response: any[]) => {
        this.setDataToState(response)
      }) 
    
  }

  getLocalWeater() {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat: number = position.coords.latitude;
        const long: number = position.coords.longitude;
        this.getWeatherByCoords(lat, long);
      }, error => {
        console.log("ingen geo")
      }) 
  }

  removeWeather(id: number) {
    let weatherStorage = JSON.parse(localStorage.getItem('weather') || '{}');
    const weather = this.state.weather;
    weather.splice(id, 1);
    weatherStorage.splice(id, 1)
    
    this.setState({ weather: weather }, () => {
      localStorage.setItem("weather", JSON.stringify(this.state.weather))
    });
  }

  changeLang(event: any) {
    event.preventDefault();
    this.setState({ lang: event.target.value }, () => {
      localStorage.setItem("lang", JSON.stringify(this.state.lang))
    })
  }

  componentDidMount() {
    let weather = JSON.parse(localStorage.getItem('weather') || '');

    if(weather.length > 1) {
      this.setState({ weather: weather });
    } else {
      this.getDefaultWeather();
    }
  };

  render() {
    const weather = this.state.weather
    weather.sort((a, b) => a.name.localeCompare(b.name))

    return(
      <div className="container">
        <div className="filter">
          <button onClick={this.getLocalWeater} className="local">Get local weather</button>
          <button onClick={() => this.getWeatherByName('London')}>London</button>
          <button  onClick={() => this.getWeatherByName('Barcelona')}>Barcelona</button>
        </div>

        <ListItem 
          weather={this.state.weather}
          removeWeatherProps={this.removeWeather}
        /> 
      </div>
    )
  }
}
export default List;
