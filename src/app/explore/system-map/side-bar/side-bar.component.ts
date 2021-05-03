import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExploreService } from '../../explore.service';
import { ThreeEngineService } from '../three-engine.service';
import { SelectOptions } from 'src/app/models/explore/sysmap/select-options';
import { Option } from 'src/app/models/explore/sysmap/option';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit 
{

    system : string;

    mainOptions : string[] = 
    [
        'Field of Science',
        'Project',
        'Institution',
        'Job'
    ];
    fieldSelected : string;


    fosOptions  : Option[];
    instOptions : Option[];
    projOptions : Option[];

    valueSelected : string;


    radioOptions : string[] = ['Jobs', 'Time'];

    renderSelected : string;

    searching = false;


    constructor(
        private exploreService : ExploreService,
        private route          : ActivatedRoute,
        private threeEngineService : ThreeEngineService) { }

    ngOnInit(): void 
    { 
        this.system = this.route.snapshot.paramMap.get('name');

        this.exploreService.postSysMapSide( {"system" : this.system } )
            .subscribe( ( data : SelectOptions ) =>
            {
                this.fosOptions = data.fos;
                this.instOptions = data.inst;
                this.projOptions = data.proj;
            });
    }

    onRender()
    {

        this.searching = true;

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
        // const params = 
        // {
        //     system : this.system,
        //     field  : this.fieldSelected,
        //     search : this.input,
        //     type   : this.renderSelected
        // };

        // this.exploreService.postSysMapFos( params )
        //     .subscribe( ( response : any ) =>
        //     {
        //         this.searching = false;

        //         this.threeEngineService.renderHeatmap( response );
        //     });

    }
    
}
