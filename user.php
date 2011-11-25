<?php

include "db.php";

//date format
$df = "M d, Y";

if(isset($_COOKIE["funkyTrainUser"])){
	$login = 1;
	$username = $_COOKIE["funkyTrainUser"];
}
else{
	$login = 0;
}

if ($login == 1) {
	$con = mysql_connect(localhost, $uname, $password);

	if (!$con){
		die("Could not connect" . mysql_error());
	}

	mysql_select_db($database);


	//get the training schedule for the user
	$query = sprintf("SELECT currentTraining, start, uid FROM users WHERE name = '%s'", $username);
	$result = mysql_query($query);

	while ($row = mysql_fetch_assoc($result)){
		$tpid = $row['currentTraining'];
		$start = $row['start'];
		$sid = $row['uid'];
	}


	$today = getdate();

	//let's see what the day of training the user is on
	if ($start == "0000-00-00") {
		//we're starting today
		$day = 1;
		$query = sprintf("UPDATE users SET start=\"%s-%s-%s\" WHERE name = '%s'", $today['year'], $today['mon'], $today['mday'], $username);
		mysql_query($query);
	} else {
		// if we have already started we need to determine the day
		//date_timezone_set("America/Toronto");
		$start_day = strtotime($start);
		$today = sprintf("%s-%s-%s", $today['year'], $today['mon'], $today['mday']);
		
		//calculate day diffs
		$s = strtotime($start);
		$end = strtotime($today);

		$day = ceil(abs($end - $s) / 86400) + 1;

		$time = date('G:i');

	}

	$datetime = sprintf("<span>Today is %s.<br/>The time is %s.<br/>You started training on %s.<br/>This is day %s of training.<br/></span>", date($df, $end), $time, date($df, $start_day), $day);

	//Set cookie to track the day
	setcookie("funkyTrainDay",$day, time() + 7200);
	
	//so we know what day it is, let's determine whether we are in pre, training, or post phase
	$query = sprintf("SELECT pre, post, training FROM training WHERE tpid = %s", $tpid);

	$result = mysql_query($query);
	
	while($row = mysql_fetch_assoc($result)){
		$pre = $row['pre'];
		$post = $row['post'];
		$training = $row['training'];
	}

	//need to chop the value of training into a list
	$training = explode(',', $training);

	array_unshift($training, $pre);
	$training[] = $post;

	$one_day = 86400;

	$pre_day = $start_day + ($one_day * ($pre-1));
	$post_day = $start_day + ($one_day * ($post-1));

	$schedule = "<span><h4>Your training days:</h4>";
	$schedule .= "<table><tr><th>day</th><th>date</th><th>games completed</th></tr>";

	foreach ($training as $tday) {
		$the_day = $start_day + ($one_day * (intval($tday) - 1));

		$query = sprintf("SELECT name from games WHERE gid IN (SELECT gid FROM completed WHERE sid = %s AND day = %s);", $sid, $tday);
		$result = mysql_query($query);
		$games = "";
		while($row = mysql_fetch_assoc($result)){
			$games .= sprintf("%s,", $row['name']);
		}
		$games = trim($games, ',');
	
		$schedule.= sprintf("<tr><td>%s</td><td>%s</td><td></td></tr>", $tday, date($df, $the_day), $games);
	}


	$schedule .= "</table>";

	if ($day == $pre) {
		$phase = "preGames";
	}
	elseif ($day == $post) {
		$phase = "postGames";
	}
	elseif (in_array($day, $training) == True) {
		$phase = "trainingGames";
	}
	else {
		$phase = Null;
	}

	if ($phase != Null) {

		echo "<p>Here are the games you need to play today:</p>";

		$query = sprintf("SELECT %s FROM training WHERE tpid = %s", $phase, $tpid);


		$result = mysql_query($query);
		while($row = mysql_fetch_assoc($result)){
			$games = $row[$phase];
		}

		$games = explode(",", $games);

		foreach ($games as $game) {
			$query = sprintf("SELECT day FROM completed WHERE gid=%s AND sid=%s", $game, $sid);
			$result = mysql_query($query);
			$completed = False;

			while($row = mysql_fetch_assoc($result)) {
				if ($day == $row['day']) {
					$completed = True;
				}
			}

			if ($completed != True) {
				$query = sprintf("SELECT name FROM games WHERE gid = %s", $game);
				$result = mysql_query($query);
				while($row = mysql_fetch_assoc($result)) {
					$name = $row['name'];
					$output .= sprintf("<a href=\"games/gamePage.html?gid=%s \">%s</a><br/>", $game, $name);
				}
			}
		}
	}
	else {
		$output .= "<p>You don't need to play any games today.</p>";
	}

	$output .= "<br/>";
	$output .= $datetime;
	$output .= $schedule;


}
else {
	$output = "0";
}

echo $output;

?>
