import React, { PropTypes } from 'react';
import Stellar from 'stellar-sdk';
import { Popup, Button } from 'semantic-ui-react';
import Clipboard from 'clipboard';

const getIssuer = issuer => {
  const firstThree = issuer.slice(0, 3);
  const lastThree = issuer.slice(-3);
  return `${firstThree}...${lastThree}`;
};

const style = { display: 'inline' };
class Asset extends React.Component {
  componentDidMount() {
    new Clipboard(".asset-address-copy")
  }

  render() {
    const { asset, asset_type, asset_code, asset_issuer} = this.props;
    if(!asset && !asset_type) {
      return null;
    }
    let objAsset = asset;
    if(!objAsset) {
      if(asset_type === 'native') {
        objAsset = Stellar.Asset.native();
      }
      else {
        objAsset = new Stellar.Asset(asset_code, asset_issuer);
      }
    }
    if(objAsset.isNative()) {
      return <div style={style}>XLM</div>;
    }

    return (
      <Popup
        hoverable
        trigger={
          <div style={style}>
            <span style={styles.asset_code}>{objAsset.getCode()}</span>
            <span style={styles.asset_issuer}>({Asset.getIssuerText(objAsset.getIssuer())})</span>
          </div>
        }
      >
        <Popup.Header>
          <p>{objAsset.getCode()}</p>
          <p>{objAsset.getIssuer()}</p>
        </Popup.Header>
        <Popup.Content>
          <Button
            className="asset-address-copy"
            circular
            basic
            color="blue"
            compact
            icon="clipboard"
            content="Copy issuer address"
            data-clipboard-text={objAsset.getIssuer()}
          />
        </Popup.Content>
      </Popup>
    );
  }
}

Asset.getIssuerText = issuer => {
  const firstThree = issuer.slice(0, 3);
  const lastThree = issuer.slice(-3);
  return `${firstThree}...${lastThree}`;
};

Asset.getAssetString = (asset) => (
  asset.isNative() ? 'XLM' :
    `${asset.getCode()} (${Asset.getIssuerText(asset.getIssuer())})`
);

const styles = {
  asset_issuer: {
    color: 'grey',
    padding: '0 0.5rem',
  },
  asset_code: {
    fontWeight: 500,
  }
};

Asset.propTypes = {
  asset: PropTypes.object,
  asset_type: PropTypes.string,
  asset_code: PropTypes.string,
  asset_issuer: PropTypes.string,
};

export default Asset;
