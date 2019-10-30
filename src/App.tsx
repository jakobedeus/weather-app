import React from 'react';
import './App.css';
import List from './components/List/List';


class App extends React.Component<{}, {}> {

  render() {
    return(
      <div className="wrapper">
        <h1>Weather app</h1>
        <List />
      </div>
    )
  }
}
export default App;
