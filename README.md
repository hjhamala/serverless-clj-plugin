# serverless-clj-plugin

[![npm version](https://badge.fury.io/js/serverless-cljs-plugin.svg)](https://badge.fury.io/js/serverless-cljs-plugin)

A [Serverless](https://github.com/serverless/serverless) plugin which
uses Leiningen to package services
written in [Clojure].

This plugin simply runs either lein do test, uberjar or lein uberjar before deploying the 
package. If you do not want to run tests before uberjar it can be disabled with custom
serverless.yml option.

Easy way to make AWS Lambda compatible Clojure functions is Lambada https://github.com/uswitch/lambada.

## Installing

``` shell
npm install serverless clj-plugin
```

## Configuration

Service name and artifact name should be the same

```yaml
service: example

provider:
  name: aws
  runtime: java8

custom:
  test: true

package:
  artifact: target/example.jar


plugins:
 - serverless-clj-plugin
```

## License

Code is based on https://github.com/nervous-systems/serverless-cljs-plugin

serverless-clj-plugin is free and unencumbered public domain software. For more
information, see http://unlicense.org/ or the accompanying LICENSE
file.
