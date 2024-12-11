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

## Modifications

### `vite-config.ts`

```ts
base: '/2024-xmas-game/'
```

### Workflow

See: `.github/workshops/deploy-pages.yaml`

* Enabled deployment from GHA
* Set node version to `22`
* Updated paths to build and deploy from the `xmas-game` directory

## Additional packages

### `react-router-dom`

`react-router` with some DOM specific functions. See: `App.tsx`

## Resources

https://vite.dev/guide/static-deploy

https://medium.com/@galohernandez/vite-react-react-router-dom-the-latest-way-312ee887197e
