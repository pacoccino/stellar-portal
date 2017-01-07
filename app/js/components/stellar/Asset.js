import React, { PropTypes } from 'react';

const getAssetType = (type) => {
  switch(type) {
    case 'native':
      return "XLM";
    case 'credit_alphanum4':
      return 'Alphanum 4';
    case 'credit_alphanum12':
      return 'Alphanum 12';
  }
};

const Asset = ({ asset_type, asset_issuer, asset_code }) => (
  <div><b>Type:</b> {getAssetType(asset_type)}
    <br />
    {asset_type !== 'native' ?
      <div>
        <b>Code:</b> {asset_code}
        <br />
        <b>Issuer:</b> {asset_issuer}
      </div>
      : null
    }
  </div>
);

Asset.propTypes = {
  asset_type: PropTypes.string.isRequired,
  asset_code: PropTypes.string,
  asset_issuer: PropTypes.string,
};

export default Asset;
