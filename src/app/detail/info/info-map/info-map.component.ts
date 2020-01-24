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
        }).bindPopup(inst.name + '<br> Projects : ' + inst.proj_total + '<br> Nodes : ' + inst.nodes_total + '<br> Jobs : ' + inst.jobs_total );

        this.layers.push(tLayer);

    });



  }

}
