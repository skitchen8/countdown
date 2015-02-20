//var jURL = "js/sample.JSON";
//var data = JSON.parse(jURL);

var request = new XMLHttpRequest();
request.open("GET", "js/jsonFormatter.json", false);
request.send(null);
var data = JSON.parse(request.responseText);
//console.log(data);
parseData(data);

function parseData(Jdata) {
	//console.log(Jdata);
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