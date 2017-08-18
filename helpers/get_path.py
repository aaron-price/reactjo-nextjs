from helpers.config_manipulation import get_cfg

# Organization:
# assuming project is named "www", and it has one app named "foo"
# Some functions don't need arguments, but if they do...
# First argument = app name. Even if that's the project name
# Second argument = the path to append to it
# Here's the default structure and how to return a string path for ANYTHING.
# Don't use leading or trailing commas, they're already taken care of.
#
# / 									super_root_path()
# 	 /venv								super_root_path('venv')
# 	 /reactjorc 						reactjorc_path()
# 		/config.json 					config_path()
# 		/extensions 					extensions_path()
# 			/react-django				react_django_path()
# 				/assets/ 				react_django_assets()
# 				/helpers/ 				react_django_path('helpers')
# 				/entry.py 				react_django_path('entry.py')
# 	/www 								root_path() OR app_path('www')
# 		/manage.py						manage_py_path()
# 		/package.json					package_json_path()
# 		/webpack.config.js				webpack_config_path()
# 		/.babelrc  						babelrc_path()
# 		/Procfile 						procfile_path()
# 		/requirements.txt				requirements_path()
# 		/www							root_app_path()
# 			settings.py 				settings_path()
# 			/views.py 					views_path('www')
# 			/urls.py 					urls_path('www')
# 			/tests.py 					tests_path('www')
# 			/templates 					templates_path('www')
#				/www					templates_path('www', 'www')
# 					/home.html 			templates_path('www', 'www/home.html')
# 					/react 				react_path('www')
#						/components 	components_path('www')
# 						/containers 	containers_path('www')
# 							/Home.js 	containers_path('www', 'Home.js')
# 		/foo 							app_path('foo')
# 			/views.py 					views_path('foo')
# 			/urls.py 					urls_path('foo')
# 			/tests.py 					tests_path('foo')
# 			/templates 					templates_path('foo')
#				/foo					templates_path('foo', 'foo')
# 					/home.html 			templates_path('foo', 'home.html')
# 					/react 				react_path('foo')
#						/components 	components_path('foo')
# 						/containers 	containers_path('foo')
# 							/Home.js 	containers_path('foo', 'Home.js')


# ROOT
def root_path():
	return get_cfg()['paths']['root']

# REACTJORC
def reactjorc_path(x, f = ''):
	return get_cfg()['paths']['reactjorc'] + '/' + f

def rc_path(x, f = ''):
	return reactjorc_path(x,f)

def extensions_path(x, f = ''):
	return get_cfg()['paths']['reactjorc'] + '/extensions/' + x + '/' + f

def ext_path(x, f = ''):
	return extensions_path(x,f)
#f(p.assets_path() + 'templates/home.html', 'f', {'title': name})

def assets_path(x = 'react-django', f = ''):
	return ext_path(x) + 'assets/' + f


# PROJECT
def project_path(f = ''):
	return get_cfg()['paths']['project'] + '/' + f

def prj_path(f = ''):
	return project_path(f)

def settings_path():
	return get_cfg()['paths']['settings']

# APP
def app_path(a, f = ''):
	return prj_path() + a + '/' + f

def templates_path(a, f = ''):
	return app_path(a) + 'templates/' + f

def tpl_path(a,f = ''):
	return templates_path(a,f)

def react_path(a, f = ''):
	return templates_path(a) + 'react/' + f

def components_path(a, f = ''):
	return react_path(a) + 'components/' + f

def containers_path(a, f = ''):
	return react_path(a) + 'containers/' + f

def urls_path(a):
	return app_path(a) + 'urls.py'

def views_path(a):
	return app_path(a) + 'views.py'


# The only reason to use static would be webpack output paths... not scaffolding.
# Don't do that. They need to be relative paths.
# def static_path(a, f = ''): pass

def webpack_path():
	return project_path('webpack.config.js')

def package_json_path():
	return project_path('package.json')

def babelrc_path():
	return project_path('.babelrc')

def redux_path(f = ''):
	return project_path('redux/') + f

def store_path(f = ''):
	return redux_path('store/') + f

def actions_path(f = ''):
	return redux_path('actions/') + f

def reducers_path(f = ''):
	return redux_path('reducers/') + f
