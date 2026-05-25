import type { BackendConfig } from "../types/BackendConfig";

export abstract class BaseProvider {
  constructor(protected config: BackendConfig) {}

  protected get gatewayUrl(): string {
    return this.config.gatewayUrl;
  }
}
