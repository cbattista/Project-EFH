<?php

//inputData.php

$uname="tbattist_gemini";
$pw="3x3cut1v3";
$database="tbattist_efh";

mysql_connect(localhost, $uname, $pw);
mysql_select_db($database);

if(isset($_GET['sid'])) { 
	$sid = $_GET['sid'];
	$data = $_GET['data'];	
	$table = $_GET['table'];
	
	$lines = explode("|", $data);
	foreach ($lines as $line) {
		$line = explode(",", $line);
		$trial = $line[0];
		$value = $line[1];
		$score = $line[2];
	
		$query = sprintf("INSERT INTO %s VALUES (%s, %s, '%s', '%s')", $table, $sid, $trial, $value, $score);
		
		echo $query;
		
		$result = mysql_query(query);
				
		if ($result) 
			echo "success";
		
		else 
			echo "fail can't connect";
			
	}

} 
else 
	echo "fail no data";


?>