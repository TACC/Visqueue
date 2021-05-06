import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core';
import { ExploreService } from '../explore.service';
import { ActivatedRoute } from '@angular/router';
import { Rack } from 'src/app/models/rack';
import * as d3Scale from 'd3-scale';
import * as d3Chrom from 'd3-scale-chromatic';

@Injectable({
    providedIn: 'root'
})
export class ThreeEngineService 
{
    private system : string;

    private canvas   : HTMLCanvasElement;
    
    private renderer : THREE.WebGLRenderer;
    private camera   : THREE.PerspectiveCamera;
    private scene    : THREE.Scene;
    
    private controls : OrbitControls;

    private raycaster : THREE.Raycaster;
    private pointer   : THREE.Vector2;

    private frameId: number = null;

    colorScale : d3Scale.ScaleSequential<string>;


    public constructor(
        private ngZone: NgZone, 
        private exploreService : ExploreService,
        private route          : ActivatedRoute ) {}

    public ngOnDestroy(): void 
    {
        if (this.frameId != null) 
        {
            cancelAnimationFrame(this.frameId);
        }
    }

    public createScene(canvas: ElementRef<HTMLCanvasElement>): void 
    {
        this.system = this.route.snapshot.params['name'];

        // The first step is to get the reference of the canvas element from our HTML document
        this.canvas = canvas.nativeElement;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,    // transparent background
            antialias: true // smooth edges
        });

        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( this.canvas.offsetWidth , this.canvas.offsetHeight  );

        // create the scene
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera( 75, this.canvas.offsetWidth / this.canvas.offsetHeight , 0.1, 1000 );

        this.camera.position.x = 20;
        this.camera.position.y = 3;
        this.camera.position.z = 14;

        this.scene.add(this.camera);


        // Setup Orbit Controls
        this.controls = new OrbitControls( this.camera, this.canvas );

        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.9;

        this.controls.screenSpacePanning = false;

        this.controls.target.set( 14, -10, 0 );

        this.controls.update();

        this.raycaster = new THREE.Raycaster();

        this.pointer = new THREE.Vector2();

        this.exploreService.getNodes( this.system )
            .subscribe( ( data : [ Rack ] ) => this.renderSystem( data ) );
        
    }

    public animate(): void 
    {
        // We have to run this outside angular zones,
        // because it could trigger heavy changeDetection cycles.
        this.ngZone.runOutsideAngular(() => 
        {
            if (document.readyState !== 'loading') 
            {
                this.render();
            } 
            else 
            {
                window.addEventListener('DOMContentLoaded', () => 
                {
                    this.render();
                });
            }

            window.addEventListener('resize', () => 
            {
                this.resize();
            });
        });
    }

    public render(): void 
    {
        this.frameId = requestAnimationFrame(() => 
        {
            this.render();
        });

        this.renderer.render(this.scene, this.camera);
    }

    public resize(): void 
    {
        const width = this.canvas.offsetWidth;
        const height = this.canvas.offsetHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }

    renderSystem( data : [ Rack ] )
    {

        const loader = new THREE.TextureLoader();

        const geometry = new THREE.BoxGeometry(0.25, 0.025, 0.5);
        const material = new THREE.MeshBasicMaterial({ map : loader.load('assets/images/metal.jpg') });

        let x = 0;
        let y = 0;

        let xMult = 0.275;
        let yMult = 0.1;
        let zMult = 0.5;

        for (const rack of data ) 
        {
            let xStart = rack.col * ( xMult * 3 );
            let zStart = rack.row * ( zMult * 8  );


            for( const [ idx, node ] of rack.nodes.entries() )
            {

                const xRem = idx % 2;
                const yRem = Math.trunc( idx / 2 );
    
                let cube = new THREE.Mesh(geometry, material.clone() );
                cube.position.x = xStart + xMult * xRem;
                cube.position.y = - ( yMult * yRem );
                cube.position.z = zStart;
                cube.userData = {rack : rack.name, node : node, row : rack.row, col : rack.col };
                this.scene.add( cube );

            }

        }

        this.canvas.addEventListener( 'click', (event) => this.onMouseDown( event ) );
    }

    onMouseDown( event : MouseEvent )
    {

        const rect = this.canvas.getBoundingClientRect();
        const x    = event.clientX - rect.left;
        const y    = event.clientY - rect.top;

        this.pointer.x =   ( x / this.canvas.offsetWidth  ) * 2 - 1;
        this.pointer.y =  -( y / this.canvas.offsetHeight ) * 2 + 1; 
        
        this.raycaster.setFromCamera( this.pointer, this.camera );

        const intersections = this.raycaster.intersectObjects( this.scene.children );

        if( intersections.length > 0  )
        {
            const obj = intersections[0].object as THREE.Mesh;            
        }

    }

    renderHeatmap( data : any )
    {

        // check for race condition where data that is called here has nothing yet
        if( data.maxDuration == 0 || data.maxCount == 0 )
        {
            return;
        }

        this.colorScale = d3Scale.scaleSequential( [ 0, data.maxDuration ], d3Chrom.interpolateViridis );

        for (const node of this.scene.children) 
        {
            if( node.userData.node )
            {

                if( node.userData.node in data.data )
                {
                    const val : number = data.data[ node.userData.node ].duration;
                    const color = new THREE.Color( this.colorScale( val ) );
                    ( ( node as THREE.Mesh ).material as THREE.MeshBasicMaterial ).color.setHex( color.getHex() );
                }
                else
                {
                    ( ( node as THREE.Mesh ).material as THREE.MeshBasicMaterial ).color.setHex( 0xffffff );
    
                }    
            }
            
        }
    }
}
