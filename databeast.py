import MySQLdb

class dataBeast:
	def __init__(self, db, table, host="localhost", user="root", password = ""):
		if password:
			self.conn = MySQLdb.connect(host=host, user=user, passwd = password, db=db)
		else:
			self.conn = MySQLdb.connect(host=host, user=user, db=db)
		self.cursor = self.conn.cursor()
		self.table = table

	def setTable(self, table):
		self.table = table

	def distinct(self, field, query = {}):
		sql = "SELECT DISTINCT %s FROM %s" % (field, self.table)
		result = self.execute(sql)

		rows = []

		for row in result:
			rows.append(row[0])

		return rows
	
	def select(self, field, query = {}):
		sql = "SELECT %s FROM %s" % (field, self.table)
		result = self.execute(sql, query)
		output = []
		for row in result:
			line = []
			for item in row:
				line.append(item)

			output.append(line)
		
		#we grab the output sing the rationale that if a list has length 1, it does not need to be a list
		if len(output) == 1:
			output = output[0]
			if len(output) == 1:
				output = output[0]

		return output

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

