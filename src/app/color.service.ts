import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ColorService 
{
    colors = [
        { 'fos' : 'NAT',  'color' : 'rgba(77,121,168, 0.8)'   },
        { 'fos' : 'OTH' , 'color' : 'rgba(242, 142, 48, 0.8)' },
        { 'fos' : 'ENG' , 'color' : 'rgba(118,183,178, 0.8)'  },
        { 'fos' : 'MED' , 'color' : 'rgba(89,161,78, 0.8)'    },
        { 'fos' : 'SOC' , 'color' : 'rgba(156,117,95, 0.8)'   },
        { 'fos' : 'HUM' ,  'color' : 'rgba(232, 26, 91, 0.8)' },
        { 'fos' : 'AGR', 'color' : 'rgba(225,87,88, 0.8)'    },
    ];

    constructor() { }

    getFosColor( fos : string ) : string
    {
        let idx = this.colors.findIndex(d =>
            {   
                return d.fos === fos;
            });

        if( idx >= 0 )
        {
            return this.colors[ idx ].color;
        }
        else
        {
            return this.colors[ this.colors.length - 1 ].color;
        }

    }
}
