import os, subprocess

from inflection import pluralize

from helpers.config_manager import get_cfg
from helpers.ui import boolean_input
from helpers.file_manager import file_manager as f
from scaffolding.content_pages import scaffold_list_page, scaffold_details_page

def scaffold_menu_item():
    cfg = get_cfg()
    title = cfg['current_scaffold']['model']['title']
    title_plural = pluralize(title.capitalize())
    data = {
        'target': ['const content_types'],
        'content': f"\n    '{title_plural}',"
    }
    f('$out/components/Navbar.js', 'a', data)

def content():
    if boolean_input('Do you need frontend components?', 'y'):
        scaffold_list_page()
        scaffold_menu_item()
        scaffold_details_page()
