import React from 'react';
import './_List.scss';
import ListItem from '../ListItem/ListItem';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { debounce  as lodashDebounce } from 'lodash';
import axios, { AxiosResponse } from 'axios';
import debounce from 'lodash.debounce';
import {DebounceInput} from 'react-debounce-input';


interface IWeather {
  weather: IWeatherDetails[];
  loading: boolean;
  sorting: string;
  search: string;

}

interface IWeatherDetails {
  name: string;
  id: number;
  temp: number;
  humidity: number;
  latitude: number;
  longitude: number;
  local: boolean;
  icon: string;
}


const ApiKey = "3b6cac1b1e318668b680ae452215be56";
const ApiUrl = "https://api.openweathermap.org/data/2.5/weather?";
const metric = "units=metric";


// a little function to help us with reordering the result
const reorder = (list: IWeatherDetails[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getListStyle = (isDraggingOver: any) => ({
  background: isDraggingOver ? "transparent" : "transparent",
});






class List extends React.Component<{}, IWeather> {
  constructor(props: any) {
    super(props)
    const weather = JSON.parse(localStorage.getItem('weather') || '[]');
    
    this.state = {
      weather: weather,
      loading: false,
      sorting: 'Alpabetical',
      search: ""
    }

    if(weather.length > 1) {
      this.setState({ weather: weather }, () => {
          weather.sort((a: any, b: any) => a.name.localeCompare(b.name))
      });
    } else {
      this.getDefaultWeather();
    }

    weather.sort(function(a: any,b: any){return b.local-a.local});

    this.getLocalWeater = this.getLocalWeater.bind(this);
    this.getDefaultWeather = this.getDefaultWeather.bind(this);
    this.removeWeather = this.removeWeather.bind(this);
    this.setDataToState = this.setDataToState.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.searchLocation = this.searchLocation.bind(this);
    this.debouncedSearch = this.debouncedSearch.bind(this);
    // this.debouncedSearch = lodashDebounce((event: any) => this.searchLocation = (event: any) =>  500);
    this.debouncedSearch = debounce(this.searchLocation,1000);

    this.clearList = this.clearList.bind(this);
  }

  debouncedSearch = (event: any) => {
    console.log("debounce");
  
    // this.searchLocation = debounce((value: any) => this.searchLocation(value), 500 )
    // this.searchLocation = debounce(this.searchLocation, 500 )
    
  }
  
  searchLocation = (event: any) => {
    // console.log(event.taget.value);
    
    console.log(event.currentTarget.value);
    
    // let { value } = event.target;
    // console.log(event.target.value);
    // // console.log(value);
    // this.setState({
    //     search: value
    // })
  };


  onDragEnd(result: any) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const weather = reorder(
      this.state.weather,
      result.source.index,
      result.destination.index
    );

    this.setState({
      weather
    }, () => {
      localStorage.setItem("weather", JSON.stringify(this.state.weather))
    });
  }

  

  setDataToState = (response: any, local: boolean) => {
    const weather = this.state.weather;
    let icon: string = '';
    response.data.weather.map((item: any, index: any)  => {
      return icon = item.icon
    })
    this.setState({weather: [...weather,{
      name: response.data.name, 
      id: response.data.id,
      temp: response.data.main.temp.toFixed(),
      humidity: response.data.main.humidity,
      longitude: response.data.coord.lon,
      latitude: response.data.coord.lat,
      local: local,
      icon: icon
    }]}, () => {
      localStorage.setItem("weather", JSON.stringify(this.state.weather))
    })
  }

  getDefaultWeather() {
    const local = false;
    if(localStorage.getItem("weather") === null || this.state.weather.length === 0) {
      axios.get(`${ApiUrl}q=Stockholm&${metric}&appid=${ApiKey}`)
      .then((response: any) => {
        this.setDataToState(response, local)
      })
    }
  }

  getWeatherByCoords(lat: number, long: number, local: boolean) {
    const weather = this.state.weather;
    for (let index = 0; index < weather.length; index++) {       
      if(JSON.parse(lat.toFixed(2)) === weather[index].latitude || JSON.parse(long.toFixed(2)) === weather[index].longitude) {
        return null;
      }
    }

    axios.get(`${ApiUrl}lat=${lat}&lon=${long}&${metric}&appid=${ApiKey}`)
    .then((response: AxiosResponse<IWeatherDetails[]>) => {
      this.setDataToState(response, local)
    })
  }

  // getWeatherByName = debounce((city: any) => {
  //   const local = false;
  //   const weather = this.state.weather;

  //   for (let index = 0; index < weather.length; index++) {
  //     if(city === weather[index].name) {
  //       return null;
  //     }
  //   }

  //   axios.get(`${ApiUrl}q=${city}&${metric}&appid=${ApiKey}`)
  //     .then((response: IWeatherDetails[]) => {
  //       this.setDataToState(response, local)
  //     }) 
  // });

  getWeatherByName(city: string) {
    const local = false;
    const weather = this.state.weather;

    for (let index = 0; index < weather.length; index++) {
      if(city === weather[index].name) {
        return null;
      }
    }

    axios.get(`${ApiUrl}q=${city}&${metric}&appid=${ApiKey}`)
      .then((response: AxiosResponse<IWeatherDetails[]>) => {
        this.setDataToState(response, local)
      }) 
  }

  getLocalWeater() {
    
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat: number = position.coords.latitude;
        const long: number = position.coords.longitude;
        const local: boolean = true;
        this.getWeatherByCoords(lat, long, local);
      }, error => {
        console.log("ingen geo")
      }) 
  }

  removeWeather = (id: any)  => {
    const filteredArray = this.state.weather.filter(task => task.id !== id);
    this.setState({ weather: filteredArray}, () => {
      localStorage.setItem("weather", JSON.stringify(this.state.weather))
    })
  }


  // sortCold = () => {
  //   const weather = this.state.weather;
  //   this.setState({ 
  //     weather:  
  //     weather.sort((a, b) => (a.temp - b.temp)), sorting: 'Cold'  });
  // }

  // sortWarm = () => {
  //   const weather = this.state.weather;
  //   this.setState({ 
  //     weather:  
  //     weather.sort((a, b) => (b.temp - a.temp)), sorting:ls 'Hot'  });
  // }

  // sortAlphabetical = () => {
  //   const weather = this.state.weather;
  //   this.setState({ 
  //     weather:  
  //     weather.sort((a: any, b: any) => a.name.localeCompare(b.name)), sorting: 'Alphabetical' });
  // }


  clearList() {
    this.setState({ weather: [] }, () => {
      localStorage.clear();
    })
  }

  render() {
    // onChange={_.debounce(this.searchLocation.bind(this), 1000 )}
    return(
      <div className="weather">
        
        <div className="weather__filter">
          <button onClick={this.getLocalWeater} className="weather__filter-local">Get local weather</button>
          <button onClick={this.clearList} className="weather__filter-delete">
          Empty list
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
              <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>
            </svg>
          </button>

          <DebounceInput 
            minLength={2}
            debounceTimeout={1000}
            onChange={event => this.setState({search: event.target.value}, () => this.getWeatherByName(event.target.value))}
            className="weather__search" placeholder="Search for a city" 
          >
          </DebounceInput>          

          {/* <input type="text" className="weather__search" placeholder="Search for a city" onChange={this.debouncedSearch} value={this.state.search}/> */}
        </div>
        {/* <div className="weather__sort">
          
          <button onClick={this.sortCold}>Cold</button>
          <button onClick={this.sortWarm}>Hot</button>
          <button onClick={this.sortAlphabetical}>Alphabetical</button>
        </div> */}
        {/* <p>Sorting list by <b>{this.state.sorting}</b></p> */}
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                <ListItem 
                  weather={this.state.weather}
                  removeWeatherProps={this.removeWeather}
                /> 
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    )
  }
}
export default List;
