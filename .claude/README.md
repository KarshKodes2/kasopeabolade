# Claude Agent Configuration

This directory contains the configuration for Claude Code agents in the Kasope Abolade monorepo.

## Directory Structure

```
.claude/
├── claude.config.yaml      # Main agent configuration
├── settings.local.json     # Permissions and MCP settings
├── QUICK_START.md          # Getting started guide
├── project-context.md      # Project architecture context
├── COMMIT_STANDARDS.md     # Git commit conventions
├── README.md               # This file
│
├── commands/               # Subagent command definitions
│   ├── architect.md        # Architecture validation
│   ├── reviewer.md         # Code review
│   ├── tester.md           # Test generation
│   ├── security-auditor.md # Security audit
│   ├── doc-writer.md       # Documentation
│   ├── cleanup.md          # Code cleanup
│   ├── deployer.md         # Deployment
│   ├── db-manager.md       # Database operations
│   ├── ui-builder.md       # UI component creation
│   └── performance-optimizer.md  # Performance analysis
│
├── workflows/              # Multi-step workflows
│   ├── new-feature.md      # Feature implementation
│   ├── db-migration.md     # Database migration
│   ├── deploy-app.md       # App deployment
│   └── pr-review.md        # PR review process
│
├── artifacts/              # Generated artifacts (gitignored)
│   └── ...
│
├── logs/                   # Agent logs (gitignored)
│   └── ...
│
└── scripts/                # Helper scripts
    └── ...
```

## Available Agents

### Development Agents

| Agent | Trigger | Description |
|-------|---------|-------------|
| Architect | `/architect` | Validates monorepo structure |
| Reviewer | `/reviewer` | Code review for PRs |
| Tester | `/tester` | Generates unit and E2E tests |
| Cleanup | `/cleanup` | Removes dead code, fixes formatting |
| UI Builder | `/ui-builder` | Creates shared UI components |

### Operations Agents

| Agent | Trigger | Description |
|-------|---------|-------------|
| Deployer | `/deployer` | Deployment preparation |
| DB Manager | `/db-manager` | Database operations |
| Performance | `/performance` | Performance analysis |

### Quality Agents

| Agent | Trigger | Description |
|-------|---------|-------------|
| Security Auditor | `/security-auditor` | Security vulnerability scanning |
| Doc Writer | `/doc-writer` | Documentation generation |

## Available Workflows

| Workflow | Trigger | Description |
|----------|---------|-------------|
| New Feature | `/workflow new-feature` | End-to-end feature implementation |
| DB Migration | `/workflow db-migration` | Safe database migration process |
| Deploy App | `/workflow deploy-app` | Single app deployment |
| PR Review | `/workflow pr-review` | Comprehensive PR review |

## Configuration Files

### claude.config.yaml

Main configuration file defining:
- Global settings (model, temperature, etc.)
- Agent definitions with prompts
- Workflow definitions
- MCP server configuration

### settings.local.json

Local permissions file defining:
- Allowed slash commands
- Allowed bash commands
- MCP server permissions
- Workspace configuration

## Usage Examples

### Run Architecture Check

```
/architect admin
```

### Generate Tests

```
/tester packages/utils/rbac.ts
```

### Deploy to Production

```
/deployer admin production
```

### Full PR Review

```
/workflow pr-review 42
```

### Create UI Component

```
/ui-builder create Button
```

### Database Migration

```
/db-manager migrate create add-user-phone
```

## Adding New Agents

1. Create command file in `commands/{agent-name}.md`
2. Add agent configuration to `claude.config.yaml`
3. Add permission to `settings.local.json`
4. Test the agent

### Command File Template

```markdown
# {Agent Name} Agent

You are the **{Agent Name}** for the Kasope Abolade monorepo.

## Trigger

\`\`\`
/{trigger} [args]
\`\`\`

## Responsibilities

1. {responsibility 1}
2. {responsibility 2}

## Output Format

{define expected output}

## Commands to Run

{list bash commands the agent may use}
```

## Adding New Workflows

1. Create workflow file in `workflows/{workflow-name}.md`
2. Add workflow configuration to `claude.config.yaml`
3. Document usage

### Workflow File Template

```markdown
# {Workflow Name} Workflow

## Trigger

\`\`\`
/workflow {name} [args]
\`\`\`

## Steps

### Step 1: {name}

{description}

### Step 2: {name}

{description}

## Checklist

- [ ] {item 1}
- [ ] {item 2}
```

## Best Practices

### For Agents

1. Be specific in prompts
2. Define clear output formats
3. List allowed commands explicitly
4. Include error handling guidance

### For Workflows

1. Break into atomic steps
2. Include verification at each step
3. Provide rollback procedures
4. Document prerequisites

### For Users

1. Use specific app/package names
2. Provide context when needed
3. Review agent output before applying
4. Use `--dry-run` when available

## Troubleshooting

### Agent Not Responding

1. Check `settings.local.json` permissions
2. Verify command file exists
3. Check for syntax errors in config

### Permission Denied

1. Add command to `settings.local.json` allow list
2. Check MCP server permissions
3. Verify file paths are correct

### Unexpected Output

1. Review agent prompt in command file
2. Check if context files are up to date
3. Verify workspace configuration

## Contributing

When modifying agent configuration:

1. Test changes locally
2. Update documentation
3. Follow commit standards
4. Request review for significant changes
