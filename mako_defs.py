from mako.template import Template

gp_template = Template("""

<%! import constants%>
<%def name="head(title, scripts, othercrap=[])">
	<head> 
	<title>${title}</title>
	<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Black+Ops+One">
	<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Quantico">
	%for script in scripts:
		%if script.endswith(".css"):
			<link href="${script}" rel="stylesheet" type="text/css">
		%elif script.endswith(".js"):
			<script src="${script}"></script>
		%else:
			%if constants.scripts.has_key(script):
				<script src="${constants.scripts[script]}"></script>
			%endif
		%endif
	%endfor

	%if othercrap:
		%for o in othercrap:
			${o}
		%endfor
	%endif

	</head>
</%def>

<%def name="body(data)">
	<body>
	<div id="content">
	${data}
	</div>
	</body>
</%def>

<%def name="title_div(ID, title, data, title_lvl)">

	%if ID:
		<div id = "${ID}">
	%else:
		<div>
	%endif

	%if title:
		<h${title_lvl}>${title}</h${title_lvl}>
	%endif

	%if data:
	<span id='${ID}_data'>${data}</span>
	%endif
	</div>
</%def>

<%def name = "game_stats()">
<div id = "stats">
	<h3>Stats</h3>
	<table>
	<tr><td>Score :</td><td id="totalScore"></td></tr>
	<tr><td>Trial :</td><td id="trial"></td></tr>
	<tr><td>Level :</td><td id="level"></td></tr>
	<tr><td>Speed :</td><td id="speed"></td></tr>
	</table>
</div>
</%def>

<%def name= "account_create()">
<div id = "accountCreate">
	<h3>Create Account</h3>
	<form method='POST' action='submit'>
	Name: <input type="text" name="name" /><br />
	Password: <input type="text" name="pw" /><br />
	Email : <input type="text" name="email" /><br />
	<input type='submit' value='Create' />
	</form>
</div>
</%def>

<%def name="account_reset()">
<div id="accountReset">
<h3>Reset Account</h3>
<form method='POST' action='reset'>
Name: <input type="text" name="name" /><br />
<input type='submit' value='Reset' />
</form>
</div>
</%def>

<%def name="account_adjust()">
<div id="accountAdjust">
<h3>Adjust Training</h3>
<form method='POST' action='adjust'>
Name: <input type="text" name="name"/><br/>
New Start: <input type="text" name="start"/><br/>
<input type='submit' value='Adjust' />
</form>
</div>
</%def>

<%def name = "table(title, data)">
	<div class="table">
	%if title:
		<h3>${title}</h3>
	%endif
	<table>
	%for row in data:
		<tr>
		%for r in row:
			<td>${r}</td>
		%endfor
		</tr>
	%endfor
	</table>
	</div>
</%def>

<%def name = "game_window()">
<div id = "game">
	<div id="playground" style = "background-color:black;">

    		<div id="welcomeScreen" style= "position: absolute; z-index: 100;">
				<div id="loadingBar" style="position: relative; left: 100px; height: 15px; width: 0px; background: red;">
				</div>
				<br />
				<center>
		    		<button style="cursor: pointer;" id="startbutton">Play</button>
				</center>
    		</div>

			<div id = "pauseScreen">
				<div>
					<button style = "cursor:pointer;" id = "resumeButton">Resume Play </button>
					<button style = "cursor:pointer;" id = "instructButton">Instructions </button>
				</div>
				
				<div id = "gameOver">
					<h1 id = "gameOverText"> GAME OVER </h1>
				</div>	

			</div>


	</div>
	<br/>
	<div id = "console"></div>
</div>
</%def>

<%def name = "header(user)">
<div id = "header">
	funkyTrain by CDNL  ||<span id="u_head">
	%if user:
		${user}  |  <a href="${constants.siteURLs['main']}">Your page</a>  ||   <a href="${constants.siteURLs['login']}">Log out</a>
	%else:
		Guest  |  <a href="${constants.siteURLs['login']}">Log in</a>
	%endif
	</span>
</div>
</%def>

<%def name = "footer()">
<div id = "footer">
	<a href="http://www.cdnlwestern.ca/">Cognitive Development and Neuroimaging Laboratory, University of Western Ontario</a>
</div>
</%def>

<%def name="login_box()">
<div id = "login">
	<h3>Existing Users</h3>
	<form action = "" >
	Username: <input id = "user" type="text" name="user" /><br />
	Password: <input type="password" name="password" /><br />	
	</form>
	<button id = "submit">Login</button>
	<br/>	
	<h3>New Users</h3>
	Need an account? <a id="account_create" href=#>Click here to request one.</a>
</%def>


""")




