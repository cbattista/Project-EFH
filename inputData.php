<?php

//inputData.php

$uname="OH";
$pw="HELL";
$database="NO";

mysql_connect(localhost, $uname, $pw);
mysql_select_db($database);

if(isset($_GET['sid'])) { 
	
	$sid = $_GET['sid'];
	$data = $_GET['data'];	
	$lines = explode("|", $data);
	$table = $_GET['table'];
	$table = trim($table, "\"");
	
	$qstring = "INSERT INTO %s VALUES (%s, %s);";

	
	foreach ($lines as $line) {
		$query = sprintf($qstring, $table, $sid, $line);
		
		echo $query;
	
		$result = mysql_query($query);					

		echo $result;
		
		if ($result) 
			echo "success";
		else 
			echo mysql_error();
				
		}
} 
else 
	echo "fail no data";


?>