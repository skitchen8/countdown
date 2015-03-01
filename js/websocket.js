//reference elements on page here
var socketStatus = document.getElementById('status'); //shows status of connection
var closeLink = document.getElementById('closeConn'); //"Close connection" link
var dataDiv = document.getElementById('divData'); //DIV that contains parsed JSON data

//open websocket connection
var ws = new WebSocket('ws://ksc.nazar.so:8080/ws');

ws.onopen = function(event) { //fires upon successful connection
	socketStatus.innerHTML = 'Connected to Server';//'Connected to: ' + event.currentTarget.url; 
	socketStatus.className = 'open';
	console.log("Connection Open"); //debug: show connection open
};

ws.onclose = function(event) {	
	console.log("Connection Closed"); //debug: onclose has been called
	console.log("ReadyState:" + ws.readyState); //debug: show state
	//ReadyState = 0-not established, 1-established, 2-closing handshack (not relevant)
	//3-connection closed (or could not be opened)
	socketStatus.innerHTML = 'Disconnected from Websocket.'; 
	//cannot get reconnect to work, possible refresh button?
	socketStatus.className = 'closed';
	closeLink.innerHTML = ''; //kill close connection link (already closed)
	//dataDiv.innerHTML = ''; //Prevent data view from showing old info, NO LONGER NEDED
};

ws.onmessage = function (event) { //websocket listener, fires on new data
	var nondata = event.data; //raw JSON data, remove
	//console.log(nondata); //show raw JSON in console
	var data = JSON.parse(event.data); //to get data: data.[fieldname].[fieldname]
	//console.log(data); //show parsed JSON in console
	parseData(data);	
};

function closeSocket() {
	ws.close(); //close connection
	socketStatus.innerHTML = 'Disconnecting from Websocket.';
	socketStatus.className = 'closing';
	console.log("Connection Closing"); //debug: closing (actual close event fires after)
	return false;
};

function parseData(Jdata) {
    if (Jdata.ksc.vehicle) {
	console.log(Jdata.ksc.vehicle + " - " + Jdata.ksc.spacecraft);
	document.getElementById("launchVehicle").innerHTML = "Launch Vehicle: " + Jdata.ksc.vehicle + " Spacecraft: " + Jdata.ksc.spacecraft;
	var expectedTime = timeReadable(Jdata.ksc.times.expected);
	console.log(Jdata.ksc.times.expected);
	document.getElementById("expectedLaunch").innerHTML = "Expected Launch: " + expectedTime + " " + Jdata.ksc.tz;
	document.getElementById("updateTime").innerHTML = "Updated At: " + timeReadable(Jdata.ksc.generated) + " " + Jdata.ksc.tz;
	document.getElementById("windowOpen").innerHTML = "Window Opens: " + timeReadable(Jdata.ksc.times.windowOpens) + " " + Jdata.ksc.tz;
	//WOTTSTRG06 = Window Time Remaining - hh:mm:ss (for calculating window length/window close) (Jdata.ksc.raw.WOTTSTRG05);
	document.getElementById("EVENTLB01").innerHTML = Jdata.ksc.events[0].label;
	document.getElementById("EVENTTIM01").innerHTML = Jdata.ksc.events[0].time;
	document.getElementById("EVENTLB02").innerHTML = Jdata.ksc.events[1].label;
	document.getElementById("EVENTTIM02").innerHTML = Jdata.ksc.events[1].time;	
	document.getElementById("EVENTLB03").innerHTML = Jdata.ksc.events[2].label;
	document.getElementById("EVENTTIM03").innerHTML = Jdata.ksc.events[2].time;
	document.getElementById("EVENTLB04").innerHTML = Jdata.ksc.events[3].label;
	document.getElementById("EVENTTIM04").innerHTML = Jdata.ksc.events[3].time;
	document.getElementById("EVENTLB05").innerHTML = Jdata.ksc.events[4].label;
	document.getElementById("EVENTTIM05").innerHTML = Jdata.ksc.events[4].time;
	document.getElementById("EVENTLB06").innerHTML = Jdata.ksc.events[5].label;
	document.getElementById("EVENTTIM06").innerHTML = Jdata.ksc.events[5].time;
	document.getElementById("EVENTLB07").innerHTML = Jdata.ksc.events[6].label;
	document.getElementById("EVENTTIM07").innerHTML = Jdata.ksc.events[6].time;
	document.getElementById("EVENTLB08").innerHTML = Jdata.ksc.events[7].label;
	document.getElementById("EVENTTIM08").innerHTML = Jdata.ksc.events[7].time;
	document.getElementById("EVENTLB09").innerHTML = Jdata.ksc.events[8].label;
	document.getElementById("EVENTTIM09").innerHTML = Jdata.ksc.events[8].time;
	document.getElementById("EVENTLB10").innerHTML = Jdata.ksc.events[9].label;
	document.getElementById("EVENTTIM10").innerHTML = Jdata.ksc.events[9].time;
    } else {
        document.getElementById("launchVehicle").innerHTML = "No data available. Will refresh every 60 seconds and re-attempt";
        console.log("No data, auto-refresh in 60 seconds");
        ws.close();
        setTimeout(function(){
            window.location.reload(1);
        }, 60000);
    }
}

function timeReadable(toConvert) {
	var date = new Date(toConvert*1000);
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var year = date.getFullYear();
	var readable = month + "/" + day + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
	return readable;
}