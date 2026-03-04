# @firela/api-types

TypeScript types and API client generated from OpenAPI specifications.

## Usage

```bash
npm install @firela/api-types
```

## Development

```bash
# Install dependencies
npm install

# Generate types from OpenAPI spec
npm run generate

# Lint OpenAPI spec
npm run lint

# Build
npm run build
```

## Publishing

This package is automatically published to npm via GitHub Actions.

### Canary Releases

Every push to main triggers a canary release with version `0.0.0-canary.{short-sha}`.

Install the latest canary:

```bash
npm install @firela/api-types@canary
```
// Trigger publish
