import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import {
  tileLayer,
  latLng,
  Layer,
  marker,
  icon
} from 'leaflet';

@Component({
  selector: 'app-info-map',
  templateUrl: './info-map.component.html',
  styleUrls: ['./info-map.component.scss']
})
export class InfoMapComponent implements OnInit, OnChanges {

    options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...'
      })
    ],
    zoom: 5,
    center: latLng(39, -97)
    };

  layers: Layer[] = [];

  @Input() public mapData: any[];

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {

    if (!this.mapData) {
      return;
    }

    this.mapData = this.mapData.filter( ( inst ) => 
    {
        return inst.hasOwnProperty( 'lat' );

    });

    this.mapData.forEach((inst: any) => 
    {

        const tLayer = marker([inst.lat, inst.lon], {
        icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'leaflet/marker-icon.png',
            shadowUrl: 'leaflet/marker-shadow.png'
        })
        }).bindPopup(inst.name 
                        + '<br> Projects : ' + parseInt(inst.proj_total).toLocaleString() 
                        + '<br> Nodes : '    + parseInt(inst.nodes_total).toLocaleString() 
                        + '<br> Jobs : '     + parseInt(inst.jobs_total ).toLocaleString() );

        this.layers.push(tLayer);

    });



  }

}
