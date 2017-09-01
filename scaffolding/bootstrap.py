from helpers.path_manager import path_manager as p
from helpers.file_manager import file_manager as f
from helpers.cli import npm

def bootstrap():
    # Build directories
    f(p('components'), 'mkdir')
    f(p('pages'), 'mkdir')
    f(p('services'), 'mkdir')
    f(p('redux'), 'mkdir')

    assets = p('assets', 'reactjo_next')
    f(p('serverjs'), 'w', assets + '/server.js')
    f(p('package_json'), 'w', assets + '/package.json')
    f(p('pages') + 'index.js', 'w', assets + '/index.js')
    f(p('services') + '/profile_requests', 'w', assets + '/server.js')

    print('Installing node dependencies. This will take a while.')
    npm(['install'])
