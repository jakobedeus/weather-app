import React from 'react';
import './App.css';
import List from './components/List/List';
import Example from './components/ListItem/Example'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'


class App extends React.Component<{}, {}> {

  render() {
    return(
      <div className="wrapper">
        <h1>Weather app</h1>
        <List> </List>
        <DndProvider backend={HTML5Backend}>
					<Example />
				</DndProvider>
      </div>
    )
  }
}
export default App;
