import {
  CityNameMandatory,
  LocationMandatory,
  SuggestionEngine
} from '../suggestionEngine.interface';
import { InvalidSuggestionEngineParams } from '../../errors/InvalidSearchEngineOptions.error';
import OpenWeatherMap from 'openweathermap-ts';
import SpotifyWebApi from 'spotify-web-api-node';
import { GENRE } from './constant.enums';

export class TemparatureBasedSuggestionEngine implements SuggestionEngine {
  private _openWeather: OpenWeatherMap;
  private _spotifyWebApi: SpotifyWebApi;

  constructor(openWeather: OpenWeatherMap, SpotifyWebApi: SpotifyWebApi) {
    this._openWeather = openWeather;
    this._spotifyWebApi = SpotifyWebApi;
  }

  suggestPlaylist(options: CityNameMandatory | LocationMandatory) {
    console.log('options ', options);
    if (this.hasCityName(options)) {
      return this.suggestPlaylistByCityName(options.cityName);
    }


    if (this.hasLocation(options)) {
      return this.suggestPlaylistByLocation(options);
    }

    throw new InvalidSuggestionEngineParams();
  }

  private async suggestPlaylistByCityName(cityName: string) {
    const cityTemperature = await this.getTemperatureByCityName(cityName);
    if (cityTemperature === null) return [];
    return this.suggestPlaylistByTemperature(cityTemperature);
  }

  private async suggestPlaylistByLocation(locations: LocationMandatory) {
    const cityTemperature = await this.getTemperatureByLocation(locations);
    if (cityTemperature === null) return [];
    return this.suggestPlaylistByTemperature(cityTemperature);
  }

  private async suggestPlaylistByTemperature(temperature: number) {
    if (temperature === null) return [];
    if (temperature > 30) {
      return this.getSongsByGenre(GENRE.PARTY);
    }
    if (temperature < 30 && temperature > 15) {
      return this.getSongsByGenre(GENRE.POP);
    }

    if (temperature > 10 && temperature < 15) {
      return this.getSongsByGenre(GENRE.ROCK);
    }

    return this.getSongsByGenre(GENRE.CLASSICAL);
  }

  private async getSongsByGenre(genre: GENRE) {
    const response = await this._spotifyWebApi.getPlaylistsForCategory(genre, {
      country: 'IN'
    });
    const playlistId = this.getPlaylistIdFromPlaylistURI(
      response.body.playlists.items[0].uri
    );
    const tracks = await this._spotifyWebApi.getPlaylistTracks(playlistId);
    return tracks.body.items.map((item) => item.track.name);
  }

  private getPlaylistIdFromPlaylistURI(playlistURI: string) {
    return playlistURI.split(':').pop() as string;
  }

  private async getTemperatureByCityName(cityName: string) {
    try {
      const response = await this._openWeather.getCurrentWeatherByCityName({
        cityName
      });
      return response.main.temp;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  private async getTemperatureByLocation(options: LocationMandatory) {
    const { latitude, longitude } = options.location;
    try {
      const response =
        await this._openWeather.getCurrentWeatherByGeoCoordinates(
          latitude,
          longitude
        );
      return response.main.temp;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private hasCityName(options: any): options is CityNameMandatory {
    return !!options.cityName;
  }

  private hasLocation(options: any): options is LocationMandatory {
    return options.location.latitude && options.location.longitude;
  }
}
