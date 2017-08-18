# Start with this if you haven't already

```bash
virtualenv venv
source venv/bin/activate
pip install reactjo
```

# If you want to create a new extension 

1. Clone the template
```bash
reactjo extend
cd template
```

2. Make some changes
3. Make a new repo on github
4. Set it as the remote origin
5. Push the template to the new repo
That's it! People can now use it as a Reactjo extension.

# If you want to install a new extension into a project

1. Initialize reactjo if you haven't already
```bash
reactjo init
```

2. In reactjorc/config.json, add this to the list of extensions:

```
"https://github.com/path-to-your-repo.git"
```

3. Back in your terminal, run:
```
reactjo update
```

# Usage

```bash
reactjo new # prints "hello world"
```
