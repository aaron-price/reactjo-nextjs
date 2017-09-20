from helpers.config_manager import get_cfg
from helpers.file_manager import file_manager as f
from helpers.worklist import worklist as wl

def new_permissionset():
    cfg = get_cfg()
    perm = cfg['current_scaffold']['permissions']

    new_permissions = f('$assets/services/new_permissionset.js', 'r').replace(
        'title', cfg['current_scaffold']['model']['title'].lower()
    ).replace(
        'upper', cfg['current_scaffold']['model']['title']
    ).replace(
        'create_permission', perm['post'].lower() + '(user, obj)'
    ).replace(
        'list_permission', perm['list'].lower() + '(user, obj)'
    ).replace(
        'details_permission', perm['details'].lower() + '(user, obj)'
    ).replace(
        'update_permission', perm['update'].lower() + '(user, obj)'
    ).replace(
        'delete_permission', perm['delete'].lower() + '(user, obj)'
    )
    f('$out/services/permissions.js', 'a', new_permissions)
