# Card Detail

## Wireframe
```

┌────────────────────────────────────────────────────────────┐
│ boardctl | Card Details                             [ESC]  │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Title:    Implement card detail modal on <enter>          │
│  Feature:  Card Details                                    │
│  Priority: High `[!!!]`                         Points: 5  │
│                                                            │
│  Description:                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ Create detail view component with proper focus       │  │
│  │ management and keyboard navigation                   │  │
│  │                                                      │  │
│  │ Should include:                                      │  │
│  │ - Full description scroll                            │  │
│  │ - Due date display                                   │  │
│  │ - Comments section                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                            │
│  Due Date: 2026-02-15                                      │
│                                                            │
│  Comments (3):                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ @alice: Should we add edit mode here?       2d ago   │  │
│  │ @bob: Let's keep read-only for MVP          1d ago   │  │
│  │ @you: Agreed, edit comes post-MVP           1h ago   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                            │
├────────────────────────────────────────────────────────────┤
│ TAB: Switch Section | ↑↓, jk: Scroll | e: Edit (post-MVP)  │
└────────────────────────────────────────────────────────────┘
```

**Keybindings:**
- `ESC`: Close detail view and return to board
- `TAB`: Switch between description and comments sections
- `↑/↓`, `j/k`: Scroll through description/comments
- `e`: Edit card (post-MVP feature)
