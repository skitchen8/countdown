<!DOCTYPE HTML>
<html>
<head>
    <script src="js/jquery-1.11.2.min.js"></script>
    <title>Countdown Data Record</title>
</head>
<body>
    <div id="errAll"></div>
<div id="status">Connecting...</div>
<a href="javascript:closeSocket()" id="closeConn">Close Connection</a><br />
<div id="divData">
    <form method="post" id="formcomment">
        <input type="text" name="generated" id="generated" value="">
        <textarea rows='10' cols='20' name='msgJSON' id='msgJSON'><?php echo (isset($_POST['JSON']) ? $_POST['JSON'] : ''); ?></textarea>
        <input type="submit" name="submitter" value="Submit" id="btnSubmit" />
        <input type="hidden" name="task" value="addComments" />
    </form>
</div>
<script src="js/recordSocket.js";></script>

<script type="text/javascript">
function submitValues() { //this is what gets called when WebSocket gets new data
    //this code is mostly copypasta from various sources, working on cleaning it up
    cmessage = this.msgJSON.value;
    cgenerated = this.generated.value;
    submitter = this.submitter;

    var data = {
        generated: cgenerated, 
        message: cmessage
    };
    $.post("ajax.php", data, function( response ) {
        if( '0' == response ) { 
            $("#errAll").html('<p>No Data From Server, Will Try Again</p>');  
        } else { 
            //nothing. Data was saved successfully into DB
        }
    });     
}
</script>
</body>
</html>