import React from 'react';
import './_ListItem.scss';
import { Draggable } from "react-beautiful-dnd";

export interface IListItemProps {
  removeWeatherProps(id: number): void;
  weather: IListItemDetails[];

}

export interface IListItemDetails {
  name: string;
  id: any;
  temp: number;
  humidity: number;
  latitude: number;
  longitude: number;
  local: boolean;
}

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",

  // change background colour if dragging
  // background: isDragging ? "1px solid black" : "1px solid gray",

  // styles we need to apply on draggables
  ...draggableStyle
});

const Icon =(
  <svg viewBox="0 0 20 20">
    <path fill="none" d="M14.023,12.154c1.514-1.192,2.488-3.038,2.488-5.114c0-3.597-2.914-6.512-6.512-6.512
      c-3.597,0-6.512,2.916-6.512,6.512c0,2.076,0.975,3.922,2.489,5.114c-2.714,1.385-4.625,4.117-4.836,7.318h1.186
      c0.229-2.998,2.177-5.512,4.86-6.566c0.853,0.41,1.804,0.646,2.813,0.646c1.01,0,1.961-0.236,2.812-0.646
      c2.684,1.055,4.633,3.568,4.859,6.566h1.188C18.648,16.271,16.736,13.539,14.023,12.154z M10,12.367
      c-2.943,0-5.328-2.385-5.328-5.327c0-2.943,2.385-5.328,5.328-5.328c2.943,0,5.328,2.385,5.328,5.328
      C15.328,9.982,12.943,12.367,10,12.367z">
    </path>
  </svg>
)

class ListItem extends React.Component<IListItemProps, {}> {

  render() {
    
    return(
        <div className="">
          {this.props.weather.map((item, index) => (
              <Draggable
                key={item.id} draggableId={JSON.stringify(item.id)} index={index}>
                {(provided, snapshot) => (
                  <div 
                    className="list-item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <p><b>{item.name}</b> {item.temp} °C</p> 
                    <p>{
                      item.local ? 
                      'Local': ''
                      }
                    </p>
                    <button onClick={() => this.props.removeWeatherProps(item.id)} className="remove">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/>
                      </svg>
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
        </div>
    )}
  }

export default ListItem;

