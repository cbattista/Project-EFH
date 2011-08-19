<?php

include "../db.php";

$gid = $_GET['gid'];
$sid = $_GET['sid'];
$limit = $_GET['limit'];

mysql_connect('localhost', $uname, $password);
mysql_select_db($database);

if ($gid && $sid) {
	$output = user_game_score($gid, $sid);	
}

else if ($gid && $limit){
	$output = score_table();
}

else if ($gid) {
	$output = game_score($gid);
	}
else if ($sid) {
	$output = user_score($sid);
	}



echo $output;

function user_game_score($gid, $sid){
	$query = sprintf("SELECT highScore FROM history WHERE gid = %s AND sid = %s ORDER BY trainingDay ASC", $gid, $sid); 

	$result = mysql_query($query);

	$highScore = 0;

	while ($row = mysql_fetch_assoc($result)) {
		$highScore = $row['highScore'];
	}

	$output = $highScore; 

	return $output;
}

function game_score($gid){	
	$query = sprintf("SELECT DISTINCT(sid) FROM history WHERE gid = %s", $gid);
	$result = mysql_query($query);
	$output = "<table border = \"1\"><tr><th>user</th><th>score</th></tr>";
	while ($row = mysql_fetch_assoc($result)) {
		$score = user_game_score($gid, $row['sid']);
		$query = sprintf("SELECT name FROM users WHERE uid = %s", $row['sid']);
		$row = mysql_fetch_object(mysql_query($query));
		$name = $row->name;
		$output .= sprintf("<tr><td>%s</td><td>%s</td></tr>", $name, $score);
	}
	$output .= "</table>";

	return $output;
}

function user_score($sid) {
	$query = sprintf("SELECT DISTINCT(gid) FROM history WHERE sid = %s", $sid);
	$result = mysql_query($query);
	$output = "<table border = \"1\"><tr><td>game</td><td>score</td></tr>";
	while ($row = mysql_fetch_assoc($result)) {
		$score = user_game_score($row['gid'], $sid);
		$query = sprintf("SELECT name FROM games WHERE gid = %s", $row['gid']);
		$row = mysql_fetch_object(mysql_query($query));
		$name = $row->name;
		$output .= sprintf("<tr><td>%s</td><td>%s</td></tr>", $name, $score);
	}
	$output .= "</table>";
	
	return $output;
}


function score_table($gid,$limit){

	$query = sprintf("SELECT highScore FROM history WHERE gid = %s ORDER BY highScore ASC LIMIT = %s",$gid,$limit);
	$result = mysql_query($query);
	$output = "<table border = \"1\"><tr><td>user</td><td>score</td></tr>";
	while ($row = mysql_fetch_assoc($result)){
		$score = $row['highScore'];
		$query = sprintf("SELECT name FROM users WHERE uid = %s",$row['sid']);
		$row = mysql_fetch_object(mysql_query($query));
		$name = $row->name;
		$output .= sprintf("<tr><td>%s</td><td>%s</td></tr>",$name,$score);
	}
	$output .= "</table>";
	return $output;
}

?>
