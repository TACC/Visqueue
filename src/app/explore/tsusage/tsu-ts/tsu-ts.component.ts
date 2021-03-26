import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ColorService } from 'src/app/color.service';
import { ResponseData } from 'src/app/models/explore/tsu/response-data';
import { TsuData } from 'src/app/models/explore/tsu/tsu-data';

@Component({
    selector: 'app-tsu-ts',
    templateUrl: './tsu-ts.component.html',
    styleUrls: ['./tsu-ts.component.scss']
})
export class TsuTsComponent implements OnInit {

    @Input() data : ResponseData;

    graphData : any;

    layout = 
    {
        title : ' ON/OFF History of Node',
        yaxis : 
        {
            showticklabels : false
        }
    };

    constructor(private colorService : ColorService) { }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void 
    {
        if( changes.data )
        {
            if( changes.data.firstChange )
            {
                return;
            }
            
            let data = changes.data.currentValue;

            let newData = [];

            for (const datum of data ) 
            {

                const dates = datum['data'].flatMap( ( cur : any ) => [ new Date( cur.startTime ), new Date( cur.endTime ) ] );
                const values = [].concat(...Array.from( { length : datum['data'].length }, () => [ 1, 0 ] ) );
                const text = [].concat(...Array.from( { length : datum['data'].length }, () => [ 'On', 'Off' ] ) );

                let t_graphData = 
                {

                    name : this.colorService.getTitleCase( datum.fos ),
                    type : 'scatter',
                    mode : 'lines',
                    x : dates,
                    y : values,
                    text : text,
                    hovertemplate : '%{x} <br> %{text}',
                    hoverinfo : 'text',
                    fill : 'tozeroy',
                    line : 
                    { 
                        shape : 'hv',
                        color : this.colorService.getColorName( datum.fos )
                    }                    
                };

                newData.push( t_graphData );
            }

            this.graphData = newData;


        }
    }

}
