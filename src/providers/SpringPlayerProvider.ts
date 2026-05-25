import type { Player } from "../models/Player";
import type { IPlayerProvider } from "./IPlayerProvider";
import players from "../mocks/springPlayers.json";

export class SpringPlayerProvider implements IPlayerProvider {
  getPlayerById(playerId: string): Player {
    const player = players.find((p) => p.id === playerId);
    if (!player) throw new Error(`Player with id ${playerId} not found`);
    return player;
  }

  getPlayers(): Player[] {
    return players;
  }
}
