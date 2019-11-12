import React from 'react';
import './_ListItem.scss';

export interface IListItemProps {
  removeWeatherProps(id: number): void;
  weather: IListItemDetails[];
}

export interface IListItemDetails {
  name: string;
  id: number;
  temp: number;
  humidity: number;
  latitude: number;
  longitude: number;
}

class ListItem extends React.Component<IListItemProps, {}> {

  render() {
    const weather = this.props.weather;
    return(
        <div className="list">
            {Object.keys(this.props.weather).map((key: any) => {
              return(
                <div className="list-item" key={key}>
                  <p><b>{weather[key].name}</b> {weather[key].temp} °C</p> 
                  <button onClick={() => this.props.removeWeatherProps(key)} className="remove">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>
                    </svg>
                  </button>
                </div>
              )
            })}
        </div>
    )
  }
}
export default ListItem;

