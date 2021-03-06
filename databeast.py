import MySQLdb
import dbinfo

#so obvious it needs to comments

class dataBeast:
	def __init__(self, db, table, host="localhost", user=dbinfo.name, password = dbinfo.password):
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
		result = self.execute(sql, query)

		rows = []
		try:
			for row in result:
				rows.append(row[0])
		except:
			rows = result

		return rows
	
	def select(self, field, query = {}, sort= "", limit=None):
		sql = "SELECT %s FROM %s" % (field, self.table)
		print sql
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
					q += "%s = '%s' AND " % (k, query[k])
				else:
					q += "%s = %s AND " % (k, str(query[k]))

			q = q.rstrip(" AND")
			sql += q

		if sort:
			sql += " ORDER BY %s" % sort

		if limit:
			sql += " LIMIT %s" % limit

		sql += ";"

		print sql

		self.cursor.execute(sql)
		output = self.cursor.fetchall()

		if len(output) == 1:
			output = output[0]
			if len(output) == 1:
				output = output[0]
		
		return output


