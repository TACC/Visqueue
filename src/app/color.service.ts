import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ColorService 
{
    colors = [
        { 'fos' : 'NAT',  'name' : 'natural sciences',            'color' : 'rgba(77,121,168, 0.8)'   },
        { 'fos' : 'OTH' , 'name' : 'other',                       'color' : 'rgba(242, 142, 48, 0.8)' },
        { 'fos' : 'ENG' , 'name' : 'engineering and technology',  'color' : 'rgba(118,183,178, 0.8)'  },
        { 'fos' : 'MED' , 'name' : 'medical and health sciences', 'color' : 'rgba(89,161,78, 0.8)'    },
        { 'fos' : 'SOC' , 'name' : 'social sciences' ,            'color' : 'rgba(156,117,95, 0.8)'   },
        { 'fos' : 'HUM' , 'name' : 'humanities' ,                 'color' : 'rgba(232, 26, 91, 0.8)'  },
        { 'fos' : 'AGR',  'name' : 'agricultural sciences' ,      'color' : 'rgba(225,87,88, 0.8)'    }
    ];

    constructor() { }

    getColorAbbrev( fos : string ) : string
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

    getColorName( fos : string ) : string
    {
        let idx = this.colors.findIndex(d =>
            {   
                return d.name === fos;
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
    
    // https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
    getTitleCase( name : string ) : string
    {
        return name.replace(
            /\w\S*/g,
            (txt) => {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
          );
    }
}
