/* eslint-disable import/no-extraneous-dependencies */
import * as core from '@actions/core';
// import * as github from '@actions/github';
import * as exec from '@actions/exec';

import path from 'node:path';
import fs from 'node:fs';

const app = async () => {
  try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    /** repository workspace where the action is used */
    const workSPace = process.env.GITHUB_WORKSPACE || '';

    console.log(`Hello ${nameToGreet}!`);
    console.log(
      JSON.stringify(process.env, undefined, 2),
      workSPace,
      __dirname,
    );
    const releaserc = fs.readFileSync(path.join(workSPace, '.releaserc'), {
      encoding: 'utf8',
    });
    if (releaserc) {
      const jsonReleaserc = JSON.parse(releaserc);

      if (jsonReleaserc.plugins) {
        const defaultPlugins = new Set([
          '@semantic-release/commit-analyzer',
          '@semantic-release/release-notes-generator',
          '@semantic-release/npm',
          '@semantic-release/github',
        ]);
        const installPlugins = jsonReleaserc.plugins
          .flat()
          .filter((plugin: any) => typeof plugin === 'string' && !defaultPlugins.has(plugin));

        console.log(installPlugins);

        await installPlugins.map(async (plugin: string) => {
          await exec.exec('npm', ['install', plugin]);
        });
      }
    }
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
