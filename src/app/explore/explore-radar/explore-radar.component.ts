import { Component, OnInit } from '@angular/core';
import { ExploreService } from '../explore.service';
import { Rack } from 'src/app/models/rack';
import { ActivatedRoute } from '@angular/router';
import { Label, SingleDataSet, Color } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
    selector: 'app-explore-radar',
    templateUrl: './explore-radar.component.html',
    styleUrls: ['./explore-radar.component.scss']
})
export class ExploreRadarComponent implements OnInit {

    system : string;

    racks : Rack[];
    nodes : string[];

    selectedRack : Rack;
    selectedNode : string;

    // PolarArea
    polarAreaChartLabels : Label[]       = [];
    polarAreaChartData   : SingleDataSet = [];
    polarAreaChartColors : Color[]       = [];
  
    polarAreaLegend = true;

    polarAreaChartType: ChartType = 'polarArea';

    constructor(
        private exploreService : ExploreService,
        private route          : ActivatedRoute) { }

    ngOnInit(): void 
    {
        this.system = this.route.snapshot.params['name'];

        this.exploreService.getNodes( this.system )
            .subscribe( ( data : [ Rack ] ) =>
            {
                this.racks = data;
            });
            
    }

    selectRack( event : any )
    {
        this.selectedRack = event.value;
        this.nodes        = event.value.nodes;

        let params = {
            'system' : this.system,
            'type'   : 'rack',
            'nodes'  : this.selectedRack.nodes
        };

        this.exploreService.postFos( params )
            .subscribe( ( data : any ) =>
            {
                console.log( data );

                let fos  = data.map( t => t.fos );
                let vals = data.map( t=> t.jobs );

                this.polarAreaChartLabels = fos;
                this.polarAreaChartData = vals;
            });
    }

    selectNode( event : any )
    {
        this.selectedNode = event.value;
    }
}
