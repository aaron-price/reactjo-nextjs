{
    "plugins": [
        [
            "module-resolver", {
                "root": ["."],
                "alias": {
                    "styles": "./styles"
                },
                "cwd": "babelrc"
        }],
        [
            "wrap-in-js",
            { "extensions": ["css$", "scss$"] }
        ]
    ],
    "presets": [ "next/babel" ],
    "ignore": []
}
