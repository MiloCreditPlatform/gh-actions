import * as core from '@actions/core';
import * as github from '@actions/github';

try {
  const { context } = github;
  const message: string = core.getInput('message');
  const pullRequest: number = context.payload.pull_request?.number || 0;

  /** if the pull request number doesn't exits, it'll returns an error */
  if (pullRequest === 0) {
    const error = 'pull request number is not valid';
    core.setFailed(error);
    throw new Error(error);
  }

  console.log('message', message, pullRequest);
  const payload = JSON.stringify(context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error as Error);
}
