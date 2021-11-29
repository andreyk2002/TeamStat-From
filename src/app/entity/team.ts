import {TeamMember} from "./teamMember";


export interface Team {
  id: number;
  name: string;
  teamMembers: TeamMember[];
}
