<?php

//inputData.php

$uname="tbattist_EFH";
$pw="executive";
$database="tbattist_EFH";

mysql_connect(localhost, $uname, $pw);
mysql_select_db($database);

if(isset($_GET['sid'])) { 
	$sid = $_GET['sid'];
	$data = $_GET['data'];	
	$table = $_GET['table'];
	
	$data = explode($data, "\n");
	foreach ($data as $line) {
		$line = explode($line, "\t");
		$trial = $line[0];
		$value = $line[1];
		$score = $line[2];
	
		$query = sprintf("INSERT INTO %s VALUES (%s, %s, %s, %s)", $table, $sid, $trial, $value, $score);
		
		$result = mysql_query(query);
		
		if ($result) 
			echo "success";
		
		else 
			echo "fail";
			
	}

} 
else 
	echo "fail";


?>