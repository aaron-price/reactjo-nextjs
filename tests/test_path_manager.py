from helpers.path_manager import path_manager as p
from tests.config_mock import setup_config, teardown_config
import os

def test_paths():
	# SUPER ROOT
	expected = os.getcwd()
	actual = p('super_root')
	assert(expected == actual)

	# REACTJORC
	expected = os.getcwd() + '/reactjorc'
	actual = p('reactjorc')
	assert(expected == actual)

	expected = os.getcwd() + '/reactjorc/config.json'
	actual = p('config')
	assert(expected == actual)

	expected = os.getcwd() + '/reactjorc/extensions'
	actual = p('extensions')
	assert(expected == actual)

	expected = os.getcwd() + '/reactjorc/extensions/react-django'
	actual = p('extensions','react-django')
	assert(expected == actual)

	expected = os.getcwd() + '/reactjorc/extensions/react-django/assets'
	actual = p('assets')
	assert(expected == actual)

	expected = os.getcwd() + '/reactjorc/extensions/react-django/helpers'
	actual = p('helpers')
	assert(expected == actual)

	# PROJECT ROOT
	expected = os.getcwd() + '/www'
	actual = p('root')
	assert(expected == actual)

	expected = os.getcwd() + '/www/manage.py'
	actual = p('manage.py')
	assert(expected == actual)

	expected = os.getcwd() + '/www/package.json'
	actual = p('package.json')
	assert(expected == actual)

	expected = os.getcwd() + '/www/webpack.config.js'
	actual = p('webpack')
	assert(expected == actual)

	expected = os.getcwd() + '/www/.babelrc'
	actual = p('babel')
	assert(expected == actual)

	expected = os.getcwd() + '/www/Procfile'
	actual = p('procfile')
	assert(expected == actual)

	expected = os.getcwd() + '/www/requirements.txt'
	actual = p('requirements')
	assert(expected == actual)

	expected = os.getcwd() + '/www/requirements.txt'
	actual = p('requirements')
	assert(expected == actual)

	expected = os.getcwd() + '/www/www'
	actual = p('app', 'www')
	assert(expected == actual)

	expected = os.getcwd() + '/www/www/settings.py'
	actual = p('settings')
	assert(expected == actual)

	expected = os.getcwd() + '/www/www/views.py'
	actual = p('views', 'www')
	assert(expected == actual)

	expected = os.getcwd() + '/www/www/urls.py'
	actual = p('urls', 'www')
	assert(expected == actual)

	expected = os.getcwd() + '/www/www/tests.py'
	actual = p('tests', 'www')
	assert(expected == actual)

	expected = os.getcwd() + '/www/www/templates'
	actual = p('templates', 'www')
	assert(expected == actual)

	expected = os.getcwd() + '/www/www/templates/www'
	actual = p('templates', 'www') + '/www'
	assert(expected == actual)

	expected = os.getcwd() + '/www/www/templates/www/home.html'
	actual = p('home.html', 'www')
	assert(expected == actual)

	expected = os.getcwd() + '/www/www/templates/www/react'
	actual = p('react', 'www')
	assert(expected == actual)

	expected = os.getcwd() + '/www/www/templates/www/react/components'
	actual = p('components', 'www')
	assert(expected == actual)

	expected = os.getcwd() + '/www/www/templates/www/react/containers'
	actual = p('containers', 'www')
	assert(expected == actual)

	expected = os.getcwd() + '/www/www/templates/www/react/containers/Home.js'
	actual = p('Home.js', 'www')
	assert(expected == actual)

	print("EXPECTED", expected)
	print("ACTUAL  ", actual)