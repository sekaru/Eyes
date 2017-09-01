import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class WakerService {
  address: string = 'http://35.156.58.36:3978';

  constructor(private http: Http) {
  }

  getLocs() {
    return this.http.get(this.address + '/server-locs');
  }
}
