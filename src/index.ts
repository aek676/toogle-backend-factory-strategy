import { BackendContext } from "./context/BackendContext";
import type { BackendFactory } from "./creators/backends/BackendFactory";
import { NodeBackend } from "./creators/backends/NodeBackend";
import { SpringBackend } from "./creators/backends/SpringBackend";
import type { BackendConfig } from "./types/BackendConfig";

type backendOptions = "NODE" | "SPRING";
const backendType: backendOptions = "NODE";
const config: BackendConfig = { gatewayUrl: "localhost:8080" };

function app() {
  const backendStrategies: Record<
    backendOptions,
    (c: BackendConfig) => BackendFactory
  > = {
    NODE: (c) => new NodeBackend(c),
    SPRING: (c) => new SpringBackend(c),
  };

  function main() {
    const strategyBuilder = backendStrategies[backendType];
    if (!strategyBuilder) throw new Error("Invalid backend type");

    const context = new BackendContext(strategyBuilder(config));

    const { playerProvider, teamProvider } = context.init();

    console.log("Players:\n", playerProvider.getPlayers());
    console.log("Teams:\n", teamProvider.getTeams());
  }

  try {
    main();
  } catch (error) {
    console.error("Error in app: ", error);
  }
}

app();
