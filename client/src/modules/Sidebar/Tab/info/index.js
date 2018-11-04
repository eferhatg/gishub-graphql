import React, {Component} from 'react';
import * as _l from 'lodash/lang'
import * as _c from 'lodash/collection'
import t from 'tcomb-form';
import {Query} from "react-apollo";
import {GET_SELECTED_FUTURE, GET_SELECTED_LAYER_BRIEF} from '../../../../graphql'

const Form = t.form.Form;

export class InfoTab extends Component
{

  onSubmit(evt) {
    const value = this
      .refs
      .form
      .getValue();
    if (!value) {
      // there are errors, don't send the form
      evt.preventDefault();
    } else {
      // everything ok, let the form fly... ...or handle the values contained in the
      // `value` variable with js
    }
  }

  render() {

    const self = this;

    return (

      <Query query={GET_SELECTED_FUTURE} fetchPolicy="cache-only">
        {({data, client}) => {
          return ((_l.isEmpty(data) || _l.isUndefined(data))
            ? null
            : this.getform(data.selectedFeature.feature))

        }}
      </Query>

    )
  }

  getform(feature) {

    const defvals = {
      value: {
        name: 'Giulio',
        surname: 'Canti'
      }
    }
    return <Query query={GET_SELECTED_LAYER_BRIEF} fetchPolicy="cache-only" variables={{
      ids: [feature.layerId]
    }}>
      {({data, client}) => {

        return ((_l.isEmpty(data) || _l.isUndefined(data))
          ? null
          : <form >
            <Form
              ref="form"
              type={this.generateSchema(data.getLayersById[0].brief)}
              value={feature.properties}/>

            <button type="submit">Save</button>
          </form>)
      }}
    </Query>
  }

  generateSchema(brief) {

    var fields = {};
    brief.forEach((obj) => {
      switch (obj.type) {
        case "text":
          fields[obj.col] = t.Str;
          break;

        default:
          break;
      }
    })
    return t.struct(fields);

  }

}