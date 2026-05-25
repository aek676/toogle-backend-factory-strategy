import { BackendContext } from "./context/BackendContext";
import type { BackendFactory } from "./creators/backends/BackendFactory";
import { NodeBackend } from "./creators/backends/NodeBackend";
import { SpringBackend } from "./creators/backends/SpringBackend";
import type { BackendConfig } from "./types/BackendConfig";
import type { IPlayerProvider } from "./providers/IPlayerProvider";
import type { ITeamProvider } from "./providers/ITeamProvider";
import * as readline from "node:readline/promises";
import { exit, stdin, stdout } from "node:process";

type BackendOption = "NODE" | "SPRING";
const config: BackendConfig = { gatewayUrl: "localhost:8080" };

const backendStrategies: Record<
  BackendOption,
  (c: BackendConfig) => BackendFactory
> = {
  NODE: (c) => new NodeBackend(c),
  SPRING: (c) => new SpringBackend(c),
};

let currentBackend: BackendOption = "NODE";
const context = new BackendContext(backendStrategies[currentBackend](config));
let playerProvider: IPlayerProvider;
let teamProvider: ITeamProvider;

function initProviders() {
  const providers = context.init();
  playerProvider = providers.playerProvider;
  teamProvider = providers.teamProvider;
}

function toggleBackend() {
  currentBackend = currentBackend === "NODE" ? "SPRING" : "NODE";
  context.setStrategy(backendStrategies[currentBackend](config));
  initProviders();
}

function showMenu(): string {
  const other = currentBackend === "NODE" ? "SPRING" : "NODE";
  return [
    "+------------------------------------+",
    "|     Backend Toggle CLI App         |",
    `|  Current: ${currentBackend.padEnd(28)}|`,
    "+------------------------------------+",
    "Commands:",
    `  1. Toggle to ${other} backend`,
    "  2. Get all players",
    "  3. Get player by ID",
    "  4. Get all teams",
    "  5. Get team by ID",
    "  6. Exit",
  ].join("\n");
}

async function main() {
  const rl = readline.createInterface({ input: stdin, output: stdout });

  initProviders();

  while (true) {
    console.log(showMenu());
    const choice = (await rl.question("Choose an option: ")).trim();

    switch (choice) {
      case "1":
        toggleBackend();
        console.log(`\nSwitched to ${currentBackend} backend\n`);
        break;

      case "2":
        console.log("\nPlayers:\n", playerProvider.getPlayers(), "\n");
        break;

      case "3": {
        const id = (await rl.question("Player ID: ")).trim();
        try {
          const player = playerProvider.getPlayerById(id);
          console.log("\nPlayer:\n", player, "\n");
        } catch (e) {
          console.log(`\n${(e as Error).message}\n`);
        }
        break;
      }

      case "4":
        console.log("\nTeams:\n");
        console.log(`${Bun.inspect(teamProvider.getTeams())}\n`);
        break;

      case "5": {
        const id = (await rl.question("Team ID: ")).trim();
        try {
          const team = teamProvider.getTeamById(id);
          console.log("\nTeam:\n");
          console.log(`${Bun.inspect(team)}\n`);
        } catch (e) {
          console.log(`\n${(e as Error).message}\n`);
        }
        break;
      }

      case "6":
        console.log("Goodbye!");
        rl.close();
        exit(0);

      default:
        console.log("\nInvalid option\n");
    }
  }
}

main().catch(console.error);
