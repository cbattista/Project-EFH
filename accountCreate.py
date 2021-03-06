import databeast
import sys
import cherrypy
from mako_defs import gp_template
import dbinfo

"""
try:
	name = sys.argv[1]
	pw = sys.argv[2]
except:
	raise Exception("Sorry playa I need a name and  password")
"""

class userAdmin:
	@cherrypy.expose 
	def index(self):
		self.beast = databeast.dataBeast("funkyTrain", "users")
		create = gp_template.get_def("account_create").render()
		reset = gp_template.get_def("account_reset").render()
		adjust = gp_template.get_def("account_adjust").render()
		return create + reset + adjust

	@cherrypy.expose
	def submit(self, name, pw, email):
		name = str(name)
		pw = str(pw)
		email = str(email)
		beast = self.beast
		#check for existing name
		exists = beast.select("uid", {'name':name})

		if not exists:
			#insert the data
			beast.execute("""INSERT INTO users (name, password, currentTraining, email)
				VALUES ('%s', '%s', 6, '%s')
				""" % (name, pw, email))

			#now get the uid
			uid = beast.select("uid", {'name':name})
			return "Account created, uid = %s" % (uid)

		else:
			return "Sorry, %s has already been taken, please pick again." % (name)

	@cherrypy.expose
	def reset(self, name):
		beast = self.beast
		name = str(name)
		uid = beast.select("uid", {'name':name})
		if uid:
			beast.execute("""UPDATE users SET start = NULL WHERE uid = %s""" % uid)
			beast.execute("""DELETE FROM completed WHERE sid = %s""" % uid)
			return "Account reset, uid = %s" % (uid)
		else:
			return "Sorry, couldn't find a user called %s" % name
	@cherrypy.expose
	def adjust(self, name, start):
		beast = self.beast
		name = str(name)
		start = str(start)
		uid = beast.select("uid", {'name':name})
		if uid:
			beast.execute("""UPDATE users SET start = '%s' WHERE uid = %s """ % (start, uid))
			return "Changed start date of %s to %s" % (name, start)
		else:
			return "Sorry, couldn't find a user called %s" % name 


#createAccount(name, pw)

cherrypy.config.update({'server.socket_host': dbinfo.host})
cherrypy.config.update({'server.socket_port':8585,})
cherrypy.quickstart(userAdmin())
