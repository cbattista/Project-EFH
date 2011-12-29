from databeast import *
import output
import cherrypy
import defs

class CheckCompleted:
	@cherrypy.expose
	def index(self):
		beast = dataBeast("funkyTrain", "completed")

		sids = []
		for sid in beast.distinct("sid"):
			expected = []
			for phase in ["pre", "training", "post"]:
				gameKey = "%sGames" % phase
				#get a list of the training games they should have played
				sql = "SELECT %s, %s from training WHERE tpid = (SELECT currentTraining FROM users WHERE uid = %s)" % (phase, gameKey, sid)
				result = beast.execute(sql)
				days = result[0][0]
				games = result[0][1].split(',')
				if type(days) == str:
					days = days.split(',')
				else:
					days = [days]

				for d in days:
					for g in games:
						expected.append([long(g), long(d)])

			expected.sort()

			observed = beast.select("gid, day", {'sid':sid})
			observed.sort()

			if observed == expected:
				sids.append(sid)

		t = defs.table

		return t.get_def("list_table").render(data=sids, title="Participants who've completed the study")

#print CheckCompleted.
cherrypy.quickstart(CheckCompleted())
