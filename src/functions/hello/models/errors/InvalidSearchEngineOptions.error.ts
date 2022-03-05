export class InvalidSuggestionEngineParams extends Error {


  constructor() {
    const _errorMessage = 'Given parameters for SuggestionEngine is invalid';
    super(_errorMessage);
    Object.setPrototypeOf(this, InvalidSuggestionEngineParams.prototype);
  }
}