import {Playlist} from '../playlist.interface';
import { Location } from '../location/location.interface';


export interface CityNameMandatory  { cityName: string };

export interface LocationMandatory {
  location: Location;
}



export interface SuggestionEngine {
  suggestPlaylist: (
    options: CityNameMandatory | LocationMandatory
  ) => Promise<Playlist[]>;
}