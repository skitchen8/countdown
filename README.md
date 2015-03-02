# countdown
Basic javascript implementation of /asarium/ksc-node/

Updated as of 3/1/15

This project is designed to connect to a WebSocket server which pushes out live data from both KSC and VAFB. Right now
there are a couple disparate functions of this code, but if you just want a simple data display (I'll work on making it
look pretty sometime later) all you need are websocket.html and js/websocket.js, then open up websocket.html in any browser
and it will work. The script to record the JSON data should work but is mostly untested at this point, and requires a bit
more set up to make it function (eventually I will include an SQL file with data in it), and I hope to make a script to push
out this recorded data via WebSocket for testing purposes.

File Explanations:
JSON.html - This just tests the JSON parsing with sample data, uses js/JSONparse.js, which uses js/JSONFormatter.json
ajax.php - This is used by recordValues.php to update database asynchronously 
newfile.txt - This stores the terribly implemented debug info for ajax.php
recordValues.php - This script records live JSON data from Websocket when available, uses js/recordSocket.js and ajax.php
websocket.html - This is the JS implementation that shows live data from KSC (VAFB to be added later), uses js/websocket.js

js/JSONparse.js - JSON parsing for JSON.html
js/websocket.js - Connects to websocket and displays parsed JSON data on websocket.html
js/JSONFormatter.json - sample data, collected by /u/OrangeredStilton who originated project that this connects to

