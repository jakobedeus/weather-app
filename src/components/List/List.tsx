import React from 'react';
import './_List.scss';
import ListItem from '../ListItem/ListItem';

const axios = require('axios');

interface IWeatherState {
  city: string;
  wind: number;
  temp: number;
  humidity: number;
  main: string;
  latitude: number;
  longitude: number;
}
const ApiKey = "3b6cac1b1e318668b680ae452215be56";
const ApiUrl = "https://api.openweathermap.org/data/2.5/weather?";

class List extends React.Component<{}, IWeatherState> {

  constructor(props: any) {
    super(props)

    this.state = {
      city: "Stockholm",
      wind: .2,
      temp: 20,
      humidity: .4,
      main: "Cloudy",
      latitude: 35,
      longitude: 139,
    }
  }

  getWeather() {
    axios.get(`${ApiUrl}q=${this.state.city}&appid=${ApiKey}`)
    .then((response: any) => {
      const data = response.data;
      this.setState({city: data.name, wind: data.wind.speed, temp: data.main.temp, humidity: data.main.humidity })
    })
  }

  myPosition() {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.state.latitude}&lon=${this.state.longitude}&appid=3${ApiKey}`)
    .then((response: any) => {
      const data = response.data;
      this.setState({city: data.name, wind: data.wind.speed, temp: data.main.temp, humidity: data.main.humidity })
    })
  }

  getLocation() {
    // const geo = navigator.geolocation;
    // navigator.geolocation.getCurrentPosition(this.showPosition);
    // console.log(geo)
    // this.showPosition(geo)
      // if (geo) {
      //   geo.getCurrentPosition(this.showPosition);
      // } else { 
      //   console.log("not supported")
      // }
    
    
  }

  showPosition(position: any) {
    console.log("Latitude:", position.coords.latitude, "Longitude", position.coords.longitude)
    // x.innerHTML = "Latitude: " + position.coords.latitude + 
    // "<br>Longitude: " + position.coords.longitude;
  }

  componentDidMount() {
    this.getWeather();
  };

  render() {
    return(
      <div className="container">
        <button onClick={this.myPosition}>Weather where I am</button>
        <button onClick={this.getLocation}>Get my position</button>
        <div className="list">
          <ListItem           
            city={this.state.city}
            wind={this.state.wind}
            temp={this.state.temp}
            humidity={this.state.humidity}
            main={this.state.main}/>
        </div>
      </div>
    )
  }
}
export default List;
