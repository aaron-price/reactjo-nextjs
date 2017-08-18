# Installation
Only if you haven't already:

```bash
virtualenv venv
source activate venv/bin/activate
pip install reactjo
reactjo init
```

In reactjorc/config.json, add this to the list of extensions:
```
'https://github.com/path-to-your-repo.git'
```

then in your terminal, run:
```
reactjo update
```

# Usage

```bash
reactjo new # prints "hello world"
```
