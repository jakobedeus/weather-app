import React from 'react';
import ReactDOM from "react-dom";
import './App.css';
import List from './components/List/List';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'


class App extends React.Component<{}, {}> {

  render() {
    return(
      <div className="wrapper">
        <h1>Weather app</h1>
        <List/>
      </div>
    )
  }
}
export default App;


// Put the thing into the DOM!
ReactDOM.render(<App />, document.getElementById("root"));

