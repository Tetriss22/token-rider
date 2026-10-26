# Token Rider

A 3D game that runs in your browser tab. 5 levels, 5 bosses, 5 rewards: every boss drops a prompt or a skill for Claude, and the last one drops the prompt of the whole game.

**Play:** https://tetriss22.github.io/token-rider/

| Level | World | New surprise | Boss | Reward |
|---|---|---|---|---|
| 1 | Golden Meadow | hoppers | Rate Limit Golem (429) | [caveman](https://github.com/JuliusBrussee/caveman) |
| 2 | Sakura Hills | walls to jump, fake tokens | Hallucination Golem (???) | [graphify](https://github.com/Graphify-Labs/graphify) |
| 3 | Copper Canyon | moving gates, meteors | Timeout Titan (504) | [anthropics/skills](https://github.com/anthropics/skills) |
| 4 | Neon Night | sweeping drones | Null Pointer Knight (NULL) | [superpowers](https://github.com/obra/superpowers) |
| 5 | Storm Summit | everything, faster | Context Limit Titan (200K) | the full prompt of this game |

Levels 1-4 unlock some of the most-starred Claude skills on GitHub (links only, nothing is re-hosted here). Heart pickups on the road and in boss fights.

- One HTML file + [three.js](https://threejs.org) r149 (MIT). No build step, no art files: everything is drawn in code.
- Controls: ← → or A / D to steer, Space / ↑ to jump. On phones: hold the left or right side to steer, tap JUMP or swipe up.
- Progress is saved in your browser.

Built with Claude by [@Tetriss112](https://x.com/Tetriss112).

Dev flags: `?level=N`, `?boss`, `?win`, `?auto` (autopilot), `?test` (exposes `window.__step(n)` for headless tests), `?god`, `?unlockall`.
