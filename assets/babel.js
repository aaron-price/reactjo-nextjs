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
    "ignore": ["node_modules/**"],
    "env": {
        "test": {
            "presets": [
                "next/babel",
                ["env", { "modules": "commonjs" }]
            ]
        }
    }
}
