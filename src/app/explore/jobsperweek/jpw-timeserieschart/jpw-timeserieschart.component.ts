import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ResponseData } from 'src/app/models/explore/jpw/responseData';
import { GraphData } from 'src/app/models/explore/jpw/graphData';
import { JpwTsdata } from 'src/app/models/explore/jpw/jpw-tsdata';
import { ColorService } from 'src/app/color.service';

@Component({
    selector: 'app-jpw-timeserieschart',
    templateUrl: './jpw-timeserieschart.component.html',
    styleUrls: ['./jpw-timeserieschart.component.scss']
})
export class JpwTimeserieschartComponent implements OnInit {

    @Input() data : ResponseData;

    graphData : GraphData[];

    layout = 
    {
        title : 'Jobs per Week by Field of Science'
    };

    constructor(private colorService : ColorService) { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void 
    {

        if( changes.data )
        {
            if(changes.data.firstChange )
            {
                return;
            }

            let newData : GraphData[] = [];

            let sorted_data = this.colorService.sortFos( changes.data.currentValue ).reverse();

            for (const datum of sorted_data ) 
            {
                
                let xValues = datum.data.map( ( a : JpwTsdata ) => a.weekStart );
                let yValues = datum.data.map( ( a : JpwTsdata ) => a.jobs );

                let t_graphData = {
                    name : this.colorService.getTitleCase( datum.fos ),
                    x : xValues,
                    y : yValues,
                    stackgroup : 'one',
                    line : {
                        color : this.colorService.getColorName( datum.fos )
                    }
                };

                newData.push( t_graphData );

                this.graphData = newData;
            }
    
        }    

    }

}
