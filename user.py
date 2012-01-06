from databeast import *
import cherrypy
from mako_defs import gp_template
import datetime

class UserApp:
	"""
	Display the user's training schedule & other messages
	"""
	@cherrypy.expose
	def user(self):
		#are we a logged in user?
		#	print cherrypy.response.cookie

		#cherrypy.response.cookie['funkyTrainUser'] = 'xian'

		cookie = cherrypy.request.cookie
		
		for name in cookie.keys():
			print name

		#output = cherrypy.response.cookie["funkyTrainUser"].value
		if cookie.has_key('funkyTrainUser'):

			#get a data connection
			beast = dataBeast("funkyTrain", "users")
			#get the game ids		

			now = datetime.date.today()
			today = now.strftime("%Y-%m-%d") 

			#get the user's name and the training program they are on
			username = cookie['funkyTrainUser'].value
			#username = "'nikki'"
			start = beast.select("start", {'name':username})
			tpid = beast.select("currentTraining", {'name':username})

			#if it's the first day the user logged in, kick the training off
			if not start:
				beast.update("start", "'%s'" % today, {'name':username})
				trainingDay = 1
				start = now
			#otherwise figure out which day of training we are on
			else:
				trainingDay = (now - start).days + 1

			output = "%s, day %s of training.<br/>" % (today, trainingDay)
		
			cherrypy.response.cookie['funkyTrainDay'] = trainingDay

			beast.setTable("training")

			pre, post, training = beast.select("pre, post, training", {'tpid': tpid})

			training = training.split(',')

			training = map(lambda x: int(x), training)
		
			tdays = [pre] + training + [post]

			#which phase are we in?
			if trainingDay == pre:
				phase = 'pre'
			elif trainingDay == post:
				phase = 'post'
			elif trainingDay in training:
				phase = 'training'
			else:
				phase = None

			schedule = [['training day', 'date']]

			for td in tdays:
				calDay = start + datetime.timedelta(days=td-1)
				schedule.append([td, calDay.strftime("%Y-%m-%d")])

			if phase:
				games = beast.select("%sGames" % phase, {'tpid':tpid})
				games = games.split(',')
				for game in games:
					url, name = beast.execute("SELECT url, name FROM games", {"gid":game}) 
					output += "<a href='%s'>%s</a><br/>" % (url, name)

			output += gp_template.get_def("table").render(title="Your training schedule", data=schedule)

		else:
			output = ":("

		return output

#print CheckCompleted.
cherrypy.config.update({'server.socket_port':8282,})
cherrypy.quickstart(UserApp())

