from helpers.file_manager import file_manager as f
from helpers.config_manager import get_cfg, set_cfg
import os
import shutil
config_asset_path = os.path.join(os.getcwd(), 'tests/assets/config.js')
reactjorc_path = os.path.join(os.getcwd(), 'reactjorc')
config_destination_path = os.path.join(os.getcwd(), 'reactjorc/config.json')

def setup_config():
	src = f(config_asset_path, 'r')
	target = config_destination_path
	if not os.path.isdir(reactjorc_path):
		os.mkdir(reactjorc_path)
	f(target, 'w', src)
	cfg = get_cfg()
	super_root = os.getcwd()
	project_name = 'www'

	cfg['paths']['super_root'] = super_root
	cfg['paths']['project_root'] = os.path.join(super_root, project_name)

	set_cfg(cfg)

def teardown_config():
	shutil.rmtree(reactjorc_path)