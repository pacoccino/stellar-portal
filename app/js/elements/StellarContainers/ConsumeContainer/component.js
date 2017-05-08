import React, { PropTypes } from 'react';
import { Icon, Grid, Loader, Segment, Form, Button, Header, Table } from 'semantic-ui-react';
import { StellarTools, StellarStats } from 'stellar-toolkit';
import { Field, propTypes } from 'redux-form';
import { find } from 'lodash';

import Asset from '../../../components/stellar/Asset';
import Amount from '../../../components/stellar/Amount';
import DropdownFormField from '../../UiTools/SemanticForm/Dropdown';
import InputFormField from '../../UiTools/SemanticForm/Input';

const { AssetInstance, AssetUid, STROOP } = StellarTools;

class ConsumeContainer extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  getSellingAsset() {
    if(this.props.tradeType === 'sell') {
      return this.props.tradeAsset;
    } else {
      return AssetInstance({asset_type: 'native'});
    }
  }
  getBuyingAsset() {
    if(this.props.tradeType === 'buy') {
      return this.props.tradeAsset;
    } else {
      return AssetInstance({asset_type: 'native'});
    }
  }

  onChangeToAmount(e, newValue) {
    const sourceAsset = this.getSellingAsset();
    const destinationAsset = this.getBuyingAsset();

    const account_id = this.props.keypair.publicKey();

    StellarStats.getExchangeRateFromAutoPath({
      account_id,
      sourceAsset,
      destinationAsset,
      destinationAmount: newValue,
    }).then(r => this.props.change('sendMax', r.sendMax * 1.3));
  }

  getOfferForm() {
    if(this.props.submitting) {
      return (
        <Loader active inline='centered'>
          Creating offer ...
        </Loader>
      );
    }
    if(this.props.submitSucceeded) {
      return (
        <Segment color="green">
          Offer successfully created !
        </Segment>
      );
    }

    return (
      <div>
        <Form.Field>
          <label>Please set the amount of {this.props.tradeAsset.getCode()} you want to {this.props.tradeType}:</label>
          <Field
            component={InputFormField}
            onChange={::this.onChangeToAmount}
            name="destinationAmount"
            type="number"
            min={0}
            step={STROOP}
            placeholder="0"
            required
          />
        </Form.Field>
        <Segment>
          <Icon name="arrow right" /> {this.props.values && this.props.values.sendMax} XLM.
        </Segment>
        <Form.Button
          type="submit"
          primary
          content="Buy asset"
          onClick={::this.props.handleSubmit}
          icon="shop"
        />
      </div>
    );
  }

  render() {
    const title = this.props.tradeType === 'buy' ? 'Buy' : 'Sell';
    return (
      <div>
        <Header as="h2">Consume assets</Header>
        {this.props.canSign ?
          <div>
            {this.getOfferForm()}
          </div>
          : null
        }
      </div>
    );
  }
}

ConsumeContainer.propTypes = {
  keypair: PropTypes.object,
  trustlines: PropTypes.array,
  offers: PropTypes.array,
  deleteOffer: PropTypes.func.isRequired,
  canSign: PropTypes.bool,
  sendingOffer: PropTypes.bool,
  ...propTypes,
};

export default ConsumeContainer;
