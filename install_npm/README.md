# Install packages
Install node package using `npm`

example:
```yml
name: Install

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: MiloCreditPlatform/gh-actions/install_npm@main
        with:
          omit_install: Boolean
          omit_node_modules: Boolean
```
