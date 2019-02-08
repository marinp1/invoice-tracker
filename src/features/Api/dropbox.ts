import { Dropbox as DropboxAPI } from 'dropbox';

const CLIENT_ID = 'aj7dxmh2wlso1ok';
const Dropbox = new DropboxAPI({ clientId: CLIENT_ID });

const authenticate = () => {
  const CALLBACK_URL = 'https://patrikmarin.fi/placeholder-callback';
  const URL = Dropbox.getAuthenticationUrl(CALLBACK_URL);
  window.location.href = URL;
};

export default {
  authenticate,
};
