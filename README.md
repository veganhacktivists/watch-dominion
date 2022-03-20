# Watch Dominion

## Setup

- `sail up`
- `sail artisan migrate`

### Local development

- `yarn watch`
- `yarn watch-ssr`
- `sail node ./dist/js/ssr.js`

## How it was setup

- `laravel new myapp --jet --stack=inertia [--teams]`
- `cd myapp`
- `npx laravel-jetstream-react install [--teams]`
