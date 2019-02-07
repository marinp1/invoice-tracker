import { Dropbox as DropboxAPI } from 'dropbox';

const CLIENT_ID = 'aj7dxmh2wlso1ok';
const Dropbox = new DropboxAPI({ clientId: CLIENT_ID });

const authenticate = () => {
  const URL = Dropbox.getAuthenticationUrl(window.location.href);
  console.log(URL);
};

export default {
  authenticate,
};
