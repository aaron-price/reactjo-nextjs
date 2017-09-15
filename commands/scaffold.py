import os, subprocess

from inflection import pluralize

from helpers.config_manager import get_cfg
from helpers.ui import boolean_input
from helpers.file_manager import file_manager as f

def quote(string):
    return "'" + string + "'"

def parse_content(string):
    cfg = get_cfg()
    title = cfg['current_scaffold']['model']['title']
    title_singular = title.capitalize()
    title_plural = pluralize(title.capitalize())
    if '__str__' in cfg['current_scaffold']['model']:
        string_method = cfg['current_scaffold']['model']['__str__']
    else:
        string_method = 'pk'

    all_fields = cfg['current_scaffold']['model']['fields']
    all_titles = [quote(field['title']) for field in all_fields]
    fields_string = ', '.join(all_titles)

    return f('$assets/pages/content_list.js', 'r').replace(
        'singular_lower', title_singular.lower()).replace(
        'plural_lower', title_plural.lower()).replace(
        'plural_upper', title_plural).replace(
        'string_method', string_method).replace(
        'singular_upper', title_singular).replace(
        'const fields = []', 'const fields = [' + fields_string + ']'
        )

def scaffold_list_page():
    cfg = get_cfg()
    title = cfg['current_scaffold']['model']['title']
    title_plural = pluralize(title.lower())
    list_page = parse_content(f('$assets/pages/content_list.js', 'r'))
    f('$pages/' + title_plural + '.js', 'w', list_page)
    print('Built the list page!')

    # Add content type to server.js
    data = {
        'target': ['const content_types'],
        'content': quote(title.lower()) + ','
    }
    f('$out/server.js', 'a', data)

def scaffold_details_page():
    cfg = get_cfg()
    title = cfg['current_scaffold']['model']['title']
    title_singular = title.capitalize()
    details_page = parse_content(f('$assets/pages/content_details.js', 'r'))

    f('$pages/' + title_singular + '.js', 'w', details_page)
    print('Built the details page!')

def scaffold_menu_item():
    cfg = get_cfg()
    title = cfg['current_scaffold']['model']['title']
    title_plural = pluralize(title.capitalize())
    data = {
        'target': ['const content_types'],
        'content': f"\n    '{title_plural}',"
    }
    f('$out/components/Navbar.js', 'a', data)

def scaffold():
    if boolean_input('Do you need a list page?', 'y'):
        scaffold_list_page()
        scaffold_menu_item()
    if boolean_input('Do you need a details page?', 'y'):
        scaffold_details_page()
