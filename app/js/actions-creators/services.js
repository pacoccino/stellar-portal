import config from 'js/config';

export const getStellarAddress = username => `${username}*${config.FEDERATION_DOMAIN}`;
