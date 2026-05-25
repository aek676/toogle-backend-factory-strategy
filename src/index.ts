import type { BackendConfig } from "./types/BackendConfig";
import type { BackendFactory } from "./creators/backends/BackendFactory";
import { NodeBackend } from "./creators/backends/NodeBackend";
import { SpringBackend } from "./creators/backends/SpringBackend";
import type { IPlayerProvider } from "./providers/IPlayerProvider";
import type { ITeamProvider } from "./providers/ITeamProvider";

type backendOptions = "NODE" | "SPRING";
const backendType: backendOptions = "NODE";
// Interface BackendConfig in case we need to transfer more thinks like auth tokens, etc. in the future
const config: BackendConfig = { gatewayUrl: "localhost:8080" };

function app() {
  let playerProvider: IPlayerProvider;
  let teamProvider: ITeamProvider;

  function initialize(factory: BackendFactory) {
    playerProvider = factory.createPlayerProvider();
    teamProvider = factory.createTeamProvider();
  }

  function main() {
    if (backendType === "NODE") {
      initialize(new NodeBackend(config));
    } else if (backendType === "SPRING") {
      initialize(new SpringBackend(config));
    } else {
      throw new Error("Invalid backend type");
    }

    console.log("Players:", playerProvider.getPlayers());
    console.log("Teams:", teamProvider.getTeams());
  }

  main();
}

app();
