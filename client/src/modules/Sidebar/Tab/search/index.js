import React, {Component} from 'react';
import {Select} from 'antd';
import {MapBoxSearch} from './mapboxsearch';
import {LayerSearch} from './layersearch';
import {withApollo, graphql,Query} from "react-apollo";
import {GET_LAYERS_BY_ID, GET_DISPLAYED_LAYERS,USER_MAP_POSITION} from '../../../../graphql'
import * as _a from 'lodash/array';

const Option = Select.Option;
export class SearchTabComp extends Component
{
  constructor() {
    super();
    this.state = {
      searchSource: "layers"
    };

  }

  selectSource(layerIds) {
    switch (this.state.searchSource) {
      case "layers":
        return (
          <Query
            query={GET_LAYERS_BY_ID}
            fetchPolicy="cache-only"
            variables={{
            ids: this.props.DisplayedLayers.displayedLayers.ids
          }}>
            {({data}) => {
              return <LayerSearch apoClient={this.props.apoClient} layers={data}
              onSuggestionSelected={this.onSuggestionSelected.bind(this)} />
            }}

          </Query>

        )

      case "mapbox":
        return <MapBoxSearch 
        apoClient={this.props.client}
        onSuggestionSelected={this.onSuggestionSelected.bind(this)} />;
      default:
      return<div></div>;
    }
  }

  onSuggestionSelected(suggestion,source){
    switch(source){
      case "layers":
      case "mapbox":{
        this.props.client.writeQuery({
          query: USER_MAP_POSITION,
          data: {
        
            user: {
              id:1,
              initialZoom:7,
              initialPosition  : _a.reverse(suggestion.center),
              __typename:'User'
            }
          
          }
        });
        break;
      }
  
      default:{
        break;
      }

    }
    
    
  }

  handleChange(value) {
    this.setState({searchSource: value})

  }


  render() {
    return (
      <div id="findbox">
      <div>
    <Select defaultValue="Katmanlarda Ara" 
    dropdownClassName="search-options"
    className="search-select"
    onChange={this.handleChange.bind(this)}>
      <Option value="layers">Katmanlarda Ara</Option>
      <Option value="mapbox">Haritada Ara</Option>
    </Select>
        {/* <div>
          <div>
            <input
              type='radio'
              id='chk-layers'
              name='layers'
              value='layers'
              checked={this.state.searchSource === "layers"}
              onChange={(e) => this.setState({searchSource: e.target.value})}/>Katmanlarda Ara
            <br/>
            <input
              type='radio'
              id='chk-mapbox'
              name='mapbox'
              value='mapbox'
     
              checked={this.state.searchSource === "mapbox"}
              onChange={(e) => this.setState({searchSource: e.target.value})}/>Haritada Ara
          </div> */}
          </div><div>
          {this.selectSource(this.props.DisplayedLayers.ids)}
          </div>
        </div>



    )
  }

}

const SearchTabWithQueries = graphql(GET_DISPLAYED_LAYERS, {name: 'DisplayedLayers'})(SearchTabComp);

export const SearchTab = withApollo(SearchTabWithQueries)
