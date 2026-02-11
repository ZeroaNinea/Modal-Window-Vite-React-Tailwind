# Modal Window Vite + React + Tailwind

This is an animated example of a modal window using Vite + React + Tailwind.

## Create a New React project with Vite

Install the latest version of Vite and create a new React project:

```bash
npm create vite@latest my-app -- --template react-ts
```

## Integrate Tailwind with Vite

Install Tailwind:

```bash
npm install -D @tailwindcss/vite
```

Add Tailwind to your [`vite.config.js`](./vite.config.js):

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

Import Tailwind into the [`index.css](./src/index.css):

```css
@import 'tailwindcss';
```
