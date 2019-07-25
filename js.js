// Create the chart
var data = []
var jobs = {}
var states = {}
var element ;
var list ;
var school_elem ;
var school_list ;
var schoolheader;
var iheader;
var name = "name";
  var pi = "principal_investigator";
  var fos = "field_of_science";
  var pi_instit = "pi_institution";
  var desc = "project_abstract";
  var size = "size";

// load data and represent it in highmaps
$(document).ready ( function () {
  init();
  $.ajax({
    type: "GET",
    url: "stampede2.csv",
    dataType: "text",
    error: function(xhr, error){
        console.debug(xhr); console.debug(error);},
    success: function(jobs) {univToJob(jobs);}
 });
  $.ajax({
  	type:"GET",
  	url: "university_states.csv",
  	dataType: "text",
  	error: function(xhr, error){
        console.debug(xhr); console.debug(error);},
    success: function(states) {univToState(states);}
  });
  $.ajax({
   type: "GET",
   url: "state_count.csv",
   dataType: "text",
   error: function(xhr, error){
        console.debug(xhr); console.debug(error);},
   success: function(data) {processData(data);}
 });
  
});


// initialize the data set in order for highmaps
// to recognize it.
function init() {
	
 element = document.getElementById("institutions");
 dragElement(element);
 list = document.getElementById("institlist");
 school_elem = document.getElementById("singleschool");
 iheader = document.getElementById("institutionsheader");
 iheader.addEventListener("click", function(e){
  element.style.display="none";
 })
 dragElement(school_elem);
 school_list = document.getElementById("joblist");
 schoolheader = document.getElementById("schoolheader");
 schoolheader.addEventListener("click", function(e){
  school_elem.style.display="none";
  element.style.display="block";
 })
  data = [
      ['us-ma', 0],
      ['us-wa', 0],
      ['us-ca', 0],
      ['us-or', 0],
      ['us-wi', 0],
      ['us-me', 0],
      ['us-mi', 0],
      ['us-nv', 0],
      ['us-nm', 0],
      ['us-co', 0],
      ['us-wy', 0],
      ['us-ks', 0],
      ['us-ne', 0],
      ['us-ok', 0],
      ['us-mo', 0],
      ['us-il', 0],
      ['us-in', 0],
      ['us-vt', 0],
      ['us-ar', 0],
      ['us-tx', 0],
      ['us-ri', 0],
      ['us-al', 0],
      ['us-ms', 0],
      ['us-nc', 0],
      ['us-va', 0],
      ['us-ia', 0],
      ['us-md', 0],
      ['us-de', 0],
      ['us-pa', 0],
      ['us-nj', 0],
      ['us-ny', 0],
      ['us-id', 0],
      ['us-sd', 0],
      ['us-ct', 0],
      ['us-nh', 0],
      ['us-ky', 0],
      ['us-oh', 0],
      ['us-tn', 0],
      ['us-wv', 0],
      ['us-dc', 0],
      ['us-la', 0],
      ['us-fl', 0],
      ['us-ga', 0],
      ['us-sc', 0],
      ['us-mn', 0],
      ['us-mt', 0],
      ['us-nd', 0],
      ['us-az', 0],
      ['us-ut', 0],
      ['us-hi', 0],
      ['us-ak', 0],
      ['undefined', 0]
  ];
  abbreviation = {
  	"Texas": "us-tx", 
  "Wisconsin": "us-wa", 
  "Washington":"us-wa", 
  "Virginia": "us-va", 
  "Tennessee":"us-tn", 
  "South Dakota" : "us-sd", 
  "South Carolina": "us-sc", 
  "Rhode Island":"us-ri", 
  "Pennsylvania":"us-pa", 
  "Oregon": "us-or", 
  "Oklahoma":"us-ok", 
  "Ohio":"us-oh", 
  "New York": "us-ny", 
  "New Mexico": "us-nm", 
  "New Jersey": "us-nj",
   "Nebraska": "us-ne", 
  "Nevada":"us-nv", 
  "North Carolina": "us-nc", 
  "Mississippi":"us-ms", 
  "Missouri": "us-mo", 
  "Michigan": "us-mi", 
  "Maryland": "us-md", 
  "Massachusetts":"us-ma", 
  "Louisiana":"us-la", 
  "Kentucky":"us-ky", 
  "Indiana":"us-in",  
  "Illinois":"us-il", 
  "Iowa":"us-ia", 
  "Georgia": "us-ga", 
  "Florida": "us-fl", 
  "Delaware":"us-de", 
  "Connecticut":"us-ct", 
  "Colorado":"us-co", 
  "California": "us-ca", 
  "Arizona":"us-az", 
  "Alabama":"us-al", 
  "undefined":"undefined" };
}



function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
// Scan through state_count.cv and update the dataset with the number
// of currently running jobs by state.
function processData(allText) {
  var allTextLines = allText.split(/\r\n|\n/);
  var headers = allTextLines[0].split('\t');
  for (var i = 1; i < allTextLines.length; ++i) {
    var states = allTextLines[i].split('\t');
    if (states.length == headers.length) {
      var cur_state = states[0].replace(/\"/g, "\'");
      var state_count = parseInt(states[1]);
      var iterator = data.keys();
      for (let key of iterator) {
        var arr = data[key];
        var state = arr[0];
        if (state.localeCompare(cur_state) == 0){
          arr[1] = state_count;
          break;
        }
      }
    }
  }
  loadHighmaps();
}

function univToState(allText){
  var allTextLines = allText.split(/\r\n|\n/);
  var headers = allTextLines[0].split('\t');
  for (var i = 1; i < allTextLines.length; ++i) {
    var line = allTextLines[i].split('\t');
    //console.log(line);
    if(line[1] in states){
    	if(!(line[0] in states[line[1]])){
    		states[line[1]].push(line[0]);
    	}
    } else {
    	states[line[1]] = [line[0]];
    }
  }
}

function univToJob(allText){

  var text = Papa.parse(allText, {
  quotes: false, //or array of booleans
  quoteChar: '"',
  escapeChar: '"',
  delimiter: "\t",
  header: true,
  newline: "\r\n",
  skipEmptyLines: false, //or 'greedy',
  columns: null //or array of strings
});
  //console.log(text);
  for (line in text["data"]){
    if(text["data"][line][pi_instit] in jobs){
      jobs[text["data"][line][pi_instit]].push(text["data"][line]);
    } else {
      jobs[text["data"][line][pi_instit]] = [text["data"][line]];
    }
  }
  /*var allTextLines = allText.split(/\r\n|\n/);
  var headers = allTextLines[0].split('\t');
  //console.log(headers);
  var name = headers[0];
  var pi = headers[1];
  var fos = headers[2];
  var abstract = headers[3]; 
  var univ = headers[4];
  var size = headers[5];
  //console.log(allTextLines);
  //iterate through all running jobs and add them to a dict mapping universities to running jobs
  //and their description
  for (var i = 1; i < allTextLines.length; ++i) {
  	var line = allTextLines[i].split('\t');
  	//if the line is formatted correctly just add it to the job
    //console.log(line);
  	if(line.length == 6){

  	//	console.log("we made it into the job selection process");
  		if(!(line[4] in jobs)){
  			jobs[line[4]] = [{"job": line[0], "fos":line[2],  "desc": line[3]}];
  		} else {
  			//for( x in jobs[line[4]]){
  				//if(jobs[line[4]][x]["job"]){
  				//	break;
  			//	}
  			//}
  			jobs[line[4]].push({"job": line[0], "fos":line[2],  "desc": line[3]});
  		}
  	} else {
  		//console.log(line);
  	}
   
  }*/
  //console.log(jobs);
}
function listJobs(univ){
  joblist.innerHTML = "";
  schoolheader.innerText= univ;
	var foslist = [];
	//console.log(jobs);
	//console.log(univ + " the university or something should appear here");
  console.log(jobs[univ]);
	for (job in jobs[univ]){
		//console.log(jobs[univ][job]["fos"]);
			let node = document.createElement("LI");
      var textnode = document.createTextNode("Job Name  " + jobs[univ][job][name] + ";  FOS : " + jobs[univ][job][fos]);
      var descriptnode = document.createElement("DD");
      var description = jobs[univ][job][desc];
      var descripttext = document.createTextNode(description);
      descriptnode.appendChild(descripttext);
      node.appendChild(textnode);
      node.appendChild(descriptnode);
      joblist.appendChild(node);
	}
	//console.log(foslist);
  element.style.display = "none";
  school_elem.style.display = "block";
	
}


function dummyFunc(state) {
  
  list.innerHTML = "";
  school_elem.style.display="none";
  	for(val in states[abbreviation[state]]){
  		var node = document.createElement("LI");
  		var textnode = document.createTextNode(states[abbreviation[state]][val]);
  		var descriptnode = document.createElement("DD");
  		var description = "The fields of study being explored by this university include: ";
  		//var foslist = listFOS(states[abbreviation[state]][val]);
  		var univ = states[abbreviation[state]][val];
  		//include descriptive text of the universities jobs
	    if(jobs[univ]){
	    //add a slight description of the fields of study being explored by a university
	      for (job in jobs[univ]){
	        if(!(description.includes(jobs[univ][job][fos])))
		      description = description.concat(jobs[univ][job][fos], ", \n");
	      }
	    } else{
	    	description = "";
	    }
  		var descripttext = document.createTextNode(description);
  		descriptnode.appendChild(descripttext);
  		node.appendChild(textnode);
  		node.appendChild(descriptnode);
      //console.log(node);
      //console.log(univ);
  		node.addEventListener('click', function(e){listJobs(univ);});
  		list.appendChild(node);
  		//console.log(states[abbreviation[state]][val]);
  	}
  	element.style.display="block";
  
}

// Passes the data into highmaps
function loadHighmaps() {
  //console.log(data);
  Highcharts.mapChart('map_container', {
      chart: {
          backgroundColor: '#c7d2e2',
          map: 'countries/us/us-all'
      },

      title: {
          text: ''
      },

      plotOptions: {
        series: {
          events: {
            click: function (e) {
                        //var text = '<b>Clicked</b><br>State: ' + e.point.name + '<br>Running Jobs:' + e.point.value;
                        //if (!this.chart.clickLabel) {
                        //    this.chart.clickLabel = this.chart.renderer.label(text, 0, 250)
                        //        .css({
                        //            width: '180px'
                        //        })
                        //        .add();
                        //} else {
                        //    this.chart.clickLabel.attr({
                        //*        text: text
                        //    });
                        //}
                        if(element.style.display == 1) element.style.display= 0;
                        dummyFunc(e.point.name);
                    }
                }
            }
        },

      series: [ {
        states: {
        }
      },
      {
        name: 'Running jobs',
        type: 'mapbubble',
        color: '#76c6f7',
        minSize: 0,
        maxSize: '20%',
        data: data,
        joinBy: null,
        tooltip: {
          pointFormat: '{point.properties.hc-a2}: {point.z} running jobs'
        }
      }]
  });
}