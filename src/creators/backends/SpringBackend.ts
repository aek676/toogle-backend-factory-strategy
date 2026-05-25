import type { IPlayerProvider } from "../../providers/IPlayerProvider";
import type { ITeamProvider } from "../../providers/ITeamProvider";
import { SpringPlayerProvider } from "../../providers/SpringPlayerProvider";
import { SpringTeamProvider } from "../../providers/SpringTeamProvider";
import { BackendFactory } from "./BackendFactory";

export class SpringBackend extends BackendFactory {
  createPlayerProvider(): IPlayerProvider {
    return new SpringPlayerProvider(this.config);
  }
  createTeamProvider(): ITeamProvider {
    return new SpringTeamProvider(this.config);
  }
}
