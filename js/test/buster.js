var config = module.exports;

config["My tests"] = {
    env: "browser",        // or "node"
    rootPath: "../",
    libs: [
         "lib/underscore-min.js",
         "lib/*.js"
    ],
    sources: [
        "src/*.js",  
    ],
    tests: [
        "test/*-test.js"
    ]
};

