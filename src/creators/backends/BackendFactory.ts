import type { IPlayerProvider } from "../../providers/IPlayerProvider";
import type { ITeamProvider } from "../../providers/ITeamProvider";

export abstract class BackendFactory {
  public abstract createPlayerProvider(): IPlayerProvider;
  public abstract createTeamProvider(): ITeamProvider;
}
