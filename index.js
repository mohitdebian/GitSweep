#!/usr/bin/env node

const axios = require("axios");
const inquirer = require("inquirer");

const GITHUB_API = "https://api.github.com";

async function getToken() {
  const { token } = await inquirer.prompt([
    {
      type: "password",
      name: "token",
      message: "Enter your GitHub Personal Access Token:",
      mask: "*",
    },
  ]);

  return token;
}

async function fetchRepos(token) {
  try {
    const res = await axios.get(`${GITHUB_API}/user/repos`, {
      headers: {
        Authorization: `token ${token}`,
      },
      params: {
        per_page: 100,
      },
    });

    return res.data;
  } catch (err) {
    console.error("Failed to fetch repositories.");
    process.exit(1);
  }
}

async function selectRepos(repos) {
  const choices = repos.map((repo, index) => ({
    name: `${index + 1}. ${repo.full_name}`,
    value: repo,
  }));

  const { selected } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "selected",
      message: "Select repositories to delete:",
      choices,
      pageSize: 20,
    },
  ]);

  return selected;
}

async function confirmDeletion(repos) {
  console.log("\nYou are about to delete the following repositories:\n");

  repos.forEach((repo) => {
    console.log(`- ${repo.full_name}`);
  });

  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: "Are you absolutely sure?",
      default: false,
    },
  ]);

  return confirm;
}

async function deleteRepos(token, repos) {
  console.log("\nDeleting repositories...\n");

  for (let i = 0; i < repos.length; i++) {
    const repo = repos[i];

    try {
      await axios.delete(`${GITHUB_API}/repos/${repo.full_name}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      console.log(`✔ Deleted: ${repo.full_name}`);
    } catch (err) {
      console.log(`✖ Failed: ${repo.full_name}`);
    }
  }

  console.log("\nDone.");
}

async function main() {
  console.log("\nGitHub GitSweep\n");

  const token = await getToken();

  console.log("\nFetching repositories...\n");

  const repos = await fetchRepos(token);

  if (!repos.length) {
    console.log("No repositories found.");
    return;
  }

  const selected = await selectRepos(repos);

  if (!selected.length) {
    console.log("No repositories selected.");
    return;
  }

  const confirmed = await confirmDeletion(selected);

  if (!confirmed) {
    console.log("Operation cancelled.");
    return;
  }

  await deleteRepos(token, selected);
}

main();
