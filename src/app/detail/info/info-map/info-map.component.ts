import {
    Component,
    OnInit,
    Input,
    SimpleChanges,
    OnChanges
} from '@angular/core';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
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
    styleUrls: ['./info-map.component.scss'],
    imports : [LeafletModule]
})
export class InfoMapComponent implements OnInit, OnChanges {

    options = {
        layers: [
            tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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

    ngOnChanges(changes: SimpleChanges): void 
    {

        if (!this.mapData) 
        {
            return;
        }

        let mapDataFilt = this.mapData.filter( ( inst ) => 
        {
            if( !inst.hasOwnProperty('lat') || ( inst['lat'] === null ) )
            {
                return false;
            }

            return true;
        });


        this.mapData = mapDataFilt;

        this.mapData.forEach((inst: any) => 
        {

            const tLayer = marker([inst.lat, inst.lon], 
            {
                icon: icon({
                    iconSize: [25, 41],
                    iconAnchor: [13, 41],
                    iconUrl: 'leaflet/marker-icon.png',
                    shadowUrl: 'leaflet/marker-shadow.png'
                })
            }).bindPopup(inst.name
                + '<br> Projects : ' + parseInt(inst.proj_total).toLocaleString()
                + '<br> Nodes : ' + parseInt(inst.node_total).toLocaleString()
                + '<br> Jobs : ' + parseInt(inst.job_total).toLocaleString());

            this.layers.push(tLayer);

        });



    }

}
