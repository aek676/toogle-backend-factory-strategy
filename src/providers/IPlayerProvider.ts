import type { Player } from "../models/Player";

export interface IPlayerProvider {
  getPlayerById(playerId: string): Player;
  getPlayers(): Player[];
}
