<?php

include "db.php";

if(isset($_COOKIE["funkyTrainUser"])){
	$login = 1;
	$username = $_COOKIE["funkyTrainUser"];
}
else{
	$login = 0;
}

if ($login == 1) {
	$con = mysql_connect(localhost, $uname, $password);

	if (!$con){
		die("Could not connect" . mysql_error());
	}

	mysql_select_db($database);

	$query = sprintf("SELECT subjectID FROM userInfo WHERE username = '%s'", $username);

	$result = mysql_query($query);

	while ($row = mysql_fetch_assoc($result)){
		$subjectID = $row['subjectID'];
	}

	$query = sprintf("SELECT tprogramID, now_gamesPlayable FROM trainingProgramInfo WHERE subjectID = '%s'", $subjectID);

	$result = mysql_query($query);
	
	while($row = mysql_fetch_assoc($result)){
		$tp = $row['tprogramID'];
		$now_GP = $row['now_gamesPlayable'];
		$output = sprintf("%s,%s,%s,%s",$username,$login,$tp,$now_GP);
	}
}
else {
	$output = "0";
}

echo $output;

?>
