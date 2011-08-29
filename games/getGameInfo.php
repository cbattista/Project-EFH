<?php

include "../db.php";

$gid = $_GET['gid'];

mysql_connect(localhost, $uname, $password);
mysql_select_db($database);

$query = sprintf("SELECT name,notes,controls,filename FROM games WHERE gid = %s",$gid);

$result = mysql_query($query);

while ($row = mysql_fetch_assoc($result)) {
	$gameName = $row['name'];
	$instructions = $row['notes'];
	$controls = $row['controls'];
	$fileName = $row['filename'];
}


$output = sprintf("%s+%s+%s+%s",$gameName,$instructions,$controls,$fileName);

echo $output;

?>
