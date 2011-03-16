<?php

$game = $_GET['game'];
$level = $_GET['score'];

$uname="OH";
$pw="HELL";
$database="NO";

mysql_connect(localhost, $uname, $pw);
mysql_select_db($database);

$query = sprintf("SELECT level FROM difficulty WHERE game = '%s' AND minscore <= %s AND maxscore > %s", $game, $score, $score); 

$result = mysql_query($query);

while ($row = mysql_fetch_assoc($result)) {
	$level = $row['level'];
}

$query = sprintf("SELECT trials, fac1, fac2, fac3 FROM difficulty WHERE game = '%s' AND level = %s", $game, $level);

$result = mysql_query($query);

while ($row = mysql_fetch_assoc($result)) {
	$t = $row['trials'];
	$f1 = $row['fac1'];
	$f2 = $row['fac1'];
    $f3 = $row['fac2'];         
}



$output = sprintf("%s,%s,%s,%s", $t, $f1, $f2, $f3); 

echo $output;

?>
