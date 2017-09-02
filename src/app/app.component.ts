import { Component } from '@angular/core';
import { WakerService } from './waker.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WakerService]
})

export class AppComponent {
  zoom: number = 3;
  lat: number = 0;
  lng: number = 0;

  markers: Marker[] = [];

  constructor(private wakerService: WakerService) {
    wakerService.getLocs().subscribe(data => {
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

    this.markers[index].servers.forEach(server => {
      if(server.status===-1) {
        setTimeout(() => {
          self.wakerService.getStatus(server.id).subscribe(data => {
            server.status = data.json().isUp ? 1 : 0;
          });
        }, 500);
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
  status: number
}