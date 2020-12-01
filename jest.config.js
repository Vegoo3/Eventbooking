module.exports = {
    globals: {
        NODE_ENV: "test"
    },
    moduleNameMapper: {
        "@app": "<rootDir>/index.js",
        "^@validation(.*)$": "<rootDir>/system/validation$1",
        "^@validation(.*)$": "<rootDir>/system/validation/index.js",
        "^@db":"<rootDir>/db/db.js"
    }
}