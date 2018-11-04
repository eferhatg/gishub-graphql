import React, {Component} from 'react';
import {Map, TileLayer} from 'react-leaflet'
import {css} from 'emotion'
import {getTileUrl} from './utils'
import {withApollo} from "react-apollo";
import {GeoJSONLayer} from './Layer/GeoJSONLayer'



class MapModuleRoot extends Component {

  render() {

    const mapStyle = css `
      width: 100%; height: 100%; position:fixed; left: 0px;
      top: 0px;
    `

    return (
      <div>
        <Map
          ref="map"
          className={mapStyle}
          center={this.props.user.initialPosition}
          zoom={this.props.user.initialZoom}>

          <TileLayer attribution="" url={getTileUrl(this.props.user)}/>
          
          <GeoJSONLayer/>
        </Map>)

      </div>
    )
  }
}

export const MapModule = withApollo(MapModuleRoot)