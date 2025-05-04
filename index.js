const core = require('@actions/core');
const github = require('@actions/github');
const fetch = require('node-fetch');

async function run() {
    try {
        // Inputs
        const apiKey = core.getInput('api_key');
        const serviceUrl = "TODO";

        const context = github.context;
        const repo = `${context.repo.owner}/${context.repo.repo}`;

        const pr = context.payload.pull_request || {};
        const base = pr.base?.sha;
        const head = pr.head?.sha;
        const pr_number = pr.number;

        if (!base) {
            throw new Error('Missing base SHA from pull request.');
        }
        if (!head) {
            throw new Error('Missing head SHA from pull request.');
        }
        if (!pr_number) {
            throw new Error('Missing pull request number.');
        }
        if (!repo) {
            throw new Error('Missing repository information.');
        }

        // Construct request
        const body = {
            repo,
            base,
            head,
            pr_number
        };

        const response = await fetch(`${serviceUrl}/api/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch tests: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        const tests = JSON.stringify(data.tests || {});

        core.setOutput('tests', tests);
        core.info(`Selected tests: ${tests}`);
    } catch (err) {
        core.setFailed(err.message);
    }
}

run();