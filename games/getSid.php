<?php

include "../db.php";

$user = $_GET['user'];

mysql_connect('localhost',$uname,$password);
mysql_select_db($database);

if ($user){
	
	$query = sprintf("SELECT uid FROM users WHERE name = %s", $user);
	
	$result = mysql_query($query);

	while ($row = mysql_fetch_assoc($result)){
		
		$sid = $row['uid'];
	}

	$output = $sid;
}

else{
	$output = "hello";
}

echo $output;

?>
