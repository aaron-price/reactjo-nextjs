from helpers.file_manager import file_manager as f
from helpers.config_manager import get_cfg, set_cfg
import os
config_asset_path = os.path.join(os.getcwd(), 'tests/assets/config.js')
config_destination_path = os.path.join(os.getcwd(), './config.json')

def setup_config():
	src = f(config_asset_path, 'r')
	target = config_destination_path
	f(target, 'w', src)
	cfg = get_cfg()
	super_root = os.getcwd()
	project_name = 'www'

	cfg['paths']['super_root'] = super_root
	cfg['paths']['project_root'] = os.path.join(super_root, project_name)

	set_cfg(cfg)

def teardown_config():
	os.remove(config_destination_path)