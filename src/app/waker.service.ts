import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class WakerService {
  public address: string = 'http://35.156.58.36:3978';

  constructor(private http: Http) {}

  init() {
    return this.http.get('http://sleepystudios.net/waker.txt');
  }

  getLocs() {
    return this.http.get(this.address + '/server-locs');
  }

  getStatus(id: string) {
    return this.http.get(this.address + '/server-status?id=' + id);
  }
}
