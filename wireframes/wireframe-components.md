# Terminal UI Wireframes

This directory contains ASCII wireframes for boardctl's terminal interface components. Wireframes are created using Unicode box-drawing characters to accurately represent how components will appear in the terminal.

## Purpose

- **Design before implementation** - Visualize layouts before writing code
- **Documentation** - Reference designs during development
- **Communication** - Share UI concepts in PRs and issues
- **Version control** - Track UI evolution alongside code changes

## Wireframe Components

The following ASCII characters can be used for markdown-style wireframes. You can either copy/paste from the available characters below or search for "box drawing" in your OS character picker.

### Light Single Line (Recommended)
```
┌─┬─┐  ← Most commonly used for wireframes
│ │ │
├─┼─┤
│ │ │
└─┴─┘
```

**Characters:**
```
─  Horizontal line
│  Vertical line
┌  Top-left corner
┐  Top-right corner
└  Bottom-left corner
┘  Bottom-right corner
├  Left T-junction
┤  Right T-junction
┬  Top T-junction
┴  Bottom T-junction
┼  Cross/intersection
```

### Heavy/Bold Line
```
┏━┳━┓  ← Use for emphasis or nested sections
┃ ┃ ┃
┣━╋━┫
┃ ┃ ┃
┗━┻━┛
```

**Characters:**
```
━ ┃ ┏ ┓ ┗ ┛ ┣ ┫ ┳ ┻ ╋
```

### Double Line
```
╔═╦═╗  ← Use for modal overlays or special emphasis
║ ║ ║
╠═╬═╣
║ ║ ║
╚═╩═╝
```

**Characters:**
```
═ ║ ╔ ╗ ╚ ╝ ╠ ╣ ╦ ╩ ╬
```

### Rounded Corners
```
╭─┬─╮  ← Use for softer aesthetic (matches Ink's borderStyle="round")
│ │ │
├─┼─┤
│ │ │
╰─┴─╯
```

**Characters:**
```
╭ ╮ ╰ ╯ (use with ─ │ ├ ┤ ┬ ┴ ┼)
```

## Quick Copy-Paste Palette

```
Light:   ─ │ ┌ ┐ └ ┘ ├ ┤ ┬ ┴ ┼
Heavy:   ━ ┃ ┏ ┓ ┗ ┛ ┣ ┫ ┳ ┻ ╋
Double:  ═ ║ ╔ ╗ ╚ ╝ ╠ ╣ ╦ ╩ ╬
Rounded: ╭ ╮ ╰ ╯
```

## How to Input Box Characters

### macOS
- Press `Ctrl + Cmd + Space` → Search "box drawing"
- Enable "Unicode Hex Input" → `Option + [unicode]` (e.g., `Option + 2500`)

### Windows
- Press `Win + .` → Search "box drawing"
- Or use Character Map application

### Linux
- Press `Ctrl + Shift + U` then type unicode code (e.g., `2500`)

### VS Code
- Install extension: **ASCII Decorator**
- Or just copy-paste from this document

## Workflow

1. **Sketch** - Quick hand-drawn or Excalidraw sketch
2. **Wireframe** - Create ASCII wireframe in this directory
3. **Review** - Include wireframe in feature planning issue/PR
4. **Implement** - Reference wireframe during Ink component development
5. **Update** - Modify wireframe if design changes during implementation

---

