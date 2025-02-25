import React from 'react';
import './_ListItem.scss';
import { Draggable } from "react-beautiful-dnd";
import { IWeatherDetails } from '../List/List';

export interface IListItemProps {
  removeWeatherProps(id: number): void;
  weather: IWeatherDetails[];
}

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // change background colour if dragging
  // background: isDragging ? "1px solid black" : "1px solid gray",

  // styles we need to apply on draggables
  ...draggableStyle
});

function ListItem (props: IListItemProps) {
  return (
    <div className="list-container">
      

    {props.weather.map((item, index) => (
        <Draggable
          key={item.id} draggableId={JSON.stringify(item.id)} index={index}>
          {(provided, snapshot) => (
            <div 
              className="list-item"
              id="item"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
            >
              <div className={'list-item-info'}>
                <div className="user">{ item.local ? 
                  <img src={require('../../imgs/user.png')} width="20px" height="20px"/> : '' }
                </div>
                  <img className="country-flag" src={('https://www.countryflags.io/' + `${item.country}` + '/flat/24.png')} alt="Icon of country"/>
                  <p><b>{item.name} </b></p> 
                  
                  <img src={('http://openweathermap.org/img/wn/' + `${item.icon}` + '@2x.png')} alt="Icon of weather"/>
                  <p className="temp">
                    {item.temp} °C
                  </p>
              </div>
      
              <button onClick={() => props.removeWeatherProps(item.id)} className="remove">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>
                </svg>
              </button>
            </div>
          )}
        </Draggable>
      ))}
  </div>
  )
}
export default ListItem;
