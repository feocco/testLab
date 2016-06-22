import requests
import json
from jinja2 import Environment, FileSystemLoader
import tornado.ioloop
import tornado.web

# Get JSON from API URL
url = 'https://sheetsu.com/apis/v1.0/34811115b8f7'
r = requests.get(url)

# Create a list of dictionaries from JSON
json = r.json()

# Merge list of dict's into one
new_dict = {item['hostname']:item for item in json}

# Load template file templates/site.html
TEMPLATE_FILE = 'site.html'
templateLoader = FileSystemLoader( searchpath="templates/" )
templateEnv = Environment( loader=templateLoader )
template = templateEnv.get_template(TEMPLATE_FILE)

# template.render() returns a string which contains the rendered html
html_output = template.render(templateVar=new_dict,
	title="Test Lab Page")

# Handler for main page
class MainHandler(tornado.web.RequestHandler):
	def get(self):
		# Returns rendered template string to the browser request
		self.write(html_output)

# Assign handler to the server root
application = tornado.web.Application([
	(r"/", MainHandler),
	])
PORT=8884

if __name__ ==  "__main__":
	# Setup the server
	application.listen(PORT)
	tornado.ioloop.IOLoop.instance().start()