import * as core from '@actions/core';
import * as github from '@actions/github';

try {
  const message: string = core.getInput('message');
  console.log('message', message);
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error as Error);
}
