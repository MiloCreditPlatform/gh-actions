import * as core from '@actions/core';
import * as github from '@actions/github';

try {
  const { context } = github;
  const githubToken: string = core.getInput('GITHUB_TOKEN');

  /** if the github token is empty, it'll returns an error */
  if (githubToken === '') {
    throw new Error('github token is required');
  }

  const message: string = core.getInput('message');

  /** if the message is empty, it'll returns an error */
  if (message === '') {
    throw new Error('comment message is required');
  }

  const pullRequest: number = context.payload.pull_request?.number || 0;

  /** if the pull request number doesn't exits, it'll returns an error */
  if (pullRequest === 0) {
    throw new Error('pull request number is not valid');
  }

  console.log('message', message, pullRequest);
  const payload = JSON.stringify(context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error as Error);
}
