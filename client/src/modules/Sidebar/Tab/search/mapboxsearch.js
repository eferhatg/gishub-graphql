import React, { Component } from 'react';
import {Spin} from 'antd'
import Autosuggest from 'react-autosuggest';
import axios from 'axios';


function getMatchingPlaces(value,cb) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }
  
  axios
  .get("https://api.mapbox.com/geocoding/v5/mapbox.places/"+value+".json?access_token=pk.eyJ1IjoiZWZlcmhhdGciLCJhIjoiY2pmNG0xNms2MGhwMjMzbnJrZzI0d3c3cyJ9.EqGfUXrsquO67oTbp3P7Yw")
  .then(function (response) {
    cb(response.data.features)
  })
  .catch(function (error) {
    cb([])
  });
}


function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}


function getSuggestionValue(suggestion) {
  return suggestion.place_name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.place_name}</span>
  );
}

export class MapBoxSearch extends Component {
  constructor() {
    super();
    this.onSuggestionSelected=this.onSuggestionSelected.bind(this);
    this.state = {
      value: '',
      suggestions: [],
      isLoading: false
    };
    
    this.lastRequestId = null;
  }
  
  loadSuggestions(value) {

    if (this.lastRequestId !== null) {
      clearTimeout(this.lastRequestId);
    }
    
    this.setState({
      isLoading: true
    });
    var self=this;
    getMatchingPlaces(value,function(features){
      self.setState({
        isLoading: false,
        suggestions: features
      });
    });


  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };
    
  onSuggestionsFetchRequested = ({ value }) => {
    this.loadSuggestions(value);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  onSuggestionSelected(event, { suggestion}){

    this.props.onSuggestionSelected(suggestion,"mapbox");
}

renderInputComponent = inputProps => (
  <div>
    <input {...inputProps} />
  
  </div>
);
  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Haritada ara",
      value,
      onChange: this.onChange,
      className:'ant-input'
    };

    
    return (
      <div>
       
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          onSuggestionSelected={this.onSuggestionSelected}
          inputProps={inputProps} />
        <div className={this.state.isLoading?'status':'status display-none'}>
          <Spin />
        </div>
      </div>
    );
  }
}


