<?php

//inputData.php

$uname="tbattist_gemini";
$pw="3x3cut1v3";
$database="tbattist_EFH";

mysql_connect(localhost, $uname, $pw);
mysql_select_db($database);

if(isset($_GET['sid'])) { 
	
	$sid = $_GET['sid'];
	$data = $_GET['data'];	
	$lines = explode("|", $data);
	$table = $_GET['table'];

	$qstring = "INSERT INTO %s VALUES (%s, %s)";

	foreach ($lines as $line) {
		$query = sprintf($qstring, $table, $sid, $line);
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