import React from 'react';
import './_ListItem.scss';

interface IListItemProps {
  city: string;
  wind: number;
  temp: number;
  humidity: number;
  main: string;
}

class ListItem extends React.Component<IListItemProps, {}> {


  render() {
    return(
      <div className="list-item">
        <p>{this.props.city}</p>
        <p>{this.props.wind}</p>
        <p>{this.props.temp}</p>
        <p>{this.props.humidity}</p>
        <p>{this.props.main}</p>
      </div>
    )
  }
}
export default ListItem;

