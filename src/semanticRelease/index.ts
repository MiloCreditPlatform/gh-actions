/* eslint-disable import/no-extraneous-dependencies */
import * as core from '@actions/core';
// import * as github from '@actions/github';
import * as exec from '@actions/exec';

// import path from 'node:path';
import fs from 'node:fs';

const app = async () => {
  try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);
    console.log(JSON.stringify(process.env, undefined, 2), __dirname);
    const releaserc = fs.readFileSync('.releaserc').toJSON();
    console.log(releaserc);
    // const time = new Date().toTimeString();
    // core.setOutput('time', time);
    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2);
    // console.log(`The event payload: ${payload}`);

    await exec.exec('npm', ['install', 'semantic-release']);
    await exec.exec('npx', ['semantic-release']);
    await exec.exec('git', ['status']);
  } catch (error) {
    core.setFailed(error as Error);
  }
};

app();
