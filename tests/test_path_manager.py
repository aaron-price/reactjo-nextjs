from tests.config_mock import setup_config, teardown_config
setup_config()

from helpers.path_manager import path_manager as p
import os

def test_paths():
	# SUPER ROOT
	# Aside from super_root, there's also backend_root, and frontend_root below.
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

	expected = os.getcwd() + '/reactjorc/extensions/django'
	actual = os.path.join(p('extensions'), 'django')
	assert(expected == actual)

	expected = os.getcwd() + '/reactjorc/extensions/django/assets'
	actual = p('assets', ext_name = 'django')
	assert(expected == actual)

	expected = os.getcwd() + '/reactjorc/extensions/django/helpers'
	actual = p('helpers', ext_name = 'django')
	assert(expected == actual)

	expected = os.getcwd() + '/reactjorc/extensions/django/scaffolding'
	actual = p('scaffolding', ext_name = 'django')
	assert(expected == actual)

	# BACKEND
	expected = os.getcwd() + '/backend'
	actual = p('backend')
	assert(expected == actual)

	expected = os.getcwd() + '/backend/requirements.txt'
	actual = p('requirements')
	assert(expected == actual)

	expected = os.getcwd() + '/backend/www'
	actual = p('backend_project')
	assert(expected == actual)

	expected = os.getcwd() + '/backend/www/manage.py'
	actual = p('manage.py')
	assert(expected == actual)

	expected = os.getcwd() + '/backend/www/settings'
	actual = p('settings')
	assert(expected == actual)

	expected = os.getcwd() + '/backend/www/settings/base.py'
	actual = p('settings_base')
	assert(expected == actual)

	expected = os.getcwd() + '/backend/www/settings/development.py'
	actual = p('settings_dev')
	assert(expected == actual)

	expected = os.getcwd() + '/backend/www/settings/production.py'
	actual = p('settings_prod')
	assert(expected == actual)

	expected = os.getcwd() + '/backend/www/foo'
	actual = p('app', app_name = 'foo')
	assert(expected == actual)

	expected = os.getcwd() + '/backend/www/foo/views.py'
	actual = p('views.py', app_name = 'foo')
	assert(expected == actual)

	expected = os.getcwd() + '/backend/www/foo/admin.py'
	actual = p('admin.py', app_name = 'foo')
	assert(expected == actual)

	expected = os.getcwd() + '/backend/www/foo/models.py'
	actual = p('models.py', app_name = 'foo')
	assert(expected == actual)

	expected = os.getcwd() + '/backend/www/foo/urls.py'
	actual = p('urls.py', app_name = 'foo')
	assert(expected == actual)

	expected = os.getcwd() + '/backend/www/foo/tests.py'
	actual = p('tests.py', app_name = 'foo')
	assert(expected == actual)

	expected = os.getcwd() + '/backend/www/api/serializers.py'
	actual = p('serializers.py')
	assert(expected == actual)

	expected = os.getcwd() + '/backend/www/api/permissions.py'
	actual = p('permissions.py')
	assert(expected == actual)

	# FRONTEND
	expected = os.getcwd() + '/frontend'
	actual = p('frontend')
	assert(expected == actual)

	expected = os.getcwd() + '/frontend/webpack.config.js'
	actual = p('webpack.config.js')
	assert(expected == actual)
	#
	# expected = os.getcwd() + '/www/.babelrc'
	# actual = p('babel')
	# assert(expected == actual)
	#
	# expected = os.getcwd() + '/www/Procfile'
	# actual = p('procfile')
	# assert(expected == actual)
	#
	# expected = os.getcwd() + '/www/requirements.txt'
	# actual = p('requirements')
	# assert(expected == actual)
	#
	# expected = os.getcwd() + '/www/requirements.txt'
	# actual = p('requirements')
	# assert(expected == actual)
	#
	# expected = os.getcwd() + '/www/www'
	# actual = p('app', 'www')
	# assert(expected == actual)
	#
	# expected = os.getcwd() + '/www/www/settings.py'
	# actual = p('settings')
	# assert(expected == actual)
	#
	# expected = os.getcwd() + '/www/www/views.py'
	# actual = p('views', 'www')
	# assert(expected == actual)
	#
	# expected = os.getcwd() + '/www/www/urls.py'
	# actual = p('urls', 'www')
	# assert(expected == actual)
	#
	# expected = os.getcwd() + '/www/www/tests.py'
	# actual = p('tests', 'www')
	# assert(expected == actual)
	#
	# expected = os.getcwd() + '/www/www/templates'
	# actual = p('templates', 'www')
	# assert(expected == actual)
	#
	# expected = os.getcwd() + '/www/www/templates/www'
	# actual = p('templates', 'www') + '/www'
	# assert(expected == actual)
	#
	# expected = os.getcwd() + '/www/www/templates/www/home.html'
	# actual = p('home.html', 'www')
	# assert(expected == actual)
	#
	# expected = os.getcwd() + '/www/www/templates/www/react'
	# actual = p('react', 'www')
	# assert(expected == actual)
	#
	# expected = os.getcwd() + '/www/www/templates/www/react/components'
	# actual = p('components', 'www')
	# assert(expected == actual)
	#
	# expected = os.getcwd() + '/www/www/templates/www/react/containers'
	# actual = p('containers', 'www')
	# assert(expected == actual)
	#
	# expected = os.getcwd() + '/www/www/templates/www/react/containers/Home.js'
	# actual = p('Home.js', 'www')
	# assert(expected == actual)

	teardown_config()
