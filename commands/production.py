from textwrap import dedent
from helpers.ui import paint
from helpers.file_manager import file_manager as f

def production():
    print(' ')
    print(paint('FRONTEND INSTRUCTIONS:', 'green'))
    print(' ')
    print(paint(dedent("""\
        To deploy the frontend to heroku, run these commands:
        1. > cd {}

        2. > git init

        3. > git add -A

        4. > git commit -m "Initialize"

        5. > heroku login                             # Enter your login credentials

        6. > heroku create                            # Copy the URL it gives you

        7. > heroku config:set FRONTEND_URI=https://the-url-it-gave-you.herokuapp.com

        8. > heroku config:set BACKEND_URI=https://the-backend-url-from-earlier.herokuapp.com

        9. Add the frontend uri to the backend app's CORS whitelist.
            In the default django backend, this is at the bottom of settings/production.py.
            Just uncomment it and replace the URI with your own. Keep the trailing comma.

        10. > git push heroku master

        11. Redeploy the backend.
            > cd path/to/backend
            > git add -A
            > git commit -m "Update CORS WHITELIST"
            > git push heroku master

    """.format(f('$out', '$'))), 'yellow'))
