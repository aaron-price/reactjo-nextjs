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
    f('$out/pages/index.js', 'w', '$assets/index.js')
    f('$out/services/profile_requests.js', 'w', '$assets/profile_requests.js')
    wl('Build directories and files')



    dependencies = [
        'react',
        'react-dom',
        'next',
        'express',
        'isomorphic-fetch',
        'isomorphic-unfetch',
        'cookie-parser'
    ]
    print('Installing node dependencies. This will take a while.')
    os.chdir(f('$out', '$'))
    subprocess.run(['npm', 'install'] + dependencies)
    os.chdir(prev_path)
    wl('Installed node dependencies')
