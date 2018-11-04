import React, { Component } from 'react';
import {GeoJSON} from 'react-leaflet'
import {GET_SELECTED_TAB,GET_SELECTED_FUTURE,GEOJSON_LOCAL_QUERY} from '../../../graphql'

import { withApollo,graphql } from 'react-apollo';
class GeoJSONComp extends Component {

  //Each click on feature
  onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.name) {
        layer.bindPopup(feature.properties.name);
        layer.on({
          click: ()=>{this.selectFeature(feature,layer);}
        });   
        
    }
  }


  //When select a feature
  selectFeature = (feature, layer) => {

    //Saves selectedFeature
    this.props.client.writeQuery({
      query: GET_SELECTED_FUTURE,
      data: {
        selectedFeature: {
          feature:feature,
          __typename: "SelectedFeature"
        }
      }
    });

    //Opens sidebar info tab
    this.props.client.writeQuery({
      query: GET_SELECTED_TAB,
      data: {
        sidebar: {
          collapsed:false,
          selectedTab: 'info',
          __typename:'Sidebar'
        }
      }
    });
  }


  getStyle(feature, layer) {
    return {color: '#006400', weight: 5, opacity: 0.65}
  }

  render() {

    return (
      <div>
         {(this.props.GeoJSONData && this.props.GeoJSONData.geojson.length > 0)? 
              this.props.GeoJSONData.geojson.map((layer)=> {
                return <GeoJSON 
                        data={layer} 
                        key={layer.key} 
                        style={this.getStyle}
                        onEachFeature={this.onEachFeature.bind(this)} />
                    })
          : null}
      </div>
    );
  }
}

export const GeoJSONLayer = withApollo(graphql(GEOJSON_LOCAL_QUERY, {
  name: 'GeoJSONData'
})(GeoJSONComp));

