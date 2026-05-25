import type { Player } from "../models/Player";
import type { IPlayerProvider } from "./IPlayerProvider";
import players from "../mocks/nodePlayers.json";

export class NodePlayerProvider implements IPlayerProvider {
  getPlayerById(playerId: string): Player {
    const player = players.find((p) => p.id === playerId);
    if (!player) throw new Error(`Player with id ${playerId} not found`);
    return player;
  }

  getPlayers(): Player[] {
    return players;
  }
}
