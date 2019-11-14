import React from 'react';
import './_Search.scss';
import { DebounceInput } from 'react-debounce-input';
import { SearchDetails } from '../List/List';

export interface IListItemProps {
    handleInput(event: any): any;
    handleEnter(value: string): any;
    results: SearchDetails[];
    addToList(name: string): any;
}

export interface IListItemDetails {
    name: string;
    id: any;
    temp: number;
    humidity: number;
    latitude: number;
    longitude: number;
    local: boolean;
    icon: string;
}

// props: IListItemProps
function Search (props: IListItemProps) {
    return (
    <div className="search__wrapper">
        <DebounceInput 
            // debounceTimeout={500}
            onChange={event => props.handleInput(event)}
            onKeyPress={props.handleEnter}
            className="weather__search" placeholder="Search for a city" 

        > 
        </DebounceInput>  
        {/* <p>{ props.results ? 'resultat': 'inga resultat' }</p> */}
       
            <div className="results">
            {Object.keys(props.results).map((key: any, index: any) => 
                <div key={props.results[index].id}>
                    {console.log(props.results[key].name)}
                    <div className="results-item">
                        <p>{props.results[key].name} - {props.results[key].temp} °C</p>
                        <button onClick={() => props.addToList(props.results[index].name)}>Add to list</button>
                    </div>
                </div>
            )}
        </div>
    </div>
    )
}
export default Search;
