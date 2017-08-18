thing = "hello"
world = "world"

INSTALLED_APPS = [
    'foo',
    'bar'
]

single_list = [1,2,3]

multi_list = [
    1,
    2,
    3
]

multi_list_trailing = [
    1,
    2,
    3,
]

config = {
    'some': thing,
    'hello': world,
    'apps': INSTALLED_APPS,
    'more': [
        'stuff',
        {
            'blah': 42, 
            'custom': 'something custom'
        }
    ]
}

