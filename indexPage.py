#gamePage.py

#generation of static game content
from mako_defs import gp_template
import databeast
import os

root = '/var/www/Project-EFH/'

beast = databeast.dataBeast("funkyTrain", "training")

#build the <head>
scripts = ['jquery', 'css/common.css', 'js/common.js', 'js/login.js']
output = gp_template.get_def("head").render(title='all aboard the funkyTrain', scripts=scripts)

#header div
header = gp_template.get_def("header").render(user="")

#some content
about = gp_template.get_def("title_div").render(ID="", title="funkyTrain", data="<p>An investigation into the trainability of executive function being conducted by CDL-UWO</p>", title_lvl=2)

loginBox = gp_template.get_def("login_box").render()

#footer div
footer = gp_template.get_def("footer").render()

#add it to the <body>
output += gp_template.get_def("body").render(data=header + about + loginBox + footer)
	
f = open(os.path.join(root, "index.html"), "w")
f.write("<html>")
f.write(output)
f.write("</html>")
f.close()
