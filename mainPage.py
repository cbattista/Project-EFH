#gamePage.py

#generation of static game content
from mako_defs import gp_template
import databeast
import os

root = '/var/www/Project-EFH/'

beast = databeast.dataBeast("funkyTrain", "training")

#build the <head>
scripts = ['jquery', 'css/common.css', 'js/common.js', 'js/main.js']
output = gp_template.get_def("head").render(title='all aboard the funkyTrain', scripts=scripts)

#header div
header = gp_template.get_def("header").render(user="")

#some content
messages = gp_template.get_def("title_div").render(ID="messages", title="Messages", data="No messages.", title_lvl=3)

scores = gp_template.get_def("title_div").render(ID="scores", title="High Scores", data=":)", title_lvl=3)

#schedule = gp_template.get_def("title_div").render(ID="schedule", title="Your training schedule", data="", title_lvl=3)

#footer div
footer = gp_template.get_def("footer").render()

#add it to the <body>
output += gp_template.get_def("body").render(data=header + messages + scores + footer)
	
f = open(os.path.join(root, "main.html"), "w")
f.write("<html>")
f.write(output)
f.write("</html>")
f.close()
