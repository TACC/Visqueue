import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ThreeEngineService } from './three-engine.service';


@Component({
    selector: 'app-system-map',
    templateUrl: './system-map.component.html',
    styleUrls: ['./system-map.component.scss'],
    providers : [ ThreeEngineService ]
})
export class SystemMapComponent implements OnInit 
{

    @ViewChild('rendererCanvas', {static: true})
    public rendererCanvas: ElementRef<HTMLCanvasElement>;

    constructor(private threeEngineService : ThreeEngineService) { }

    ngOnInit(): void 
    {
    }
    
    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        this.threeEngineService.createScene(this.rendererCanvas);
        this.threeEngineService.animate();
        
    }

}
