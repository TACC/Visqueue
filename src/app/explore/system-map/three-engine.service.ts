import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { ElementRef, Injectable, NgZone, OnDestroy } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThreeEngineService 
{

    private canvas   : HTMLCanvasElement;
    
    private renderer : THREE.WebGLRenderer;
    private camera   : THREE.PerspectiveCamera;
    private scene    : THREE.Scene;
    private light    : THREE.AmbientLight;
    
    private controls : OrbitControls;

    private cube1: THREE.Mesh;
    private cube2: THREE.Mesh;
    private cube3: THREE.Mesh;
    private cube4: THREE.Mesh;

    private frameId: number = null;

    public constructor(private ngZone: NgZone ) {}

    public ngOnDestroy(): void 
    {
        if (this.frameId != null) 
        {
            cancelAnimationFrame(this.frameId);
        }
    }

    public createScene(canvas: ElementRef<HTMLCanvasElement>): void 
    {
        const loader = new THREE.TextureLoader();

        // The first step is to get the reference of the canvas element from our HTML document
        this.canvas = canvas.nativeElement;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,    // transparent background
            antialias: true // smooth edges
        });
        this.renderer.setSize( ( window.innerWidth / 2.5 ) , ( window.innerHeight / 1.3 ) );

        // create the scene
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            75, ( window.innerWidth / 2.5 ) / ( window.innerHeight / 1.3 ) , 0.1, 1000
        );
        this.camera.position.z = 5;
        this.scene.add(this.camera);

        // Setup Orbit Controls
        this.controls = new OrbitControls( this.camera, this.canvas );

        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.9;

        this.controls.screenSpacePanning = false;

        // square 1
        const geometry = new THREE.BoxGeometry(0.25, 0.025, 0.5);
        const material = new THREE.MeshBasicMaterial({ map : loader.load('assets/images/metal.jpg') });
        
        this.cube1 = new THREE.Mesh(geometry, material);
        this.cube1.position.x = -0.275;
        this.scene.add(this.cube1);
        
        this.cube2 = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube2);
    
        this.cube3 = new THREE.Mesh(geometry, material);
        this.cube3.position.x = -0.275;
        this.cube3.position.y = -0.035;
        this.scene.add(this.cube3);
        
        this.cube4 = new THREE.Mesh(geometry, material);
        this.cube4.position.y = -0.035;
        this.scene.add(this.cube4);
        
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
        const width = window.innerWidth / 2.5;
        const height = window.innerHeight / 1.3;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }

    renderSystem()
    {

    }
}
