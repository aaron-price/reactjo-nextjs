from helpers.path_manager import mkdir
from helpers.file_manager import file_manager as f
from helpers.worklist import worklist as wl
import os, subprocess
import string
import random
def id_generator():
    signature = ''.join(random.choice(string.hexdigits) for _ in range(16))
    return "'{signature}'"

def build_structure():
    prev_path = os.getcwd()

    # directories
    mkdir('$out')
    mkdir('$out/components')
    mkdir('$out/pages')
    mkdir('$out/redux')
    mkdir('$out/services')
    mkdir('$out/styles')

    # Component assets
    f('$out/components/Head.js', 'w', '$assets/components/Head.js')
    f('$out/components/Navbar.js', 'w', '$assets/components/Navbar.js')

    # Misc assets
    f('$out/package.json', 'w', '$assets/package.js')

    server = f('$assets/server.js', 'r').replace('random_string', id_generator())
    f('$out/server.js', 'w', server)

    # Pages assets
    f('$out/pages/index.js', 'w', '$assets/pages/index.js')
    f('$out/pages/login.js', 'w', '$assets/pages/login.js')
    f('$out/pages/signup.js', 'w', '$assets/pages/signup.js')
    f('$out/pages/user.js', 'w', '$assets/pages/user.js')
    f('$out/pages/users.js', 'w', '$assets/pages/users.js')

    # Redux assets
    # @TODO

    # Services assets
    f('$out/services/login_service.js', 'w', '$assets/services/login_service.js')
    f('$out/services/signup_service.js', 'w', '$assets/services/signup_service.js')

    # Style assets
    f('$out/styles/styles.js', 'w', '$assets/styles/styles.js')
    wl('Build directories and files')

    print('Installing node dependencies. This will take a while.')
    os.chdir(f('$out', '$'))
    subprocess.run(['npm', 'install'])
    os.chdir(prev_path)
    wl('Installed node dependencies')
