workflow "lint, test" {
  on = "push"
  resolves = ["lint", "test"]
}

action "install" {
  uses = "actions/npm@master"
  args = ["install", "--unsafe-perm"]
}

action "lint" {
  needs = "install"
  uses = "actions/bin/sh@master"
  args = ["npx grunt lint-js"]
}

action "test" {
  needs = "install"
  uses = "actions/bin/sh@master"
  args = ["npx grunt qunit-all"]
}
