<?php

include "db.php";

$gid = $_GET['gid'];

mysql_connect(localhost, $uname, $password);
mysql_select_db($database);

$query = sprintf("SELECT levels FROM games WHERE gid = %s", $gid); 

$result = mysql_query($query);

while ($row = mysql_fetch_assoc($result)) {
	$output = $row['levels'];
}

echo $output;

?>
