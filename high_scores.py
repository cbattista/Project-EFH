from databeast import *
import cherrypy
from mako_defs import gp_template

class ScoresApp:
	"""
	Display the high scores for each game 
	1 table per game
	"""
	@cherrypy.expose
	def scores(self):
		#get a data connection
		beast = dataBeast("funkyTrain", "level")
		#get the game ids		
		gids = beast.distinct("game")

		#collect game names and the top 5 sids/top scores for each game
		tables = ""
		for gid in gids:
			name = beast.execute("SELECT name FROM games where gid = %s" % gid)
			scores = beast.select("(SELECT name from users where uid = user), score", {'game':gid}, sort="score DESC", limit=5)
			tables += gp_template.get_def("table").render(title=name, data = scores)
		
		return tables

#print CheckCompleted.
cherrypy.config.update({'server.socket_host':'97.107.137.132'})
cherrypy.config.update({'server.socket_port':8281,})
cherrypy.quickstart(ScoresApp())

