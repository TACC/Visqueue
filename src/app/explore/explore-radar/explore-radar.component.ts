import { Component, OnInit } from '@angular/core';
import { Rack } from 'src/app/models/rack';
import { ActivatedRoute } from '@angular/router';
import { Label, SingleDataSet, Color } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { ColorService } from 'src/app/color.service';
import { ExploreService } from '../explore.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-explore-radar',
    templateUrl: './explore-radar.component.html',
    styleUrls: ['./explore-radar.component.scss']
})
export class ExploreRadarComponent implements OnInit {


    // rack and node subscriptions
    rackSubscription : Subscription;
    nodeSubscription : Subscription;

    system : string;

    rack : string;
    node : string;

    // PolarArea
    polarAreaChartLabels : Label[]       = [];
    polarAreaChartData   : SingleDataSet = [];
    polarAreaChartColors : Color[]       = [ { backgroundColor : [] } ];
  
    polarAreaLegend = true;

    polarAreaChartType: ChartType = 'polarArea';

    regexpFos = /\(([^)]+)\)/;

    loading = false;

    constructor(
        private exploreService : ExploreService,
        private route          : ActivatedRoute,
        private colorService   : ColorService) 
        {
            this.rackSubscription = exploreService.rackSelected$.subscribe(
                ( rack : Rack ) =>
                {
                    this.retrieveData( rack );
                    this.rack = rack.name;
                });
        
            this.nodeSubscription = exploreService.nodeSelected$.subscribe(
                ( node : string ) =>
                {
                    this.retrieveData( node );
                    this.node = node;
                });
        }

    ngOnInit(): void 
    {
        this.system = this.route.snapshot.params['name'];
            
    }

    retrieveData( data : Rack | string )
    {

        this.loading = true; 
        
        let nodes = this.exploreService.isRack( data ) ? data.nodes : [ data ];

        let params = {
            'system' : this.system,
            'nodes'  : nodes
        };

        this.exploreService.postFos( params )
            .subscribe( ( data : any ) => this.renderData( data ) );
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
