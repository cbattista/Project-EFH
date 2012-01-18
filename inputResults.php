<?php

//inputResults.php
include "db.php";

mysql_connect(localhost, $uname, $password);
mysql_select_db($database);

if(isset($_POST['uid'])) { 
	
	$uid = $_POST['uid'];
	$data = $_POST['data'];	
	$lines = explode("|", $data);
	
	$qstring = "INSERT INTO results (uid, game, trial, value, score) VALUES (%s, %s);";
	
	foreach ($lines as $line) {
		$line = str_replace("\\", "", $line);

		$query = sprintf($qstring, $uid, $line);
	
		$result = mysql_query($query);					
						
	}
	
	echo "success";

} 
else { 
	echo "No uid provided";
}

?>
