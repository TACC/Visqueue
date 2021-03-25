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
        title : ' ON/OFF History of Node'
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

            const dates = data.flatMap( ( cur : TsuData ) => [ new Date( cur.startTime ), new Date( cur.endTime ) ] );
        
            const values = [].concat(...Array.from( { length : data.length }, () => [ 1, 0 ] ) );

            this.graphData = 
            [{
                x : dates,
                y : values,
                type : 'lines+markers',
                line : { shape : 'hv'}
            }];

        }
    }

}
