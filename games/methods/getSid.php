<?php
include "db.php";

if(isset($_COOKIE["funkyTrainUser"])){
	$username = $_COOKIE["funkyTrainUser"];
	
	$con = mysql_connect(localhost,$uname,$password);

	if(!$con){
		die("Could not connect". mysql_error());
	}

	mysql_select_db($database);

	$query = sprintf("SELECT subjectID FROM userInfo WHERE username = '%s'",$username);

	$result = mysql_query($query);

	while ($row = mysql_fetch_assoc($result)){
		$subjectID = $row['subjectID'];
	}

	echo $subjectID;

}
?>
