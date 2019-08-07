import { SCWAT } from './scwat.js';

let stampede = new SCWAT( 'stampede2.json', 'stampedeSunburst', 'div', 450, 450 );
let maverick = new SCWAT( 'maverick2.json', 'maverickSunburst', 'div', 450, 450 );
let lonestar = new SCWAT( 'lonestar5.json', 'lonestarSunburst', 'div', 450, 450 );

stampede.render();
maverick.render();
lonestar.render();