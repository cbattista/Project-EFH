import databeast
import sys

try:
	name = sys.argv[1]
	pw = sys.argv[2]
except:
	raise Exception("Sorry playa I need a name and  password")

beast = databeast.dataBeast("funkyTrain", "users")

#check for existing name
exists = beast.select("uid", {'name':name})

if not exists:
	#insert the data
	beast.execute("""INSERT INTO users (name, password, currentTraining)
		VALUES ('%s', '%s', 6)
		""" % (name, pw))

	#now get the uid
	uid = beast.select("uid", {'name':name})
	print "Account created, uid = %s" % (uid)

else:
	print "Sorry, %s has already been taken, please pick again." % (name)
