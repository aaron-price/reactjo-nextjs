import os, subprocess
import string
import random

from helpers.path_manager import mkdir
from helpers.file_manager import file_manager as f
from helpers.worklist import worklist as wl
from helpers.config_manager import get_cfg

def id_generator():
    signature = ''.join(random.choice(string.hexdigits) for _ in range(32))
    return f"'{signature}'"

def build_structure():
    prev_path = os.getcwd()
    cfg = get_cfg()
    users = cfg['need_users'] == 'True'
    project_name = cfg['project_name']

    # directories
    mkdir('$out')
    mkdir('$out/components')
    if users:
        mkdir('$out/middleware')
    mkdir('$out/pages')
    mkdir('$out/services')
    mkdir('$out/styles')

    # Component assets
    f('$out/components/Head.js', 'w', '$assets/components/Head.js')
    if users:
        f('$out/components/Navbar.js', 'w', '$assets/components/Navbar_users.js')
    else:
        f('$out/components/Navbar.js', 'w', '$assets/components/Navbar.js')

    # Middleware
    if users:
        res_current_user = f('$assets/middleware/res_current_user.js', 'r').replace(
            'reactjo', project_name)
        f('$out/middleware/res_current_user.js', 'w', res_current_user)

    # Misc assets
    f('$out/package.json', 'w', '$assets/package.js')

    if users:
        server_string = f('$assets/server_users.js', 'r')
    else:
        server_string = f('$assets/server.js', 'r')

    server_string = server_string.replace(
        'random_string', id_generator()).replace(
        'reactjo', project_name)

    f('$out/server.js', 'w', server_string)

    # Pages assets
    if users:
        f('$out/pages/login.js', 'w', '$assets/pages/login.js')
        f('$out/pages/signup.js', 'w', '$assets/pages/signup.js')
        f('$out/pages/user.js', 'w', '$assets/pages/user.js')
        f('$out/pages/users.js', 'w', '$assets/pages/users.js')
        f('$out/pages/index.js', 'w', '$assets/pages/index_users.js')
    else:
        f('$out/pages/index.js', 'w', '$assets/pages/index.js')



    # Services assets
    f('$out/services/content_create.js', 'w', '$assets/services/content_create.js')
    f('$out/services/content_update.js', 'w', '$assets/services/content_update.js')
    f('$out/services/content_delete.js', 'w', '$assets/services/content_delete.js')
    f('$out/services/permissions.js', 'w', '$assets/services/permissions.js')

    if users:
        login_service = f('$assets/services/login_service.js', 'r').replace(
            'reactjo', project_name)
        f('$out/services/login_service.js', 'w', login_service)
        f('$out/services/signup_service.js', 'w', '$assets/services/signup_service.js')
        current_user_service = f('$assets/services/current_user.js', 'r').replace(
            'reactjo', project_name)
        f('$out/services/current_user.js', 'w', current_user_service)

    # Style assets
    f('$out/styles/styles.js', 'w', '$assets/styles/styles.js')
    wl('Build front end directories and files')

    print('Installing node dependencies. This will take a while.')
    os.chdir(f('$out', '$'))
    subprocess.run(['npm', 'install'])
    os.chdir(prev_path)
    wl('Installed node dependencies')
