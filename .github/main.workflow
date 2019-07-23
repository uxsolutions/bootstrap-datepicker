workflow "lint, test" {
  on = "push"
  resolves = ["lint", "test"]
}

action "install" {
  uses = "actions/npm@v2.0.0"
  args = ["install", "--unsafe-perm"]
}

action "lint" {
  needs = "install"
  uses = "actions/npm@v2.0.0"
  args = ["--unsafe-perm", "run", "lint"]
}

action "test" {
  needs = "install"
  uses = "actions/npm@v2.0.0"
  args = ["--unsafe-perm", "test"]
}
