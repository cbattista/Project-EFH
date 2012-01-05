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
	
	def select(self, field, query = {}, sort= "", limit=None):
		sql = "SELECT %s FROM %s" % (field, self.table)
		result = self.execute(sql, query, sort, limit)
		return result

	def update(self, field, value, query={}):
		sql = "UPDATE %s SET %s = %s" % (self.table, field, value)
		result = self.execute(sql, query)
		return result

	def execute(self, sql, query={}, sort="", limit=None):
		if query:
			q = " WHERE " 
			for k in query.keys():
				if type(query[k]) == str:
					q += "%s = '%s' AND" % (k, query[k])
				else:
					q += "%s = %s AND" % (k, str(query[k]))

			q = q.rstrip(" AND")
			sql += q

		if sort:
			sql += " ORDER BY %s" % sort

		if limit:
			sql += " LIMIT %s" % limit

		sql += ";"

		self.cursor.execute(sql)
		output = self.cursor.fetchall()

		if len(output) == 1:
			output = output[0]
			if len(output) == 1:
				output = output[0]
		
		return output

=======
>>>>>>> efacaaaf80017037ade1d46c97d7a436817ffd6b
