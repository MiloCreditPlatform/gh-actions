import * as core from '@actions/core';
// import * as github from '@actions/github';

try {
  const message = core.getInput('message');
  console.log('message', message);
} catch (error) {
  core.setFailed(error as Error);
}
