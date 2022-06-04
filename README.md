# Example of Turborepo / Tailwindcss cli bug

## Description of bug

Tailwindcss cli exits early when run in watch mode via turbo run.

## How to replicate

Run `yarn dev` / `npm run dev` in root. The process will exit straight away.

`cd packages/tailwind && yarn dev` tailwind cli runs fine when called directly.

## Cause

Tailwindcss cli listens to stdin for 'end' event to exit process. This looks to be in place to stop zombie processes.
Turborepo doesn't connect to the tailwind stdin which causes an instant EOF event when process.stdin.resume() is called.

See ./packages/listener for a replication. Run from root and it will exit. Run directly from package and it works as expected.

## Potential solutions

- [See potential solution](https://github.com/gmanninglive/tailwindcss/pull/1/files) from a tailwindcss cli perspective.
- Alternatively maybe it's Turborepo's responsibility to pipe std through to child processes, however I think this would cause issues with multiple child processes running.
