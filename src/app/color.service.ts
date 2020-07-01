import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ColorService 
{
    colors = [
        { 'fos' : 'MPS',  'color' : 'rgba(77,121,168, 0.8)'   },
        { 'fos' : 'GEO' , 'color' : 'rgba(242, 142, 48, 0.8)' },
        { 'fos' : 'CISE', 'color' : 'rgba(225,87,88, 0.8)'    },
        { 'fos' : 'ENG' , 'color' : 'rgba(118,183,178, 0.8)'  },
        { 'fos' : 'BBS' , 'color' : 'rgba(89,161,78, 0.8)'    },
        { 'fos' : 'TRA' , 'color' : 'rgba(237,201,72, 0.8)'   },
        { 'fos' : 'SBE' , 'color' : 'rgba(156,117,95, 0.8)'   },
        { 'fos' : 'HA' ,  'color' : 'rgba(232, 26, 91, 0.8)'  }
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
