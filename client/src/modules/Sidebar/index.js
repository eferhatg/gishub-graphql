import {Sidebar, Tab} from './sidebar';
import React, {Component} from 'react';
import {HomeTab, LayerTab, InfoTab,SearchTab} from './Tab';

import 'nprogress/nprogress.css'
import {Query} from "react-apollo";
import {GET_SELECTED_TAB} from '../../graphql';
export class SideBarModule extends Component
{
 

  render() {
    var self=this;        
        return (
          <Query query={GET_SELECTED_TAB}>
          {({ data,client}) => {
     
          return <Sidebar
            id="sidebar"
            position="right"
            collapsed={data.sidebar.collapsed}
            selected={data.sidebar.selectedTab}
            onOpen={this.onOpen.bind(this)}
            onClose={this.onClose.bind(this)}
            apoClient={client}>
             <Tab id="home" header="Anasayfa" icon="fa fa-home" disabled={false}>
              <HomeTab/>
            </Tab>
            <Tab id="search" header="Ara" icon="fa fa-search">
            <SearchTab apoClient={this.props.apoClient}/>
            </Tab>
            <Tab id="layer" header="Katmanlar" icon="fa fa-clone" disabled={false}>
            <LayerTab user={this.props.user}/>     
            </Tab>
            {/*
            <Tab id="info" header="Özellikler" icon="fa fa-info-circle">
               <InfoTab apoClient={this.props.apoClient} /> 
            </Tab> */}
            <Tab id="settings" header="Settings" icon="fa fa-cog" anchor="bottom">
            {self.props.user.email}
              <p>Settings dialogue.</p>
            </Tab>
          </Sidebar>
          }}</Query>  
        )


    }
    onClose(apoClient) {

      apoClient.writeQuery({
        query: GET_SELECTED_TAB,
        data: {
          sidebar: {
            collapsed:true,
            selectedTab: '',
            __typename:'Sidebar'
          }
        }
      });
  
    
    }
    onOpen(id,apoClient) {

      apoClient.writeQuery({
        query: GET_SELECTED_TAB,
        data: {
          sidebar: {
            collapsed:false,
            selectedTab: id,
            __typename:'Sidebar'
          }
        }
      });
    }
  }