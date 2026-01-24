# boardctl

*Lazygit for work tracking - one board, any backend.*

**boardctl** is a terminal-first kanban board designed to be your universal command center for all things kanban. Whether you’re working in Jira, Zenhub, or even a local kanban configuration, boardctl gives you a consistent, keyboard-driven workflow - no mouse, no context switching.

![boardctl MVP - Terminal kanban board](.github/assets/boardctl-mvp.png

## Status
**MVP in active development** - Core navigation and UI complete. Content strategy implementation in progress.

### Current Features
-  Terminal-native kanban board UI
-  Column and card navigation with vim-style keybindings
-  Card scrolling with position indicators
-  Responsive layout for terminal resizing

### Upcoming (MVP)
-  Card detail view (full description, due dates, comments)
-  Keybind help menu (`?`)
-  Enhanced navigation (`gg`, `G`, `PgUp`/`PgDn`)
-  Card sorting and filtering
-  Card movement between columns
-  Local content strategy (file-based configuration)

### Post-MVP
- Jira integration
- Card CRUD operations (add, edit, delete)
- Additional backend providers (Linear, Azure, Zenhub)
- User identity and card ownership

## Philosophy

Inspired by tools like **lazygit** and **k9s**, boardctl brings the same terminal-first philosophy to kanban workflows:
- **Fast:** Keyboard-driven, zero mouse dependency
- **Focused:** One interface, no browser tabs
- **Flexible:** Works with your existing tools via content strategies

## Getting Started

Currently in development. To try the latest:

```sh
pnpm install
pnpm run start      # Launch boardctl
pnpm run dev        # Watch mode for development
pnpm run debug      # Debug mode with console outp

```bash
$ npm install --global boardctl
```

## Architecture

boardctl uses a **Strategy Pattern** to support multiple kanban backends through a unified interface:

```mermaid
classDiagram
    %%direction LR

    %% Client / Bootstrap
    class Client {
        +start()
    }

    %% Registry (outside Strategy)
    class ProviderRegistry {
        +register(name: string, strategy: KanbanStrategy): void
        +get(name: string): KanbanStrategy
    }

    %% Context
    class KanbanContext {
        -strategy: KanbanStrategy
        +setStrategy(strategy: KanbanStrategy): void
        +renderBoard()
        +handleInput()
    }

    %% Strategy Interface
    class KanbanStrategy {
        <<interface>>
        +getBoards()
        +getBoard()
        +moveCard()
        +updateCard()
    }

    %% Concrete Strategies
    class LocalStrategy
    class JiraStrategy
    class LinearStrategy
    class AzureStrategy

    %% Relationships
    Client --> ProviderRegistry
    ProviderRegistry --> KanbanStrategy

    Client --> KanbanContext
    KanbanContext o--> KanbanStrategy

    LocalStrategy ..|> KanbanStrategy
    JiraStrategy ..|> KanbanStrategy
    LinearStrategy ..|> KanbanStrategy
    AzureStrategy ..|> KanbanStrategy

```

Each content strategy implements the same interface, allowing you to switch backends without changing your workflow.

## Keybindings (Current)

| Key | Action |
|-----|--------|
| `h`, `←` | Previous column |
| `l`, `→` | Next column |
| `j`, `↓` | Next card in column |
| `k`, `↑` | Previous card in column |
| `q` | Quit |

*Full keybinding reference coming with help menu (`?`) feature*

## Roadmap

- [x] Core UI and layout
- [x] Column/card navigation
- [x] Card scrolling with indicators
- [ ] **MVP Release**
  - [ ] Card details view
  - [ ] Help menu
  - [ ] Enhanced navigation shortcuts
  - [ ] Card sorting/filtering
  - [ ] Local file-based strategy
  - [ ] Card movement
- [ ] **Post-MVP**
  - [ ] Jira integration
  - [ ] Card CRUD operations
  - [ ] Additional backend providers

## Contributing

Not accepting contributions during MVP development, but feedback and feature suggestions are welcome via [Issues](https://github.com/kuhlekt1v/boardctl/issues)!

## License

MIT

---

*Built with [Ink](https://github.com/vadimdemedes/ink) and TypeScript*
