export class Location {

  private _latitude: number;
  private _longitude: number;


  constructor(latitude: number, longitude: number) {
    this.validateLocation(latitude, longitude);
    this._latitude = latitude;
    this._longitude = longitude;
  }


  private validateLocation(lat: number, long: number) {
    return true;
  }

}