import os, subprocess
import string
import random

from helpers.path_manager import mkdir
from helpers.file_manager import file_manager as f
from helpers.worklist import worklist as wl
from helpers.config_manager import get_cfg, set_cfg
from helpers.compose import quote
from helpers.ui import string_input

from scaffolding.permissions import new_permissionset

def id_generator():
    signature = ''.join(random.choice(string.hexdigits) for _ in range(32))
    return f"'{signature}'"

def build_structure():
    prev_path = os.getcwd()
    cfg = get_cfg()

    frontend_name = string_input('Name the frontend Node.js app', 'frontend')
    cfg['frontend_name'] = frontend_name
    set_cfg(cfg)
    project_name = cfg['project_name']

    # directories
    mkdir('$out')
    mkdir('$out/components')
    mkdir('$out/components/users')
    mkdir('$out/middleware')
    mkdir('$out/pages')
    mkdir('$out/services')
    mkdir('$out/styles')
    mkdir('$out/styles/base')
    mkdir('$out/styles/hacks')
    mkdir('$out/styles/layout')
    mkdir('$out/styles/module')
    mkdir('$out/styles/state')
    mkdir('$out/styles/vendor')

    # Component assets
    f('$out/components/Head.js', 'w', '$assets/components/Head.js')
    f('$out/components/Navbar.js', 'w', '$assets/components/Navbar.js')

    # Middleware
    f('$out/middleware/set_uri.js', 'w', '$assets/middleware/set_uri.js')
    res_current_user = f('$assets/middleware/res_current_user.js', 'r').replace(
        'reactjo', project_name)
    f('$out/middleware/res_current_user.js', 'w', res_current_user)

    # Misc assets
    f('$out/.env', 'w', '$assets/env.txt')
    f('$out/.babelrc', 'w', '$assets/babel.js')
    f('$out/.gitignore', 'w', '$assets/gitignore.txt')
    f('$out/app.json', 'w', '$assets/app.js')
    f('$out/next.config.js', 'w', '$assets/next.config.js')
    f('$out/package.json', 'w', '$assets/package.js')
    f('$out/postcss.config.js', 'w', '$assets/postcss.config.js')

    server_string = f('$assets/server.js', 'r').replace(
        'random_string', id_generator()).replace(
        'reactjo', project_name)

    f('$out/server.js', 'w', server_string)

    # Pages assets

    # Vars
    cfg = get_cfg()
    user_fields = cfg['current_scaffold']['model']['fields']
    user_titles = [field['title'] for field in user_fields]
    fields_arr = [quote(title) for title in user_titles]
    fields_arr.append(quote('password'))

    signup_page = f('$assets/pages/signup.js', 'r').replace(
        'const form_fields = []',
        'const form_fields = [' + ', '.join(fields_arr) + ']')

    user_page = f('$assets/pages/user.js', 'r').replace(
        'const fields = []',
        'const fields = [' + ', '.join(fields_arr) + ']')

    # User Pages
    f('$out/pages/login.js', 'w', '$assets/pages/login.js')
    f('$out/pages/signup.js', 'w', signup_page)
    f('$out/pages/user.js', 'w', user_page)
    f('$out/pages/users.js', 'w', '$assets/pages/users.js')
    f('$out/pages/index.js', 'w', '$assets/pages/index.js')

    # User Components
    f('$out/components/users/Delete.js', 'w', '$assets/components/users/Delete.js')
    f('$out/components/users/Details.js', 'w', '$assets/components/users/Details.js')
    f('$out/components/users/List.js', 'w', '$assets/components/users/List.js')
    f('$out/components/users/Login.js', 'w', '$assets/components/users/Login.js')
    f('$out/components/users/Signup.js', 'w', '$assets/components/users/Signup.js')
    f('$out/components/users/Update.js', 'w', '$assets/components/users/Update.js')



    # Services assets
    f('$out/services/content_create.js', 'w', '$assets/services/content_create.js')
    f('$out/services/content_update.js', 'w', '$assets/services/content_update.js')
    f('$out/services/content_delete.js', 'w', '$assets/services/content_delete.js')
    f('$out/services/permissions.js', 'w', '$assets/services/permissions.js')
    f('$out/services/get_cookie.js', 'w', '$assets/services/get_cookie.js')
    f('$out/services/get_headers.js', 'w', '$assets/services/get_headers.js')
    f('$out/services/get_uri.js', 'w', '$assets/services/get_uri.js')

    # Vars
    cfg = get_cfg()
    user_fields = cfg['current_scaffold']['model']['fields']
    user_titles = [field['title'] for field in user_fields]
    quote_titles = [quote(title) for title in user_titles]
    set_cfg(cfg)

    # User Permissions
    new_permissionset()

    # Login
    login_service = f('$assets/services/login_service.js', 'r').replace(
        'reactjo', project_name)
    f('$out/services/login_service.js', 'w', login_service)

    # Logout
    logout_service = f('$assets/services/logout_service.js', 'r').replace(
        'reactjo', project_name)
    f('$out/services/logout_service.js', 'w', logout_service)

    # Signup
    signup_service = f('$assets/services/signup_service.js', 'r').replace(
        'let fields = []',
        'let fields = [' + ', '.join(quote_titles) + ']')
    f('$out/services/signup_service.js', 'w', signup_service)

    # Check current_user
    current_user_service = f('$assets/services/current_user.js', 'r').replace(
        'reactjo', project_name)
    f('$out/services/current_user.js', 'w', current_user_service)

    # Style assets
    f('$out/styles/index.scss', 'w', '$assets/styles/index.scss')
    f('$out/styles/base/_base.scss', 'w', '$assets/styles/base/_base.scss')
    f('$out/styles/base/_functions.scss', 'w', '$assets/styles/base/_functions.scss')
    f('$out/styles/base/_mixins.scss', 'w', '$assets/styles/base/_mixins.scss')
    f('$out/styles/base/_variables.scss', 'w', '$assets/styles/base/_variables.scss')
    f('$out/styles/hacks/_shame.scss', 'w', '$assets/styles/hacks/_shame.scss')
    f('$out/styles/layout/_body.scss', 'w', '$assets/styles/layout/_body.scss')
    f('$out/styles/layout/_header.scss', 'w', '$assets/styles/layout/_header.scss')
    f('$out/styles/layout/_grid.scss', 'w', '$assets/styles/layout/_grid.scss')
    f('$out/styles/module/_navigations.scss', 'w', '$assets/styles/module/_navigations.scss')
    f('$out/styles/module/_forms.scss', 'w', '$assets/styles/module/_forms.scss')
    f('$out/styles/module/_buttons.scss', 'w', '$assets/styles/module/_buttons.scss')
    f('$out/styles/state/_state.scss', 'w', '$assets/styles/state/_state.scss')
    wl('Build front end directories and files')

    print('Installing node dependencies. This will take a while.')
    os.chdir(f('$out', '$'))

    if os.name == 'nt':
        subprocess.run('npm install', shell=True)
    else:
        subprocess.run(['npm', 'install'])

    os.chdir(prev_path)
    wl('Installed node dependencies')
