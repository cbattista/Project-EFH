<?php

//inputData.php

$uname="OH";
$pw="HELL";
$database="NO";

mysql_connect(localhost, $uname, $pw);
mysql_select_db($database);

if(isset($_POST['sid'])) { 
	
	$sid = $_POST['sid'];
	$data = $_POST['data'];	
	$lines = explode("|", $data);
	$table = $_POST['table'];
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
else { 
	echo $_POST['sid'];
}

?>
