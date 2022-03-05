
import SpotifyWebApi from 'spotify-web-api-node';

export interface SpotifyServiceParams {
  clientId: string;
  clientSecret: string;
}


export class SpotifyService {
  private _spotifyApi: SpotifyWebApi | null = null;

  constructor() {
    return this;
  }

  getSpotifyInstance() {
    return this._spotifyApi as SpotifyWebApi;
  }


  async instantiateSpotifyWebApi(options: SpotifyServiceParams) {
    this._spotifyApi = new SpotifyWebApi({
      ...options
    });
    const response = await this._spotifyApi.clientCredentialsGrant();
    this._spotifyApi.setAccessToken(response.body.access_token);
    return this;
  }
}