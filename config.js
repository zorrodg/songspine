System.config({
  "paths": {
    "*": "*.js",
    "songspine/*": "lib/*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "lodash": "npm:lodash@3.0.0",
    "github:jspm/nodelibs-process@0.1.0": {
      "process": "npm:process@0.10.0"
    },
    "npm:lodash@3.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.0"
    }
  }
});

