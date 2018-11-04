import React, {Component} from 'react';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import * as _c from 'lodash/collection'

import PropTypes from 'prop-types';
import {GET_LAYERS_BY_ID, GEOJSON_LOCAL_QUERY, GET_DISPLAYED_LAYERS, CATS_AND_BRIEF} from '../../../../graphql'
import {withApollo, graphql} from "react-apollo";
import {UnflattenCatsAndBrief, LayersToGeojsonArray} from "./utils";
import {LayerTree} from './LayerTree';

class LayerTabComp extends Component {
  constructor(props) {
    super(props);

    this.state = {

      loading: false

    };
  }

  getLayers = async(apoClient, layerIds) => {
this.setState({loading:true});
    NProgress.start();

    const {data} = await apoClient.query({
      query: GET_LAYERS_BY_ID,
      variables: {
        ids: layerIds
      }
    });
  

    apoClient.writeQuery({
      query: GET_DISPLAYED_LAYERS,
      data: {
        displayedLayers: {
          ids: layerIds,
          __typename: "DisplayedLayers"
        }
      }
    });

    apoClient.writeQuery({
      query: GEOJSON_LOCAL_QUERY,
      data: {
        geojson: LayersToGeojsonArray(data)
      }
    });

    NProgress.done();
    this.setState({loading:false});
  }

  onNodeCheck = (checkedKeys) => {

    const checkedLayerIds = _c.filter(checkedKeys, (k) => {
      return k.includes('_');
    })

    var lIds = [];
    checkedLayerIds.forEach((lId) => {
      lIds.push(parseInt(lId.split('_')[0], 10));
    })
    this.getLayers(this.props.client, lIds);
    this.setState({checkedKeys});

  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.CatsAndBrief.catsAndBrief
      ? true
      : false;
  }

  render() {

    return (
      <div>{< LayerTree
        nodes = {
          UnflattenCatsAndBrief(this.props.CatsAndBrief.catsAndBrief)
        }
        onNodeCheck = {
          this.onNodeCheck
        }
        loading = {
          this.state.loading
        }
        />
}
      </div>
    );
  }

}

LayerTabComp.propTypes = {
  user: PropTypes.object
}

const LayerTabWithQueries = graphql(CATS_AND_BRIEF, {
  name: 'CatsAndBrief',
  skip: (props) => !props.user,
  options: (props) => ({
    variables: {
      clientId: props.user.client.id
    }
  })
})(LayerTabComp);

export const LayerTab = withApollo(LayerTabWithQueries)
