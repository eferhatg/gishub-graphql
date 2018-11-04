import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import { center as _tcenter }  from '@turf/turf';
import {Input} from 'antd';


const getSuggestions = (layers,value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  if(inputValue.length === 0||!layers.getLayersById) return [];
  var suggestArray=[];
  //Convert to deep map

  layers.getLayersById.forEach(layer => {
    let section ={title:layer.name,suggests:[]}
    if(inputLength === 0 ) return [];
    var sectionSuggests=layer.features.filter(function(suggest){
      return suggest.properties.name.toLowerCase().includes(inputValue)
    });
    section.suggests=sectionSuggests;
    suggestArray.push(section);
  });
  return suggestArray;
};



function renderSectionTitle(section) {
  return (
    <strong>{section.title}</strong>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.properties.name;
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.properties.name}</span>
  );
}

function getSectionSuggestions(section) {
  return section.suggests;
}


export  class LayerSearch extends Component {
  constructor(props) {
  super(props);
 
    this.onSuggestionSelected=this.onSuggestionSelected.bind(this);

    this.state = {
      value: '',
      suggestions: [],
      noSuggestions:false
    };
  }
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    const isInputBlank = value.trim() === '';
    const suggestions=getSuggestions(this.props.layers,value);
    let hasSugg=false;
    suggestions.forEach(s=>{if(s.suggests.length>0){hasSugg=true}})
    const noSuggestions = !isInputBlank && !hasSugg;  
    this.setState({
      suggestions: suggestions,
      noSuggestions:noSuggestions
    });
  };

  onSuggestionSelected(event, { suggestion}){
    var center=_tcenter(suggestion);
    this.props.onSuggestionSelected({center:center.geometry.coordinates},"layers");
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };



  render() {

    const { value, suggestions, noSuggestions } = this.state;
    const inputProps = {
      placeholder: 'Katmanlarda ara',
      value,
      onChange: this.onChange,
      className:'ant-input'
    };
    
    return (
      <div>
      <Autosuggest
      multiSection={true}
      suggestions={suggestions}
      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      onSuggestionSelected={this.onSuggestionSelected}
      renderSuggestion={renderSuggestion}
      renderSectionTitle={renderSectionTitle}
      getSectionSuggestions={getSectionSuggestions}
   
      inputProps={inputProps} 
      />
      {
        noSuggestions &&
          <div className="no-suggestions">
            Öğe bulunamadı!
          </div>
      }
      </div>
    );
    
  }
}