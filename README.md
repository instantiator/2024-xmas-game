# Xmas game 2024

Resources to accompany the family Christmas escape room we're building for 2024.

## Invocations

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run lint
```

```bash
npm run preview
```

## Resources

https://vite.dev/guide/static-deploy

## Modifications

### `vite-config.ts`

```ts
base: '/2024-xmas-game/'
```

### Workflow

* Enabled deployment from GHA
* Set node version to `22`
* Updated paths to build and deploy from the `xmas-game` directory

## Packages

* `react-router-dom`

