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

  markers: marker[] = [];

  constructor(private wakerService: WakerService) {
    wakerService.getLocs().subscribe(data => {
      let locs: any[] = data.json();

      locs.forEach(loc => {
        let duplicate: marker = _.find(this.markers, {lat: loc.ll[0], lng: loc.ll[1]});
        if(duplicate) {
          duplicate.info += ', ' + loc.info;
          duplicate.label = String(+duplicate.label+1);
        } else {
          this.markers.push({lat: loc.ll[0], lng: loc.ll[1], label: '1', info: loc.info, draggable: false});
        }
      });
    });
  }

  markerClicked(label: string, index: number) {
    //console.log(`clicked the marker: ${label || index}`)

    this.zoom = this.zoom!==8 ? 8 : 3;
    this.lat = this.markers[index].lat;
    this.lng = this.markers[index].lng;
  }

  mapClicked($event: any) {
    // this.markers.push({
    //   lat: $event.coords.lat,
    //   lng: $event.coords.lng
    // });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    //console.log('dragEnd', m, $event);
  }
}

interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
  info?: string;
}
