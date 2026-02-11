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

## How the Rainbow Button Works

The rainbow button effect is created using three main techniques:

1. An animated linear gradient.
2. Text clipping with `background-clip: text`.
3. A masked pseudo-element for the animated border.

### 1. Animated Gradient

Both the button text and its border use the same horizontal linear gradient:

```css
linear-gradient(
  90deg,
  red 0%,
  orange 14%,
  yellow 28%,
  green 42%,
  cyan 56%,
  blue 70%,
  violet 84%,
  red 100%
);
```

Notice that:

- The gradient starts **and ends with red**.
- This makes the animation seamless when it loops.

The gradient is stretched to twice the button width:

```css
background-size: 200% 100%;
```

Then we animate the horizontal position:

```css
@keyframes rainbowMove {
  from {
    background-position: 0% 0%;
  }
  to {
    background-position: 200% 0%;
  }
}
```

Because the gradient is duplicated across 200% width, moving from `0%` to `200%` shifts exactly one full cycle.
When the animation restarts, the visual state is identical — so there is no visible jump.

### 2. Rainbow Text

The text uses:

```css
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

This works by:

- Applying the animated gradient as a background.
- Clipping that background to the shape of the text.
- Making the actual text color transparent.

The result: only the text is filled with the moving rainbow.

### 3. Rainbow Border (Mask Trick)

The border is created using a `::before` pseudo-element.

Instead of using a normal border color, we:

1. Apply the animated gradient as the background.
2. Use `mask` to remove the center.
3. Leave only the outer border visible.

```css
mask:
  linear-gradient(#000 0 0) content-box,
  linear-gradient(#000 0 0);

-webkit-mask-composite: xor;
mask-composite: exclude;
```

This technique cuts out the inner part of the element, leaving only the animated gradient border visible.

So visually:

- The pseudo-element holds the animated rainbow.
- The mask removes the center.
- Only the border remains.

### 4. Performance Optimization

```css
will-change: background-position;
```

This hints to the browser that the background position will animate, allowing it to optimize rendering.

### 5. Why the Animation Must Move Exactly 200%

If the animation distance does not match exactly one full gradient cycle, the loop will visibly “jump”.

Originally, the jump appeared near the center of the button (around the cyan color).
This happened because the gradient was not shifted by a complete cycle before restarting.

To make the animation seamless:

- The gradient is duplicated by setting `background-size: 200% 100%`.
- The animation shifts the background from `0%` to `200%`.

Because the final frame matches the first frame visually, the loop becomes perfectly smooth.

## How the Modal Window Works

This modal implements smooth open and close animations while avoiding common React anti-patterns.

### 1. Controlled Visibility

The modal is controlled by an external `open` prop:

```tsx
<Modal open={isOpen} onClose={...} />
```

The parent component decides when the modal should open or close.

### 2. Preventing Instant Unmount on Close

If we simply returned `null` when `open` is `false`, the modal would disappear immediately and the closing animation would never play.

To solve this, we introduce a local animation state:

```tsx
const [isClosing, setIsClosing] = useState(false);
```

When `open` becomes `false`, we:

1. Set `isClosing = true`.
2. Wait for the animation duration (300ms).
3. Then reset `isClosing`.

```tsx
useEffect(() => {
  if (!open) {
    setIsClosing(true);

    const timeout = setTimeout(() => {
      setIsClosing(false);
    }, 300);

    return () => clearTimeout(timeout);
  }
}, [open]);
```

### 3. Conditional Rendering Logic

Instead of storing a separate `isMounted` state, rendering is derived directly from:

```tsx
const shouldRender = open || isClosing;
```

This means:

- When opening -> render immediately.
- When closing -> remain mounted during animation.
- After animation -> unmount automatically.

This avoids syncing props to state and follows modern React best practices.

### 4. Dragging the Modal

Dragging is implemented by:

- Tracking `position`.
- Listening to `mousemove` and `mouseup` events.
- Updating transform dynamically.

```tsx
style={{
  transform: `translate(${position.x}px, ${position.y}px)`
}}
```

This keeps movement independent from animation logic.
