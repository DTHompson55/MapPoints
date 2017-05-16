

function addResource(resourceName){ 
	resources.push({resourceName: resourceName, state:"idle", busyUntil: "", currentTask: ""});
	
}

function removeResource(resourceName){
	
}

function addTask(aTask){
	taskList.push({taskName: aTaskName, state:"unassigned", due:"", assignedTo: ""});
	
}

function cancelTask(aTask){
	
}

function assignResource(resourceName, aTask){
	
}

function freeResource(resourceName, aTask){
	
}

function returnToIdle(resourceName){
	
}

function waitTime(resourceName){
	
}

function minWaitTime(){
	
}

function getNextResource(){
	
}

function getClosestResource(){
	
}


var taskList = [{
	path:"aPath", taskName: "aTask", state: "aState", due: "aTime", assigned:"w" 
}];

var resourceList = [
	{name:"name", busyUntil:"1", state: "aState", currentTask: "aTask"}
]






