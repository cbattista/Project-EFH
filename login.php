$username = $_GET['username'];
$password = $_GET['password'];

$uname = "OH";
$pw = "HELL";
$database="NO";

mysql_connect(localhost,$uname,$pw);
mysql_select_db($database);

$query = sprintf("SELECT password FROM username WHERE username = '%s' AND password = '%s'", $username,$password);

$result = mysql_query($query);

while ($row = mysql_fetch_assoc($result)){
	$userID = $row['username'];
	$userPw = $row['password'];
}
echo $result;
if($userPw != $username ||$userID != $username  || $result == null){
	alert("Invalid username/password, Try Again");
} 
else {
	alert("Welcome!");
	
}
