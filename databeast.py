import MySQLdb

class dataBeast:

	#init method that runs when databeast object is created
	# create a connection to a database and assign a table in the db to it
	def __init__(self, db, table, host="localhost", user="root", password = ""):
		if password:
			self.conn = MySQLdb.connect(host=host, user=user, passwd = password, db=db)
		else:
			self.conn = MySQLdb.connect(host=host, user=user, db=db)
		self.cursor = self.conn.cursor()
		self.table = table
	
	#Setter method to change the table originally attributed to your databeast object
	def setTable(self, table):
		self.table = table

	#If no extra options are givin (query arg), sends a basic query to the db and returns an array with your results
	#if a more detailed query, add an array of key-value pairs as an arg( exp: { 'gid':2})
	#Returns a matrix form array
	def execute(self, sql, query={}):
		if query:
			q = " WHERE " 
			for k in query.keys():
				q += "%s = %s AND" % (k, query[k])

			q = q.rstrip(" AND")
			sql += q

		sql += ";"

		self.cursor.execute(sql)
		row_set = self.cursor.fetchall()
		return row_set
	#Execute a query from your attributed table. Returns a standard array
	def distinct(self, field, query = {}):
		sql = "SELECT DISTINCT %s FROM %s" % (field, self.table)
		result = self.execute(sql)

		rows = []

		for row in result:
			rows.append(row[0])

		return rows
		
	#Takes output from execute() and turns it into a standard array
	def select(self, field, query = {}):
		sql = "SELECT %s FROM %s" % (field, self.table)
		result = self.execute(sql, query)
		output = []
		for row in result:
			line = []
			for item in row:
				line.append(item)

			output.append(line)
		
		#we grab the output since the rationale is that if a list has length 1, it does not need to be a list
		if len(output) == 1:
			output = output[0]
			if len(output) == 1:
				output = output[0]

		return output

