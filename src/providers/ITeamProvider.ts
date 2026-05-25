import type { Team } from "../models/Team";

export interface ITeamProvider {
  getTeamById(teamId: string): Team;
  getTeams(): Team[];
}
