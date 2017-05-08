// import config from 'js/config';

const config = {
  FEDERATION_DOMAIN: 'api-test.willet.io',
};

export const getStellarAddress = username => `${username}*${config.FEDERATION_DOMAIN}`;
