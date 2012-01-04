function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

function setCookie(c_name,value,exdays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	c = c_name + "=" + c_value + "; path=/";
	document.cookie=c;
}

function logout(){
	setCookie('funkyTrainUser', 'null', -2);
	setCookie('funkyTrainID', 'null', -2);
	setCookie('funkyTrainDay', 'null', -2);
}

$(function () {
	user = getCookie("funkyTrainUser");
	if (user) {
	$('#u_head').html(" " + user + "  | <a id='logout' href='../login.html'>Log out</a>");
		$("#logout").click( function () {
			logout();		
		});
	}
});
