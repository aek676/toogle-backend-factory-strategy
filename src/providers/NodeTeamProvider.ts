import type { Team } from "../models/Team";
import type { ITeamProvider } from "./ITeamProvider";
import { BaseProvider } from "./BaseProvider";
import teams from "../mocks/nodeTeams.json";

export class NodeTeamProvider extends BaseProvider implements ITeamProvider {
  getTeamById(teamId: string): Team {
    console.log(
      `Fetching team from ${this.gatewayUrl}/api/teams-node/${teamId}`,
    );
    const team = teams.find((t) => t.id === teamId);
    if (!team) throw new Error(`Team with id ${teamId} not found`);
    return team;
  }

  getTeams(): Team[] {
    console.log(`Fetching teams from ${this.gatewayUrl}/api/teams-node`);
    return teams;
  }
}
