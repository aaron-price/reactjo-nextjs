import os, subprocess

from inflection import pluralize

from helpers.config_manager import get_cfg
from helpers.ui import boolean_input
from helpers.file_manager import file_manager as f
from helpers.worklist import worklist as wl
from scaffolding.content_pages import scaffold_list_page, scaffold_details_page
from scaffolding.permissions import new_permissionset
from scaffolding.content_components import scaffold_content_components
def scaffold_menu_item():
    cfg = get_cfg()
    title = cfg['current_scaffold']['model']['title']
    title_plural = pluralize(title.capitalize())

    st = "import { list_type_permission } from '../services/permissions.js'\n"
    f('$out/components/Navbar.js', 'p', st.replace('type', title.lower()))

    st = f"\n    {title: '{title_plural}', permissions: list_type_permission},"
    data = {
        'target': ['const content_types'],
        'content': st
    }
    f('$out/components/Navbar.js', 'a', data)

    wl(f'Added {title} menu item')

def content():
    new_permissionset()

    if boolean_input('Do you need frontend components?', 'y'):
        scaffold_list_page()
        scaffold_menu_item()
        scaffold_details_page()
        scaffold_content_components()
