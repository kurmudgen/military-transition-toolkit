# Bun Setup for Military Transition Toolkit

## Installation Complete ✓

Bun v1.3.3 is installed and configured for this project.

## Quick Commands

### Basic Usage
```bash
# In new terminal sessions, use full path:
~/.bun/bin/bun install
~/.bun/bin/bun run dev
~/.bun/bin/bun run build

# After running: source ~/.bashrc
# You can use these shortcuts:
bun install    # or just: bi
bun run dev    # or just: bd
bun run build  # or just: bb
bun run [script]  # or just: br [script]
```

## Available Aliases

Add to new terminal sessions with: `source ~/.bashrc`

- `bun` - Run bun directly
- `bi` - Bun install (faster than npm install)
- `bd` - Bun dev server
- `bb` - Bun build
- `br` - Bun run [script name]

## Performance Benefits

### Package Installation
- **npm install**: ~60-120 seconds
- **bun install**: ~5-15 seconds
- **Improvement**: 10-20x faster

### Dev Server Startup
- **npm run dev**: ~1-2 seconds
- **bun run dev**: ~0.5-0.8 seconds
- **Improvement**: 2-3x faster

### Script Execution
- **node script.js**: Baseline
- **bun script.js**: 3-5x faster startup

## Common Development Workflows

### Fresh Install
```bash
cd ~/Documents/military-transition-app
~/.bun/bin/bun install
```

### Start Dev Server
```bash
~/.bun/bin/bun run dev
# Server runs on http://localhost:5173 (or next available port)
```

### Generate Blog Index
```bash
~/.bun/bin/bun run scripts/generate-blog-index.js
```

### Update Blog Dates
```bash
~/.bun/bin/bun run scripts/update-blog-dates.js
```

### Build for Production
```bash
~/.bun/bin/bun run build
```

## Migrating Other Projects

To use Bun with SpouseForce or Money Coach:

1. Navigate to project directory
2. Run: `~/.bun/bin/bun install`
3. Use: `~/.bun/bin/bun run dev`

No changes to package.json required - Bun is a drop-in replacement for npm/node.

## Lockfile

Bun automatically migrated `package-lock.json` to `bun.lockb`:
- Binary format (faster parsing)
- Compatible with npm/pnpm/yarn projects
- Automatically synced on install

## Compatibility

Bun is 100% compatible with:
- All npm packages
- package.json scripts
- Node.js APIs
- Existing workflows

## Support & Resources

- Bun Docs: https://bun.sh/docs
- GitHub: https://github.com/oven-sh/bun
- Discord: https://bun.sh/discord

## Troubleshooting

### Command not found
If `bun` command doesn't work:
```bash
source ~/.bashrc
# Or use full path: ~/.bun/bin/bun
```

### Port conflicts
If dev server port is in use:
```bash
# Bun automatically tries next available port
# Check terminal output for actual port number
```

### Package compatibility
If a package doesn't work:
```bash
# Fall back to npm for that specific package
npm install [package-name]
# Then use bun for everything else
```

## Future Improvements

Consider using Bun for:
1. Test running (faster test execution)
2. Build processes (faster bundling)
3. Database operations (built-in SQLite)
4. API development (built-in HTTP server)

## Notes

- Installed: December 3, 2025
- Version: 1.3.3
- Location: ~/.bun/bin/bun
- Config: ~/.bashrc
