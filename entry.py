import sys, os, subprocess

from commands.new import new
from commands.content import content
from helpers.file_manager import file_manager as f

cmd = sys.argv[1]
if cmd in ['n', 'new']:
	new()
if cmd in ['c', 'content']:
	content()
