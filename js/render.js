import { SCWAT } from './scwat.js';

let frontera  = new SCWAT( 'frontera.json',  'sunburst', 448448, 2, 'fronteraSunburst',  'div', false, 550 );
let stampede  = new SCWAT( 'stampede2.json', 'sunburst', 1309056, 2, 'stampede2Sunburst', 'div', false, 550 );
let lonestar5 = new SCWAT( 'lonestar5.json', 'sunburst', 60368, 2, 'lonestar5Sunburst', 'div', false, 550 );

frontera.render();
stampede.render();
lonestar5.render();