import sys, os, subprocess

from commands.new import new
from commands.build import build
from helpers.file_manager import file_manager as f

cmd = sys.argv[1]
if cmd in ['n', 'new']:
	new()
if cmd in ['b', 'build']:
	build()
