/* eslint-disable import/no-extraneous-dependencies */
import * as core from '@actions/core';
// import * as github from '@actions/github';
import * as exec from '@actions/exec';

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  // const time = new Date().toTimeString();
  // core.setOutput('time', time);
  // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2);
  // console.log(`The event payload: ${payload}`);

  exec.exec('npm', ['install', '-g', 'semantic-release']);

  console.log(JSON.stringify(process.env, undefined, 2));
} catch (error) {
  core.setFailed(error as Error);
}
