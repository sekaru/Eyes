import { Component, OnInit } from '@angular/core';
import { WakerService } from './waker.service';
import * as _ from 'lodash';
import { differenceInSeconds } from 'date-fns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WakerService]
})

export class AppComponent implements OnInit {
  zoom: number = 3;
  lat: number = 0;
  lng: number = 0;

  markers: Marker[] = [];

  constructor(private wakerService: WakerService) {}

  ngOnInit() {
    this.wakerService.init().subscribe(data => {
      this.wakerService.address = data.text();
      this.getLocs();      
    }, 
    err => {
      this.getLocs();      
    });
  }

  getLocs() {
    this.wakerService.getLocs().subscribe(data => {
      let locs: any[] = data.json();

      locs.forEach(loc => {
        let duplicate: Marker = _.find(this.markers, { lat: loc.ll[0], lng: loc.ll[1] });
        if (duplicate) {
          duplicate.servers.push({ name: loc.info.name, id: loc.info.id, status: -1 });
          duplicate.label = String(+duplicate.label + 1);
        } else {
          this.markers.push({ lat: loc.ll[0], lng: loc.ll[1], label: '1', servers: [{ name: loc.info.name, id: loc.info.id, status: -1 }], draggable: false });
        }
      });
    });
  }

  markerClicked(label: string, index: number) {
    let self = this;
    let checkInterval = 30;

    this.markers[index].servers.forEach(server => {
      if(!server.lastCheck || differenceInSeconds(new Date(), server.lastCheck)>=checkInterval) {
        server.status = -1;

        setTimeout(() => {
          self.wakerService.getStatus(server.id).subscribe(data => {
            server.status = data.json().isUp ? 1 : 0;
          });
        }, 500);

        server.lastCheck = new Date();
      }
    });
  }

  getEmoji(status: number): string {
    switch (status) {
      case -1:
        return '🤔';
      case 0:
        return '😞';
      case 1:
        return '😃';
    }
  }
}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
  servers: Server[];
}

interface Server {
  name: string,
  id: string,
  status: number,
  lastCheck?: Date
}