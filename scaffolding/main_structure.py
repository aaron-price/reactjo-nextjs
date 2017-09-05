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

    f('$out/server.js', 'w', '$assets/server.js')
    f('$out/pages/index.js', 'w', '$assets/pages/index.js')
    f('$out/pages/profile.js', 'w', '$assets/pages/profile.js')
    f('$out/components/Login.js', 'w', '$assets/components/Login.js')
    f('$out/services/login_service.js', 'w', '$assets/services/login_service.js')
    wl('Build directories and files')

    dependencies = [
        'react',
        'react-dom',
        'next',
        'express',
        'isomorphic-fetch',
        'isomorphic-unfetch',
        'cookie-parser',
        'express-validator',
        'body-parser'
    ]

    print('Installing node dependencies. This will take a while.')
    os.chdir(f('$out', '$'))
    subprocess.run(['npm', 'install'] + dependencies)
    os.chdir(prev_path)
    wl('Installed node dependencies')
