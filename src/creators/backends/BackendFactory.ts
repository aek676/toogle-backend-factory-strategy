import type { BackendConfig } from "../../types/BackendConfig";
import type { IPlayerProvider } from "../../providers/IPlayerProvider";
import type { ITeamProvider } from "../../providers/ITeamProvider";

export abstract class BackendFactory {
  constructor(protected config: BackendConfig) {}

  public abstract createPlayerProvider(): IPlayerProvider;
  public abstract createTeamProvider(): ITeamProvider;
}
