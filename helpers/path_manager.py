from helpers.config_manager import get_cfg
import os

cfg = get_cfg()
PROJECT_NAME = cfg['project_name']
EXTENSION_NAME = 'react-django'

# Organization:
# Here's the default structure and how to return a string path for ANYTHING.


# TOP LEVEL PATHS
# None of these should be version controlled
#
# / 								p('super_root')
# 	 /venv							p('super_root') + '/venv'
# 	 /reactjorc 					p('reactjorc')
#	 /backend						p('backend')
#	 /frontend						p('frontend')


# REACTJORC PATHS
# Don't put these in production, or version control
#
# /reactjorc 						p('reactjorc')
# 	/config.json 					p('config')
# 	/extensions 					p('extensions')
# 		/react-django				p('extensions', 'react-django')
# 			/assets/ 				p('assets')
# 			/helpers/ 				p('helpers')
# 			/entry.py 				p('extensions', 'react-django') + '/entry.py'

# FRONTEND PATHS
# The Node + express server that runs react and all things client side. Based on create-react-app
# 
# /frontend 						p('frontend')
#	/config 						p('fe_config')
#	/node_modules 					p('node_modules')
#	/package.json 					p('package_json')
#	/fe_public 						p('fe_public')
# 	/src 							p('fe_src')

#	/.babelrc 						p('babelrc')


# BACKEND PATHS
# The Django + gunicorn server that runs the API.
# This assumes the project is named "www", and it has one app named "foo"
#
# /backend 							p('backend')
# 	/www							p('backend_project')
# 		/manage.py					p('manage.py')
# 		/package.json				p('package.json')
# 		/webpack.config.js			p('webpack.config.js')
# 		/.babelrc  					p('.babel')
# 		/Procfile 					p('Procfile')
# 		/requirements.txt			p('requirements.txt')
# 		/www						p('app', 'www')
# 			settings.py 			p('settings.py')
# 			/views.py 				p('views', 'www')
# 			/urls.py 				p('urls', 'www')
# 			/tests.py 				p('tests', 'www')
# 		/foo 						p('app', 'foo')
# 			/views.py 				p('views','foo')
# 			/urls.py 				p('urls','foo')
# 			/tests.py 				p('tests','foo')


# SUPER ROOT
def super_root():
	return os.path.join(get_cfg()['paths']['super_root'])

# REACTJORC
def reactjorc():
	return os.path.join(super_root(), 'reactjorc')

def config():
	return os.path.join(reactjorc(), 'config.json')

def extensions():
	return os.path.join(reactjorc(), 'extensions')

def assets():
	return os.path.join(extensions() + '/' + EXTENSION_NAME, 'assets')

def helpers():
	return os.path.join(extensions() + '/' + EXTENSION_NAME, 'helpers')

# PROJECT ROOT
def project_root():
	return os.path.join(super_root(), PROJECT_NAME)

def managepy():
	return os.path.join(project_root(), 'manage.py')

def package_json():
	return os.path.join(project_root(), 'package.json')

def babel():
	return os.path.join(project_root(), '.babelrc')

def webpack():
	return os.path.join(project_root(), 'webpack.config.js')

def procfile():
	return os.path.join(project_root(), 'Procfile')

def requirements():
	return os.path.join(project_root(), 'requirements.txt')

def app(name):
	return os.path.join(project_root(), name)

def settings():
	return os.path.join(app(PROJECT_NAME), 'settings.py')

def views(name):
	return os.path.join(app(name), 'views.py')

def urls(name):
	return os.path.join(app(name), 'urls.py')

def tests(name):
	return os.path.join(app(name), 'tests.py')

def templates(name):
	return os.path.join(app(name), 'templates')

def home_html(name):
	return os.path.join(templates(name) + '/' + name, 'home.html')

def react(name):
	return os.path.join(templates(name) + '/' + name, 'react')

def components(name):
	return os.path.join(react(name), 'components')

def containers(name):
	return os.path.join(react(name), 'containers')

def home_js(name):
	return os.path.join(containers(name), 'Home.js')

def path_manager(query, modifier = ''):
	string = ''
	query = query.lower()

	if query in ['super_root', 'super']:
		string = super_root()
	if query in ['reactjorc']:
		string = reactjorc()
	if query in ['config', 'config.json','cfg','config_json']:
		string = config()
	if query in ['extensions']:
		if modifier == '':
			string = extensions()
		else:
			string = os.path.join(extensions(), modifier)
	if query in ['assets']:
		string = assets()
	if query in ['helpers']:
		string = helpers()
	if query in ['project_root', 'project', 'root']:
		string = project_root()
	if query in ['manage', 'managepy', 'manage.py']:
		string = managepy()
	if query in ['package', 'package.json', 'package_json', 'packagejson']:
		string = package_json()
	if query in ['babel', '.babelrc','babelrc']:
		string = babel()
	if query in ['webpack','webpack.config.js']:
		string = webpack()
	if query in ['procfile']:
		string = procfile()
	if query in ['requirements', 'requirements.txt']:
		string = requirements()
	if query in ['app', 'app_root']:
		string = app(modifier)
	if query in ['settings', 'settings.py']:
		string = settings()
	if query in ['views', 'views.py']:
		string = views(modifier)
	if query in ['urls', 'urls.py']:
		string = urls(modifier)
	if query in ['tests', 'tests.py']:
		string = tests(modifier)
	if query in ['templates']:
		string = templates(modifier)
	if query in ['home.html']:
		string = home_html(modifier)
	if query in ['react']:
		string = react(modifier)
	if query in ['components']:
		string = components(modifier)
	if query in ['containers']:
		string = containers(modifier)
	if query in ['home_js','home.js']:
		string = home_js(modifier)

	return string
