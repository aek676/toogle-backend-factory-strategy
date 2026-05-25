import type { Player } from "../models/Player";
import type { IPlayerProvider } from "./IPlayerProvider";
import { BaseProvider } from "./BaseProvider";
import players from "../mocks/springPlayers.json";

export class SpringPlayerProvider
  extends BaseProvider
  implements IPlayerProvider
{
  getPlayerById(playerId: string): Player {
    console.log(
      `Fetching player from ${this.gatewayUrl}/api/players-spring/${playerId}`,
    );
    const player = players.find((p) => p.id === playerId);
    if (!player) throw new Error(`Player with id ${playerId} not found`);
    return player;
  }

  getPlayers(): Player[] {
    console.log(`Fetching players from ${this.gatewayUrl}/api/players-spring`);
    return players;
  }
}
