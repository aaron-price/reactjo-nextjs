from commands.new import new
import sys

cmd = sys.argv[1]
if cmd in ['new']:
	new()