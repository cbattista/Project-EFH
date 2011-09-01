<?php

//inputData.php
include "../db.php";

mysql_connect(localhost, $uname, $password);
mysql_select_db($database);

if(isset($_POST['uid'])) { 
	
	$uid = $_POST['uid'];
	$data = $_POST['data'];	
	$lines = explode("|", $data);
	$table = $_POST['table'];
	$table = trim($table, "\"");
	
	$qstring = "INSERT INTO %s VALUES (%s, %s);";
	
	foreach ($lines as $line) {
		$line = str_replace("\\", "", $line);

		$query = sprintf($qstring, $table, $uid, $line);
	
		$result = mysql_query($query);					
						
	}
	
	echo "success";

} 
else { 
	echo "No uid provided";
}

?>
