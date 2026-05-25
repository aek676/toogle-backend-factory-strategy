import type { Team } from "../models/Team";
import type { ITeamProvider } from "./ITeamProvider";
import { BaseProvider } from "./BaseProvider";
import teams from "../mocks/springTeams.json";

export class SpringTeamProvider extends BaseProvider implements ITeamProvider {
  getTeamById(teamId: string): Team {
    console.log(
      `Fetching team from ${this.gatewayUrl}/api/teams-spring/${teamId}`,
    );
    const team = teams.find((t) => t.id === teamId);
    if (!team) throw new Error(`Team with id ${teamId} not found`);
    return team;
  }

  getTeams(): Team[] {
    console.log(`Fetching teams from ${this.gatewayUrl}/api/teams-spring`);
    return teams;
  }
}
