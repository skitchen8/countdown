<?php
//All fwrite functions and below fopen to be removed in a production environment
//this is a terrible, no good, very bad way to debug
//$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");

//change host, user, password, and DB to reflect your server
$host='localhost';
$user='root';
$pass='';
$db='countdownrecord';
//Table 'tbljson' to have two columns
//'idGenerated' is int and 'JSON' is text
//that's not the best way to do it, but if it's dumb and it works it isn't dumb right?

$con = mysql_connect($host, $user, $pass) or die(mysql_error() . 'Oops! there is a problem connecting to database');
mysql_select_db($db, $con) or die(fwrite($myfile, "Error selecting database ". mysql_error()));

//MESSY DEBUG CODE:
//fwrite($myfile, $_POST['task']);
//fwrite($myfile, $_POST['generated']);
//fwrite($myfile, $_POST['msgJSON']);
//fwrite($myfile, $_POST['message']);

if (isset($_POST['generated'])) 
{
    $generated = addslashes(trim($_POST['generated']));
    $comment = addslashes(trim($_POST['message']));

    //Fuck it, just parse the JSON here to determine if fields are null
    $jsoninfo = json_decode($_POST['message']);
    $spaceCraft = $jsoninfo->ksc->spacecraft;
    $jsonGenerated = $jsoninfo->ksc->generated;    
    //fwrite($myfile, "JSONGenerated:" . $jsonGenerated . "XX");
	
    //if ($generated == "" || $comment == "") {
    if ($spaceCraft == "") {   
        echo '0'; //no data, error
    } else {
        $query = "INSERT INTO tbljson(idGenerated, JSON) VALUES ('$generated', '$comment')";
        $sql=mysql_query($query);
        if($sql) {
            echo 'Something broke, oops'; //AFAIK you'll never see this message since this
            //gets processed in the background
            //but I also know nothing about jquery or AJAX
	}
    }
}
//fclose($myfile);
?>