import {CityNameMandatory, LocationMandatory, SuggestionEngine} from '../models/suggestionEngine/suggestionEngine.interface';


export interface PlaylistServiceParams {
  engineParams: CityNameMandatory | LocationMandatory;
}


export class PlaylistService {
  private _suggestionEngine: SuggestionEngine;

  constructor(suggestionEngine: SuggestionEngine) {
    this._suggestionEngine = suggestionEngine;
  }

  suggestPlayList(options: PlaylistServiceParams) {
   return this._suggestionEngine.suggestPlaylist(options.engineParams);
  }

}