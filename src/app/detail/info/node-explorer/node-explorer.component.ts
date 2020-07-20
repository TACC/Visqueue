import { Component, OnInit } from '@angular/core';
import { InfoService } from '../info.service';
import { ActivatedRoute } from '@angular/router';
import { Racks } from 'src/app/models/racks';

@Component({
    selector: 'app-node-explorer',
    templateUrl: './node-explorer.component.html',
    styleUrls: ['./node-explorer.component.scss']
})
export class NodeExplorerComponent implements OnInit {

    racks : Racks[];

    constructor(
        private infoService: InfoService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {

        let system = this.route.snapshot.params['name'];

        this.infoService.getNodes(system)
            .subscribe((data: [ Racks ] ) => 
            {
                console.log( data );
                this.racks = data;
            });

    }

}
