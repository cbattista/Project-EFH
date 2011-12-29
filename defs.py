from mako.template import Template

table = Template("""
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

