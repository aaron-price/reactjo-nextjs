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
        'create_permission', perm['post'] + '(user, obj)'.lower()
    ).replace(
        'list_permission', perm['list'] + '(user, obj)'.lower()
    ).replace(
        'details_permission', perm['details'] + '(user, obj)'.lower()
    ).replace(
        'update_permission', perm['update'] + '(user, obj)'.lower()
    ).replace(
        'delete_permission', perm['delete'] + '(user, obj)'.lower()
    )
    f('$out/services/permissions.js', 'a', new_permissions)
