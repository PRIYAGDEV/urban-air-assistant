# Swarm Engine — Agent Coordination Protocol

This repository is powered by **Swarm Engine**, a multi-agent orchestration framework designed to coordinate parallel AI coding agents using Model Context Protocol (MCP) tools, isolated Git worktrees, atomic file locking, and shared blackboard memory.

## Architecture & How It Works

1. **DAG Scheduling & Concurrency**:
   - Swarm Engine schedules tasks using a Directed Acyclic Graph (DAG) with dependency tracking (`dependsOn`).
   - Tasks execute up to `maxConcurrency` (default: 0 = infinite / unlimited concurrency) parallel workers.
   - Dependent tasks are automatically queued as `pending` and advance to `running` as prerequisites complete.

2. **Git Worktree Isolation**:
   - Each running agent operates in an isolated directory at `.swarm/worktrees/<agentId>` on branch `swarm/<agentId>`.
   - Worktrees prevent concurrent file write conflicts between agents.
   - For non-git or unborn repositories, an automatic recursive copy fallback is used.
   - Inside each worktree, `AGENT_TASK.md` contains the assigned task spec, role, target files, and blackboard context.

3. **Atomic File Locking (Safeguard 4)**:
   - When an agent is scheduled, its `targetFiles` are normalized and locked in `.swarm/state.json`.
   - No two concurrent agents can modify the same file simultaneously.

4. **Shared Blackboard Memory**:
   - Agents read and publish shared schemas, API contracts, interfaces, and shared state keys via the blackboard.

5. **Clean Merges & History Hygiene (Safeguard 2)**:
   - When an agent completes, its `AGENT_TASK.md` is automatically removed before committing.
   - Changes are cleanly merged to the main branch (`--no-ff`), worktrees and temporary branches are pruned, and file locks are released.

---

## MCP Tools Reference

If you are connected to the Swarm Engine MCP Server, you have access to the following 6 tools:

| MCP Tool | Description |
|---|---|
| `spawn_swarm` | Initializes or updates the swarm mission and enqueues 1..N initial agents forming a DAG. |
| `add_dynamic_agent` | Dynamically adds an on-the-fly specialist agent mid-flight with dependency and lock validation. |
| `pull_agent_task` | Claims or views the next ready task or inspects a specific agent's assigned task and context. |
| `write_blackboard` | Stores or updates shared memory (contracts, schemas, or memory keys) visible to all agents. |
| `complete_agent_task` | Commits worktree changes, cleanly merges to main, deletes worktree and branch, releases locks, and unblocks downstream agents. |
| `get_swarm_status` | Returns a complete snapshot of mission, concurrency, agents, file locks, and blackboard keys. |

---

## Standard Agent Workflow

### 1. Inspect Swarm Status
Check active agents, file locks, and blackboard state:
```json
{
  "name": "get_swarm_status",
  "arguments": { "detail": false }
}
```

### 2. Pull Your Task
Claim the next available task (or a specific agent ID):
```json
{
  "name": "pull_agent_task",
  "arguments": {}
}
```
This returns:
- `worktreePath`: Path to your isolated working directory (e.g. `.swarm/worktrees/agent-123`)
- `taskSpec`: Specific instructions and requirements for your task
- `targetFiles`: The files you are authorized and locked to edit
- `blackboard`: Shared data and contracts from prior agents

### 3. Implement in Your Worktree
Navigate to `worktreePath`. Only modify the designated `targetFiles`. Do not edit files outside your assigned worktree.

### 4. Share Knowledge on Blackboard
If you create a data contract, schema, or export that subsequent agents need:
```json
{
  "name": "write_blackboard",
  "arguments": {
    "key": "user_schema",
    "value": { "type": "object", "properties": { "id": "string", "name": "string" } }
  }
}
```

### 5. Complete Task
When finished and verified:
```json
{
  "name": "complete_agent_task",
  "arguments": {
    "agentId": "<your-agent-id>",
    "summary": "Implemented user schema and unit tests"
  }
}
```
Swarm Engine will automatically commit your changes, merge them back to the main repository, clean up the worktree, release your file locks, and schedule any downstream agents waiting on you.

---

## Rules for Agents

- **DO NOT** edit `.swarm/state.json` manually; all updates must go through MCP tools or CLI commands.
- **DO NOT** commit `AGENT_TASK.md` (Swarm Engine handles this automatically).
- **DO NOT** touch files outside your assigned `targetFiles` without acquiring them or adding a dynamic agent.
- Keep output summaries clear and descriptive for git commit messages.
