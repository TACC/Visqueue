import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Rack } from 'src/app/models/rack';

@Component({
    selector: 'app-racknodeselect',
    templateUrl: './racknodeselect.component.html',
    styleUrls: ['./racknodeselect.component.scss']
})
export class RacknodeselectComponent implements OnInit {

    system : string;

    racks : Rack[];
    nodes : string[];

    @Input() rack : string;
    @Input() node : string;

    selectedRack : Rack;
    selectedNode : string;

    @Input() renderNodeSelect = true;

    @Output() rackSelected = new EventEmitter<Rack>(); 
    @Output() nodeSelected = new EventEmitter<string>();

    constructor(private route : ActivatedRoute,
        private apiService : ApiService) { }

    ngOnInit(): void 
    {
        this.system = this.route.snapshot.params['name'];

        this.apiService.getNodes( this.system )
            .subscribe( ( data : [ Rack ] ) =>
            {
                this.racks = data;
            });
    }

    selectRack( event : any )
    {
        this.selectedRack = event.value;
        this.nodes        = event.value.nodes;

        this.rackSelected.emit( this.selectedRack );
    }

    selectNode( event : any )
    {
        this.selectedNode = event.value;

        this.nodeSelected.emit( this.selectedNode );
    }

    ngOnChanges(changes: SimpleChanges): void 
    {    
        if( changes.rack && !changes.rack.firstChange )
        {
            for (const rack of this.racks) 
            {    
                if( changes.rack.currentValue == rack.name )
                {
                    this.selectedRack = rack;
                    this.nodes = rack.nodes;
                    break;
                }
            }
        }

        if( changes.node && !changes.node.firstChange )
        {
            for (const node of this.nodes) 
            {    
                if( changes.node.currentValue == node )
                {
                    this.selectedNode = node;
                    break;
                }
            }
        }

    }
}
