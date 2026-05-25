import type { BackendFactory } from "./creators/backends/BackendFactory";
import { NodeBackend } from "./creators/backends/NodeBackend";
import { SpringBackend } from "./creators/backends/SpringBackend";
import type { IPlayerProvider } from "./providers/IPlayerProvider";
import type { ITeamProvider } from "./providers/ITeamProvider";

type backendOptions = "NODE" | "SPRING";
const backendType: backendOptions = "SPRING";

function app() {
  let playerProvider: IPlayerProvider;
  let teamProvider: ITeamProvider;

  function initialize(factory: BackendFactory) {
    playerProvider = factory.createPlayerProvider();
    teamProvider = factory.createTeamProvider();
  }

  function main() {
    if (backendType === "NODE") {
      initialize(new NodeBackend());
    } else if (backendType === "SPRING") {
      initialize(new SpringBackend());
    } else {
      throw new Error("Invalid backend type");
    }

    console.log("Players:", playerProvider.getPlayers());
    console.log("Teams:", teamProvider.getTeams());
  }

  main();
}

app();
