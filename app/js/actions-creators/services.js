import config from 'js/config';
// import config from 'js/config';

const config = {
  FEDERATION_DOMAIN: 'dex-backend.herokuapp.com',
};

export const getStellarAddress = username => `${username}*${config.FEDERATION_DOMAIN}`;
