import os, subprocess

from inflection import pluralize

from helpers.config_manager import get_cfg
from helpers.ui import boolean_input
from helpers.file_manager import file_manager as f

def scaffold_list_page():
    cfg = get_cfg()
    title = cfg['current_scaffold']['model']['title']
    title_singular = title.capitalize()
    title_plural = pluralize(title.capitalize())
    string_method = cfg['current_scaffold']['model']['str']

    list_page = f('$assets/pages/content_list.js', 'r').replace(
        'singular_lower', title_singular.lower()).replace(
        'plural_lower', title_plural.lower()).replace(
        'plural_upper', title_plural).replace(
        'string_method', string_method
    )

    $(f'$pages/' + title_plural.lower() + '.js', 'w', list_page)
    print('Built the list page!')

def scaffold_details_page():
    cfg = get_cfg()
    title = cfg['current_scaffold']['model']['title']
    title_upper = title.capitalize()
    title_lower = title.lower()

    details_page = f('$assets/pages/content_details.js', 'r').replace(
        'title_upper', title_upper).replace(
        'title_lower', title_lower)
    )

    $(f'$pages/' + title_singular.lower() + '.js', 'w', details_page)
    print('Built the details page!')

def scaffold():
    if boolean_input('Do you need a list page?'):
        scaffold_list_page()
    if boolean_input('Do you need a details page?'):
        scaffold_details_page()
