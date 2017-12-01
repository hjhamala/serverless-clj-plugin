'use strict';

const bluebird  = require('bluebird');
const _         = require('lodash');

const exec   = bluebird.promisify(require('child_process').exec,
    {multiArgs: true});

function cljsLambdaBuild(serverless, opts) {
    let cmd;
    serverless.cli.log(serverless.service.custom.test);
    let test =  (serverless.service.custom.test  ? " do test, uberjar" : "uberjar");
    cmd = (`lein update-in :uberjar-name str "${serverless.service.service}.jar" -- ` + test)
    serverless.cli.log(`Executing "${cmd}"`);
    return exec(cmd);
}

const createDeploymentArtifacts = bluebird.coroutine(
    function*(serverless, opts) {
        yield cljsLambdaBuild(serverless, opts);
        serverless.cli.log(`Returning artifact path ${serverless.service.__cljsArtifact}`);
        return serverless.service.__cljsArtifact;
    });

class ServerlessPlugin {
    constructor(serverless, opts) {

        opts.function = (opts.f || opts.function);
        serverless.service.__cljsArtifact= `target/${serverless.service.service}.jar`;

        serverless.cli.log(`Targeting ${serverless.service.__cljsArtifact}`);

        const buildAndMerge = createDeploymentArtifacts.bind(
            null, serverless, opts);

        this.hooks = {
            [`before:package:createDeploymentArtifacts`]: buildAndMerge
        };
    }
}

module.exports = ServerlessPlugin;