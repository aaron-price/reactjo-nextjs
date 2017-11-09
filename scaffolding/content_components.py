import os, subprocess

from inflection import pluralize

from helpers.config_manager import get_cfg
from helpers.file_manager import file_manager as f
from helpers.worklist import worklist as wl
from helpers.path_manager import mkdir
from helpers.compose import quote

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

    return string.replace(
        'singular_lower', title_singular.lower()).replace(
        'plural_lower', title_plural.lower()).replace(
        'plural_upper', title_plural).replace(
        'string_method', string_method).replace(
        'singular_upper', title_singular).replace(
        'const fields = []', 'const fields = [' + fields_string + ']'
    )

def scaffold_content_components():
    cfg = get_cfg()
    title = cfg['current_scaffold']['model']['title']
    need_owner = cfg['current_scaffold']['need_owner'] == 'True'
    content_plural = pluralize(title.lower())
    # Get the directory
    mkdir('$out/components/' + content_plural)
    comps = f('$out/components/' + content_plural, '$')

    # Make the files
    create_asset  = parse_content(f('$assets/components/content_plural/Create.js', 'r'))
    f(comps + '/Create.js', 'w', create_asset)

    details_asset = parse_content(f('$assets/components/content_plural/Details.js', 'r'))
    f(comps + '/Details.js', 'w', details_asset)

    list_asset    = parse_content(f('$assets/components/content_plural/List.js', 'r'))
    f(comps + '/List.js', 'w', list_asset)

    update_asset  = parse_content(f('$assets/components/content_plural/Update.js', 'r'))
    f(comps + '/Update.js', 'w', update_asset)

    delete_asset  = parse_content(f('$assets/components/content_plural/Delete.js', 'r'))
    f(comps + '/Delete.js', 'w', delete_asset)
