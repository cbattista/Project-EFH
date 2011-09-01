<?php

include "../db.php";

$gid = $_GET['gid'];
$sid = $_GET['sid'];

mysql_connect('localhost', $uname, $password);
mysql_select_db($database);

if ($gid && $sid) {
$output = user_game_score($gid, $sid);
}

else if ($gid) {
$output = game_score($gid);
}
else if ($sid) {
$output = user_score($sid);
}

else{
$output = high_score_table();
}

echo $output;

//-----------------------------------------------------------------
//--			Functions				 --
//-----------------------------------------------------------------


function user_game_score($gid, $sid){
	$query = sprintf("SELECT sum(score) FROM results WHERE game = %s AND uid = %s AND value='score'", $gid, $sid);
	$result = mysql_query($query);
	$score = 0;

	while ($row = mysql_fetch_assoc($result)) {
		$score = $row['sum(score)'];
	}

	if ($score) {
		$output = $score;
	}
	else {
		$output = 0;
	}

	return $output;
}

function game_score($gid){
	$query = sprintf("SELECT DISTINCT(uid) FROM results WHERE game = %s", $gid);
	$result = mysql_query($query);
	$output = "<table border = \"1\"><tr><th>user</th><th>score</th></tr>";
	while ($row = mysql_fetch_assoc($result)) {
		$score = user_game_score($gid, $row['uid']);
		$query = sprintf("SELECT name FROM users WHERE uid = %s", $row['uid']);
		$row = mysql_fetch_object(mysql_query($query));
		$name = $row->name;
		$output .= sprintf("<tr><td>%s</td><td>%s</td></tr>", $name, $score);
	}
	$output .= "</table>";
return $output;
}

function user_score($sid) {
$query = sprintf("SELECT DISTINCT(game) FROM results WHERE uid = %s", $sid);
$result = mysql_query($query);
$output = "<table border = \"1\"><tr><td><b>Game</b></td><td><b>Score</b></td></tr>";
while ($row = mysql_fetch_assoc($result)) {
$score = user_game_score($row['game'], $sid);
$query = sprintf("SELECT name FROM games WHERE gid = %s", $row['game']);
$row = mysql_fetch_object(mysql_query($query));
$name = $row->name;
$output .= sprintf("<tr><td>%s</td><td>%s</td></tr>", $name, $score);
}
$output .= "</table>";

return $output;
}

function high_score_table(){
	
	$query = "SELECT game, uid, sum(score) FROM results WHERE value='score' GROUP BY game, uid";

	$output = "<table><tr><th>game</th><th>user</th><th>score</th></tr>";

	$result = mysql_query($query);

	while ($row = mysql_fetch_assoc($result)) {
		$game = $row['game'];
		$sid = $row['uid'];
		$score = $row['sum(score)'];

		$q = sprintf("SELECT name FROM users WHERE uid = %s",$sid);
		$result = mysql_query($q);
		$object = mysql_fetch_object($result);
		$username = $object->name;

		$q = sprintf("SELECT name FROM games WHERE gid = %s",$game);
		$result = mysql_query($q);
		$object = mysql_fetch_object($result);
		$gamename = $object->name;

		$output .= sprintf("<tr><td>%s</td><td>%s</td><td>%s</td><tr/>", $gamename, $username, $score);

	}
	$output .= "</table>";	


return $output;
}
?>
