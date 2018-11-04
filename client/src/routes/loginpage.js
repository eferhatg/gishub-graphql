import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {Query} from "react-apollo";
import * as _l from 'lodash/lang'
import {USER_DATA} from '../graphql';


export class LoginPage extends Component {

  render() {
    return (
     <Query query={USER_DATA} variables={{sessionToken:"qweasd"}}>
       {({loading, data, client}) => {
             if(!data||_l.isEmpty(data)) return null;
    return   <Redirect to = {{pathname: "/map"}}/>
       }}
     </Query>
  )

  }
}