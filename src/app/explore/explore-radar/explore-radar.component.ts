import { Component, OnInit } from '@angular/core';
import { Rack } from 'src/app/models/rack';
import { ActivatedRoute } from '@angular/router';
import { Label, SingleDataSet, Color } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { ColorService } from 'src/app/color.service';

@Component({
    selector: 'app-explore-radar',
    templateUrl: './explore-radar.component.html',
    styleUrls: ['./explore-radar.component.scss']
})
export class ExploreRadarComponent implements OnInit {

    system : string;

    // PolarArea
    polarAreaChartLabels : Label[]       = [];
    polarAreaChartData   : SingleDataSet = [];
    polarAreaChartColors : Color[]       = [ { backgroundColor : [] } ];
  
    polarAreaLegend = true;

    polarAreaChartType: ChartType = 'polarArea';

    regexpFos = /\(([^)]+)\)/;

    loading = false;

    constructor(
        private route          : ActivatedRoute,
        private colorService   : ColorService) { }

    ngOnInit(): void 
    {
        this.system = this.route.snapshot.params['name'];
            
    }

    // selectRack( event : any )
    // {
    //     this.selectedRack = event.value;
    //     this.nodes        = event.value.nodes;

    //     let params = {
    //         'system' : this.system,
    //         'nodes'  : this.selectedRack.nodes
    //     };

    //     this.loading = true;

    //     this.exploreService.postFos( params )
    //         .subscribe( ( data : any ) => this.renderData( data ) );

    // }

    // selectNode( event : any )
    // {
    //     this.selectedNode = event.value;

    //     let params = {
    //         'system' : this.system,
    //         'nodes'  : [ this.selectedNode ]
    //     };

    //     this.exploreService.postFos( params )
    //         .subscribe( ( data : any ) => this.renderData( data ) );

    // }

    retrieveData( data : Rack | string )
    {

        
        console.log( data );
    }

    private renderData( data : any )
    {

        let fos    : string[] = [], 
            vals   : number[] = [], 
            colors : string[] = [];

        data.forEach( d =>
        {

            fos.push( d.fos );
            vals.push( d.jobs );

            let color = this.colorService.getColorAbbrev( d.abbrev );
            
            colors.push( color );
        });


        this.polarAreaChartLabels = fos;
        this.polarAreaChartData = vals;
        this.polarAreaChartColors[0].backgroundColor = colors;

        this.loading = false;
    }
}
