from helpers.path_manager import mkdir
from helpers.file_manager import file_manager as f
from helpers.worklist import worklist as wl
import os, subprocess

def build_structure():
    mkdir('$out')
    mkdir('$out/components')
    mkdir('$out/pages')
    mkdir('$out/services')
    mkdir('$out/redux')

    prev_path = os.getcwd()
    os.chdir(f('$out', '$'))
    subprocess.run(['npm', 'init', '-y'])
    os.chdir(prev_path)

    # Component assets
    f('$out/components/Header.js', 'w', '$assets/components/Header.js')
    f('$out/components/Layout.js', 'w', '$assets/components/Layout.js')

    # Pages assets
    f('$out/pages/index.js', 'w', '$assets/pages/index.js')
    f('$out/pages/users.js', 'w', '$assets/pages/users.js')
    f('$out/pages/user.js', 'w', '$assets/pages/user.js')
    f('$out/pages/login.js', 'w', '$assets/pages/login.js')

    # Redux assets

    # Services assets
    f('$out/services/login_service.js', 'w', '$assets/services/login_service.js')

    # Misc assets
    f('$out/server.js', 'w', '$assets/server.js')
    f('$out/package.json', 'w', '$assets/package.js')
    wl('Build directories and files')

    print('Installing node dependencies. This will take a while.')
    os.chdir(f('$out', '$'))
    subprocess.run(['npm', 'install'])
    os.chdir(prev_path)
    wl('Installed node dependencies')
