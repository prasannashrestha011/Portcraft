import { Dropbox, DropboxAuth } from "dropbox";
import fetch from "node-fetch";
export default class DropBoxClass {
  static Init(): Dropbox {
    const auth = new DropboxAuth({
      clientId: process.env.DROPBOX_APP_KEY,
      clientSecret: process.env.DROPBOX_APP_SECRET,
      accessToken: process.env.DROPBOX_ACCESS_TOKEN,
      refreshToken: process.env.DROPBOX_REFRESH_TOKEN,
      fetch: fetch,
    });
    auth.refreshAccessToken();
    const dbx = new Dropbox({
      accessToken: process.env.DROPBOX_ACCESS_TOKEN,
      auth: auth,
      fetch: fetch,
    });
    return dbx;
  }
}
