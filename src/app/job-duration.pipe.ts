import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jobDuration'
})
export class JobDurationPipe implements PipeTransform {

    transform( value : number ): string
    {
        let result = '';

        const hours   = Math.floor( value / ( 60 * 60 ) );

        const remaining = value - ( hours * 60 * 60 );

        const minutes = Math.floor( remaining / 60 );
        const seconds = remaining - minutes * 60;

        result = ( hours   ? ( hours              + ' hours, '   ) : '' ) +
                 ( minutes ? ( minutes            + ' minutes, ' ) : '' ) +
                 ( seconds ? ( seconds.toString() + ' seconds'   ) : '' );


        if( result === '' )
        {
            result = 'Not Applicable';
        }

        return result;
    }

}
