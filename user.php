<?php

include "db.php";

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

		$day = ceil(abs($end - $s) / 86400);

		$time = gmdate('G:i');

	}

	echo sprintf("<p>Today is %s.  The time is %s.  You started training on %s.  This is day %s of training</p>", $today, $time, $start, $day);

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

		$query = sprintf("SELECT %s FROM training WHERE tpid = %s", $phase, $tpid);


		$result = mysql_query($query);
		while($row = mysql_fetch_assoc($result)){
			$games = $row[$phase];
		}

		$games = explode(",", $games);

		$output = "";

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
		echo "<p>You don't need to play any games today</p>";
	}

}
else {
	$output = "0";
}

echo $output;

?>
