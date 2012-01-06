from mako.template import Template

#this is the page that db_tomfoolery uses, gettin' axed eventually
table_page = Template("""
<%def name="list_table(data, title)">
<html>
	<body>
	${title}
	<table>
	<tr>
	% for item in data:
		<td>${item}</td>
	%endfor
	</tr>
	</table>
	</body>
</html>
</%def>
""")


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
	</div>
	<br/>
	<div id = "console"></div>
</div>
</%def>

<%def name = "header(user)">
<div id = "header">
	funkyTrain by CDNL  ||<span id="u_head">
	%if user:
		${user}  |  <a href='index.html'>Log out</a>
	%else:
		Guest  |  <a href='index.html'>Log in</a>
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



