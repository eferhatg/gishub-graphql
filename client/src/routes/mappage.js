import React, {Component} from 'react';
import {MapModule} from '../modules/Map'

import {SideBarModule} from '../modules/Sidebar'

import { withApollo, graphql} from "react-apollo";
import {USER_DATA} from '../graphql';



class MapPageModule extends Component {

  render() {
    return (
      this.props.UserData.user?
      <div>
        <SideBarModule user={this.props.UserData.user}/>
        <MapModule user={this.props.UserData.user}/>
      </div>:null
    )

  }
}

const MapPageWithQueries = graphql(USER_DATA, {
  name: 'UserData',
  options: {
    variables: {
      sessionToken: "qweasd"
    }
  }
})(MapPageModule);

export const MapPage = withApollo(MapPageWithQueries)