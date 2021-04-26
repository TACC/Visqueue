import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExploreService } from '../../explore.service';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit 
{

    system : string;

    selectOptions : string[] = 
    [
        'Field of Science',
        'Project',
        'Institution',
        'Job'
    ];

    radioOptions : string[] = ['Jobs', 'Time'];

    fieldSelected : string;
    input : '';
    renderSelected : string;


    constructor(
        private exploreService : ExploreService,
        private route          : ActivatedRoute) { }

    ngOnInit(): void 
    { 
        this.system = this.route.snapshot.paramMap.get('name');
    }

    onRender()
    {
        console.log( "inside on render" );

        switch (this.fieldSelected) 
        {
            case 'Field of Science':
                this.getFos();
                break;
        
            default:
                break;
        }
    }

    getFos()
    {
        const params = 
        {
            system : this.system,
            field  : this.fieldSelected,
            search : this.input,
            type   : this.renderSelected
        };

        console.log( params );

        this.exploreService.postSysMapFos( params )
            .subscribe( ( response : any ) =>
            {
                console.log( response );
            });

        }
    
}
