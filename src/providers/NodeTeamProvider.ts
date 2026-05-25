import type { Team } from "../models/Team";
import type { ITeamProvider } from "./ITeamProvider";
import teams from "../mocks/nodeTeams.json";

export class NodeTeamProvider implements ITeamProvider {
  getTeamById(teamId: string): Team {
    const team = teams.find((t) => t.id === teamId);
    if (!team) throw new Error(`Team with id ${teamId} not found`);
    return team;
  }

  getTeams(): Team[] {
    return teams;
  }
}
