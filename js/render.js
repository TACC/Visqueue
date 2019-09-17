import { SCWAT } from './scwat.js';

let frontera  = new SCWAT( 'frontera.json',  'sunburst', 448448, 2, 'frontera',  'div', false, 550, d3.schemeAccent );
let stampede  = new SCWAT( 'stampede2.json', 'sunburst', 1309056, 2, 'stampede2', 'div', false, 550, d3.schemeSet2 );
let lonestar5 = new SCWAT( 'lonestar5.json', 'sunburst', 60368, 2, 'lonestar5', 'div', false, 550, d3.schemeSet3 );

frontera.render();
stampede.render();
lonestar5.render();