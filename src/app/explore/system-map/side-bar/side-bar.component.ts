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

    jobID : string;

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
        
            case 'Project':
                this.getProject();

            case 'Institution':
                this.getInstitution();

            case 'Job':
                this.getJob();
            
            default:
                break;
        }
    }

    getFos()
    {
        const params = 
        {
            system : this.system,
            value  : this.valueSelected
        };

        this.exploreService.postSysMapFos( params )
            .subscribe( ( response : any ) =>
            {
                this.searching = false;

                this.threeEngineService.renderHeatmap( response );
            });

    }

    getProject()
    {

        const params = 
        {
            system : this.system,
            value : this.valueSelected
        };

        this.exploreService.postSysMapProj( params )
            .subscribe( ( response : any ) =>
            {
                this.searching = false;

                this.threeEngineService.renderHeatmap( response );
            });

    }

    getInstitution()
    {
        const params = 
        {
            system : this.system,
            value : this.valueSelected
        };

        this.exploreService.postSysMapInst( params )
            .subscribe( ( response : any ) =>
            {
                this.searching = false;

                this.threeEngineService.renderHeatmap( response );
            });
    }

    getJob()
    {
        const params = 
        {
            system : this.system,
            value : this.jobID
        };


        this.exploreService.postSysMapJob( params )
            .subscribe( ( response : any ) =>
            {
                this.searching = false;

                this.threeEngineService.renderHeatmap( response );
            });
    }
    
}
