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

else if ($limit){
$output = high_score_table($limit);
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

function high_score_table($limit){
	
	$q1 = "SELECT DISTINCT gid FROM history ORDER BY gid ASC";
	$r1 = mysql_query($q1);
	$output = "";
	
	while ($row1 = mysql_fetch_assoc($r1)){
		$gid = $row1['gid'];

		$q2 = sprintf("SELECT name FROM games WHERE gid = %s",$gid);
		$r2 = mysql_query($q2);

		while ($row2 = mysql_fetch_assoc($r2)){
		
			$game = $row2['name'];
			$output .= sprintf("<h3><u>%s</u></h3><table border = \"1\"><tr><td>user</td><td>score</td></tr>",$game);

			$q3 = sprintf("SELECT * FROM history WHERE gid = %s ORDER BY highScore DESC LIMIT %s ",$gid,$limit);
			$r3 = mysql_query($q3);

			while($row3 = mysql_fetch_assoc($r3)){
				$score = $row3['highScore'];

				$q4 = sprintf("SELECT name FROM users WHERE uid = %s",$row3['sid']);
				$row4 = mysql_fetch_object(mysql_query($q4));
				$name = $row4->name;
				$output .= sprintf("<tr><td>%s</td><td>%s</td></tr>",$name,$score);
			}
		$output .= "</table>";
		}
	}
	return $output;
}
?>
