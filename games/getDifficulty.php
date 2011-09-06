<?php

include "../db.php";


$game = $_GET['game'];
$score = $_GET['score'];

mysql_connect(localhost, $uname, $password);
mysql_select_db($database);

$query = sprintf("SELECT level FROM difficulty WHERE game = %s AND minscore <= %s ORDER BY minscore DESC LIMIT 1", $game, $score); 


$result = mysql_query($query);

while ($row = mysql_fetch_assoc($result)) {
	$level = $row['level'];
}

$query = sprintf("SELECT trials, fac1, fac2, fac3 FROM difficulty WHERE game = %s AND level = %s", $game, $level);

$result = mysql_query($query);

while ($row = mysql_fetch_assoc($result)) {
	$t = $row['trials'];
	$f1 = $row['fac1'];
	$f2 = $row['fac2'];
    $f3 = $row['fac3'];         
}



$output = sprintf("%s,%s,%s,%s", $t, $f1, $f2, $f3); 

echo $output;

?>
