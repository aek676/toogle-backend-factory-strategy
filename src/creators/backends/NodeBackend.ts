import type { IPlayerProvider } from "../../providers/IPlayerProvider";
import type { ITeamProvider } from "../../providers/ITeamProvider";
import { NodePlayerProvider } from "../../providers/NodePlayerProvider";
import { NodeTeamProvider } from "../../providers/NodeTeamProvider";
import { BackendFactory } from "./BackendFactory";

export class NodeBackend extends BackendFactory {
  createPlayerProvider(): IPlayerProvider {
    return new NodePlayerProvider(this.config);
  }
  createTeamProvider(): ITeamProvider {
    return new NodeTeamProvider(this.config);
  }
}
