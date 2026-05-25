import type { BackendFactory } from "../creators/backends/BackendFactory";

export class BackendContext {
  constructor(private strategy: BackendFactory) {}

  public setStrategy(strategy: BackendFactory) {
    this.strategy = strategy;
  }

  public init() {
    return {
      playerProvider: this.strategy.createPlayerProvider(),
      teamProvider: this.strategy.createTeamProvider(),
    };
  }
}
