# Installation

Start with this if you haven't already

```bash
virtualenv venv
source venv/bin/activate
pip install reactjo
reactjo init
```

2. In reactjorc/config.json, add this to the extensions array:

```
{
    "uri": "https://github.com/aaron-price/nextjs_trial.git",
    "rc_home": "nextjs_trial",
    "branch": "master"
}
```
Note that branch is optional and defaults to master.

3. Back in your terminal, run:
```
reactjo update
```
This clones the extension into reactjorc/extensions/nextjs_trial
It will be listening for the commands listed below, in Usage.

# Usage

```bash
reactjo new # prints "hello world"
```
