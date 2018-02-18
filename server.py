from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
from os import curdir, sep
import cgi
import sqlite3
conn = sqlite3.connect('appointments.db')
c = conn.cursor()
import json

PORT = 8080

class myServer(BaseHTTPRequestHandler):

	def _get_all_appts(self):
		c.execute('select * from appointments')
		res = c.fetchall()
		_json = json.dumps(res)
		print 'This is res from _get_all_appts', res
		print 'From line 24:  ', _json
		_data = self.wfile.write(_json)
		return _data

	def do_GET(self):
		if self.path=="/":
			self.path="/index.html"
			c.executescript('drop table if exists appointments;')
			c.execute('''create table if not exists appointments (date text, time text, description text)''')
		
		if self.path=="/getallappts":
			self._get_all_appts()

		try:
			sendReply = False
			if self.path.endswith(".html"):
				mimetype='text/html'
				sendReply = True
			if self.path.endswith(".jpg"):
				mimetype='image/jpg'
				sendReply = True
			if self.path.endswith(".gif"):
				mimetype='image/gif'
				sendReply = True
			if self.path.endswith(".js"):
				mimetype='application/javascript'
				sendReply = True
			if self.path.endswith(".css"):
				mimetype='text/css'
				sendReply = True
			if sendReply == True:
				f = open(curdir + sep + self.path) 
				self.send_response(200)
				self.send_header('Content-type',mimetype)
				self.end_headers()
				self.wfile.write(f.read())
				f.close()
			return

		except IOError:
			self.send_error(404,'File Not Found: %s' % self.path)

	def do_POST(self):
		if self.path=="/send":
			form = cgi.FieldStorage(
				fp=self.rfile, 
				headers=self.headers,
				environ={'REQUEST_METHOD':'POST',
				'CONTENT_TYPE':self.headers['Content-Type'],
			})

			value = []
			for key in form.keys():
				value.append( form.getvalue(key))
				print value
			c.execute("insert into appointments values (?,?,?)", (value))
			print ('from line 74 ', form)
			print ('from line 75 ',value)
			self.send_response(200)
			self.end_headers()
			self._get_all_appts()
		return

try:
	
	server = HTTPServer(('', PORT), myServer)
	print 'Server running on port' , PORT

	server.serve_forever()

except KeyboardInterrupt:
	print 'Server stopped, goodbye!'
	server.socket.close()
	