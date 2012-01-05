#gamePage.py

#generation of static game content
from mako_defs import gp_template
import databeast
import os

root = '/var/www/Project-EFH/'

beast = databeast.dataBeast("funkyTrain", "games")

scripts = ['jquery', 'gamequery', 'js/Subject.js', 'js/shuffler.js', 'js/gameFuncs.js', 'js/common.js', 'js/sprintf.js', 'js/makeCueList.js', 'css/common.css', 'css/gamePage.css']

for gid in beast.distinct('gid'):
	#get some game info
	filename = beast.select("filename", {'gid':gid})
	game = beast.select("name", {'gid':gid})
	instructions = beast.select("notes", {'gid':gid})

	#build the header
	extrascripts = ['games/%s.css' % filename, 'games/%s_constants.js' % filename, 'games/%s.js' % filename]
	arg = scripts + extrascripts 
	output = gp_template.get_def("head").render(title=game, scripts=arg)

	info_content = []

	header = gp_template.get_def("header").render(user="")

	#game info div
	controls = beast.select("controls", {'gid':gid})
	info_content.append(['Controls', controls])
	
	#links
	#links="<a href='../index.html'>Your Home Page</a><br/>"
	#info_content.append(['', links])

	#instructions button
	info_content.append(['', "<br/><button id='insButton' type='button'>Show instructions</button>"])

	#instructions
	info_content.append(['Instructions', instructions])

	info = ""
	for ic in info_content:	
		info += gp_template.get_def("title_div").render(ID=ic[0].lower(), title=ic[0], data=ic[1], title_lvl=3)

	info_div = gp_template.get_def("title_div").render(ID="left", title=game, data=info, title_lvl=2)

	game_window = gp_template.get_def("game_window").render()

	footer = gp_template.get_def("footer").render()

	#add it to the body
	output += gp_template.get_def("body").render(data=header + info_div + game_window + footer)
	
	#open a file and write the contents to the right place
	url = beast.select("url", {'gid':gid})
	f = open(os.path.join(root, url), "w")
	f.write("<html>")
	f.write(output)
	f.write("</html>")
	f.close()
