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

    // semantic release config file name
    const releasercFile = '.releaserc';

    // repository workspace where the action is used
    const workSPace = process.env.GITHUB_WORKSPACE || '';

    console.log(`Hello ${nameToGreet}!`);
    console.log(
      JSON.stringify(process.env, undefined, 2),
      workSPace,
      __dirname,
    );
    const releaserc = fs.readFileSync(path.join(workSPace, releasercFile), {
      encoding: 'utf8',
    });
    // const time = new Date().toTimeString();
    // core.setOutput('time', time);
    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2);
    // console.log(`The event payload: ${payload}`);

    if (releaserc) {
      const jsonReleaserc = JSON.parse(releaserc);

      await exec.exec('npm', ['install', '-g', 'semantic-release']);

      if (jsonReleaserc.plugins) {
        const defaultPlugins = new Set([
          '@semantic-release/commit-analyzer',
          '@semantic-release/release-notes-generator',
          '@semantic-release/npm',
          '@semantic-release/github',
        ]);
        const installPlugins = jsonReleaserc.plugins.flat().filter(
          (plugin: any) =>
            // eslint-disable-next-line implicit-arrow-linebreak
            typeof plugin === 'string' && !defaultPlugins.has(plugin),
        );

        await exec.exec('npm', ['install', '-g', ...installPlugins]);
      }

      await exec.exec('npx', [
        'semantic-release',
        '--dry-run=false',
        '--branches develop',
      ]);
      await exec.exec('git', ['status']);
    } else {
      core.setFailed(`file config: ${releasercFile} NOT found`);
    }
  } catch (error) {
    core.setFailed(error as Error);
  }
};

app();
