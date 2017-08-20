import os
import subprocess
from helpers.path_manager import path_manager as p

def npm(args):
	os.chdir(p('package.json'))
	subprocess.call(['npm'] + args)

def manage(args):
	os.chdir(p('manage.py'))
	subprocess.call(['python', 'manage.py'] + args)