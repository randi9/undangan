# Design System Strategy: The Pristine Curator

## 1. Overview & Creative North Star
This design system is built to transform a functional utility into a high-end editorial experience. Our Creative North Star is **"The Pristine Curator."** 

We are moving away from the "app-like" density of standard dashboards toward a layout that feels like a luxury gallery. By utilizing intentional asymmetry, expansive breathing room (using our `12` and `16` spacing tokens), and high-contrast typography, we create an environment of trust and authority. This system rejects the rigid, boxed-in grid in favor of a fluid, layered composition where content is elevated through glassmorphism and tonal depth rather than heavy lines.

## 2. Colors & Surface Logic
The palette is rooted in a professional, deep blue (`primary: #004ac6`) set against a sophisticated range of cool neutrals.

*   **The "No-Line" Rule:** To maintain a premium editorial feel, 1px solid borders are strictly prohibited for defining sections. Division must be achieved through background shifts. For example, a main content area using `surface` should be distinguished from a sidebar or header using `surface-container-low` or `surface-container-high`.
*   **Surface Hierarchy & Nesting:** Treat the UI as a physical stack of materials. 
    *   **Base:** `background (#f7f9fb)`
    *   **Sectioning:** `surface-container-low`
    *   **Interactive Elements:** `surface-container-lowest (#ffffff)`
    Each "inner" element should sit on a container tier that creates a natural, soft contrast with its parent.
*   **The "Glass & Gradient" Rule:** Floating cards must utilize the Glassmorphism pattern. Use `surface_container_lowest` at 70-80% opacity with a `backdrop-blur` of 12px-20px. 
*   **Signature Textures:** For primary calls to action (CTAs), do not use flat fills. Apply a subtle linear gradient from `primary (#004ac6)` to `primary_container (#2563eb)` at a 135-degree angle. This adds "soul" and a sense of light to the button.

## 3. Typography
We use a dual-font strategy to balance character with legibility.

*   **Editorial Authority (Manrope):** All `display` and `headline` scales use Manrope. This font provides a modern, architectural feel. Use `headline-lg` for dashboard titles to create an immediate focal point.
*   **Functional Clarity (Inter):** All `title`, `body`, and `label` scales use Inter. This ensures that invitation details and data remain legible and professional at any size.
*   **Hierarchy through Scale:** Create drama by pairing a `display-sm` headline with `body-md` secondary text. The high contrast in scale suggests a curated, intentional design rather than a templated one.

## 4. Elevation & Depth
In this system, depth is a feeling, not a drop-shadow.

*   **The Layering Principle:** Stack `surface-container` tiers to create hierarchy. A card using `surface-container-lowest` placed upon a `surface-container` background creates a "soft lift" that feels architectural.
*   **Ambient Shadows:** When an element must "float" (like a dropdown or a modal), use an ambient shadow. The color should be a 6% opacity tint of `on_surface (#191c1e)`. Use a blur value of at least `20px` to mimic natural light dispersion.
*   **The "Ghost Border" Fallback:** If a boundary is required for accessibility, use a "Ghost Border." Apply the `outline_variant` token at 15% opacity. Never use 100% opaque borders.
*   **Glassmorphism Integration:** Glass cards should have a 1px stroke using `outline_variant` at 20% opacity to catch the "light" at the edge, enhancing the frosted glass illusion.

## 5. Components

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary_container`), `full` roundedness, and `body-md` (semi-bold) text. 
*   **Secondary:** No fill. Ghost border (`outline_variant` at 20%) with `primary` text.
*   **Tertiary:** No fill, no border. `primary` text with an icon.

### Glassmorphic Cards
*   **Styling:** Background of `surface_container_lowest` at 80% opacity + backdrop blur.
*   **Corner Radius:** Always use `xl` (1.5rem) to soften the professional tone.
*   **Content:** No dividers. Use `spacing-6` (2rem) to separate internal card sections.

### Input Fields
*   **Structure:** `surface_container_low` background with a `none` border. On focus, transition to a "Ghost Border" of `primary` at 40%.
*   **Icons:** Use minimalist stroke icons from the same family. Icons should use `outline` color to remain subtle.

### Dashboard Stats (Chips)
*   **Design:** Instead of boxes, use floating `surface_container_highest` chips with `md` roundedness. Use `title-lg` for the numerical value to emphasize data importance.

### Navigation Links
*   **State:** Use `on_surface_variant` for inactive states. For active states, use `primary` with a small, 4px dot below the text rather than a heavy underline.

## 6. Do's and Don'ts

### Do:
*   **Do** use `spacing-10` and `spacing-12` for page margins to create an editorial "frame" around the content.
*   **Do** ensure all icons are stroke-based (2px weight) to match the Inter typography.
*   **Do** use tonal layering (e.g., `surface-dim` for a footer) to define the end of a page.
*   **Do** check that glassmorphism maintains a 4.5:1 contrast ratio for any text sitting inside the card.

### Don't:
*   **Don't** use solid black (#000000) for text. Use `on_surface` for high-end softness.
*   **Don't** use `DEFAULT` or `sm` rounding for cards; it feels too "standard." Stick to `lg` or `xl`.
*   **Don't** use 1px dividers to separate list items. Use vertical padding (`spacing-4`) and subtle background shifts.
*   **Don't** use emojis. The system relies on minimalist stroke icons to maintain its "High-End" status.