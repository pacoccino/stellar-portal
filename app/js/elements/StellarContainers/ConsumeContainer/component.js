import React, { PropTypes } from 'react';
import { Grid, Loader, Segment, Form, Button, Header, Table } from 'semantic-ui-react';
import { StellarTools, StellarStats } from 'stellar-toolkit';
import { Field, propTypes } from 'redux-form';
import { find } from 'lodash';

import Asset from '../../../components/stellar/Asset';
import Amount from '../../../components/stellar/Amount';
import DropdownFormField from '../../UiTools/SemanticForm/Dropdown';
import InputFormField from '../../UiTools/SemanticForm/Input';

const { AssetUid, STROOP } = StellarTools;

class ConsumeContainer extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  getAssetOptions(assets) {
    return assets.map((asset, index) => (
      {
        value: AssetUid(asset),
        text: Asset.getAssetString(asset),
      }));
  }
  getSellAssetsOptions(assets) {
    let assetsOptions = this.getAssetOptions(assets);
    if(this.props.values && this.props.values.buy_asset) {
      assetsOptions = assetsOptions.filter(t => !this.props.values.buy_asset || t.value !== this.props.values.buy_asset);
    }
    return assetsOptions;
  }
  getBuyAssetsOptions(assets) {
    let assetsOptions = this.getAssetOptions(assets);
    if(this.props.values && this.props.values.sell_asset) {
      assetsOptions = assetsOptions.filter(t => !this.props.values.sell_asset || t.value !== this.props.values.sell_asset);
    }
    return assetsOptions;
  }

  onChangeToAmount(e, newValue) {

    if(!newValue || !this.props.values.sell_asset || !this.props.values.buy_asset) {
      this.props.change('sendMax', 0);
      return;
    }

    const sourceAsset = find(this.props.trustlines, t => (AssetUid(t) === this.props.values.sell_asset));
    const destinationAsset = find(this.props.trustlines, t => (AssetUid(t) === this.props.values.buy_asset));

    const account_id = this.props.keypair.publicKey();

    StellarStats.getExchangeRateFromAutoPath({
      account_id,
      sourceAsset,
      destinationAsset,
      destinationAmount: newValue,
    }).then(r => this.props.change('sendMax', r.sendMax));
  }

  renderEstimate() {
    if(this.props.values && this.props.values.sendMax && this.props.values.sell_asset && this.props.values.buy_asset) {
      const sourceAsset = find(this.props.trustlines, t => (AssetUid(t) === this.props.values.sell_asset));
      const destinationAsset = find(this.props.trustlines, t => (AssetUid(t) === this.props.values.buy_asset));

      return (
        <Segment>
          You will buy {this.props.values.destinationAmount} {destinationAsset.getCode()} for {this.props.values.sendMax} {sourceAsset.getCode()}
        </Segment>
      );
    }
    else {
      return null;
    }
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
        <Grid columns={3}>
          <Grid.Row>
            <Grid.Column>
              <Form.Field>
                <label>Buy</label>
                <Field
                  component={DropdownFormField}
                  name="buy_asset"
                  placeholder="Asset to buy"
                  options={this.getBuyAssetsOptions(this.props.trustlines)}
                  fluid
                  required
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label>With</label>
                <Field
                  component={DropdownFormField}
                  name="sell_asset"
                  placeholder="Asset to buy with"
                  options={this.getSellAssetsOptions(this.props.trustlines)}
                  fluid
                  required
                />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form.Field>
                <label>Amount</label>
                <Field
                  component={InputFormField}
                  onChange={::this.onChangeToAmount}
                  name="destinationAmount"
                  type="number"
                  min={0}
                  step={STROOP}
                  placeholder="0"
                  fluid
                  required
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Button
                type="submit"
                primary
                content="Buy asset"
                onClick={::this.props.handleSubmit}
                icon="book"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {this.renderEstimate()}
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header as="h2">Consume offers</Header>
        {this.props.canSign ?
          <div>
            <Header as="h3">Buy assets</Header>
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
