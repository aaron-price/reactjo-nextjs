from textwrap import dedent
from helpers.ui import paint
from helpers.file_manager import file_manager as f

def production():

    print(paint(dedent("""\
        To deploy the backend to heroku, run these commands:
        1. > cd {}

        2. > git init

        3. > git add -A

        4. > git commit -m "Initialize"

        5. > heroku login                             # Enter your login credentials

        6. > heroku create                            # Copy the URL it gives you

        7. > heroku config:set FRONTEND_URI=https://the-url-it-gave-you.herokuapp.com

        8. > heroku config:set BACKEND_URI=https://the-backend-url-from-earlier.herokuapp.com

        9. > Add the frontend uri to the backend app's CORS whitelist.
            In the default django backend, this is at the bottom of settings/production.py

    """.format(f('$out', '$'))), 'yellow'))
