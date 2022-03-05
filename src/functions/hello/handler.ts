import 'source-map-support/register';

import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import OpenWeatherMap from 'openweathermap-ts';
import { SpotifyService } from './services/SpotifyService.class';
import { TemparatureBasedSuggestionEngine } from './models/suggestionEngine/types/TemperatureBasedSuggestionEngine.class';
import {
  PlaylistService,
  PlaylistServiceParams
} from './services/playlistService.class';

const hello: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  try {
    const openWeather = new OpenWeatherMap({
      apiKey: process.env.OpenWeatherMap_API_KEY
    });
    const spotifyService = await new SpotifyService().instantiateSpotifyWebApi({
      clientId: process.env.Spotify_CLIENT_ID,
      clientSecret: process.env.Spotify_SECRET
    });

    const engine = new TemparatureBasedSuggestionEngine(
      openWeather,
      spotifyService.getSpotifyInstance()
    );
    const service = new PlaylistService(engine);

    const params = event.queryStringParameters;
    const location = {
      latitude: +params.latitude,
      longitude: +params.longitude
    };
    const options: PlaylistServiceParams = {
      engineParams: { cityName: params.cityName, location }
    };
    const playlistSuggested = await service.suggestPlayList(options);
    return formatJSONResponse({
      list: `${playlistSuggested.join(', ')}`
    });
  } catch (error) {
    return formatJSONResponse(
      {
        message:
          'Invalid / no Parameters provided. Kindly provided atleast a proper city name or a proper location(latitude and longitude) '
      },
      422
    );
  }
};

export const main = middyfy(hello);
