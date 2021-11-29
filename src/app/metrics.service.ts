import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Team} from "./entity/team";
import {environment} from "../environments/environment";
import {Message} from "./entity/message";

@Injectable({
  providedIn: 'root'
})

export class MetricsService {
  private apiServerUrl = environment.apiBaseUrl

  constructor(private http: HttpClient) {
  }

  public getTeamEfficiency(teamId: number, start: Date, end: Date): Observable<Message> {
    const par = new HttpParams()
      .set('start', start.toString())
      .set('end', end.toString());
    return this.http.get<Message>(`${this.apiServerUrl}/efficiency/${teamId}`, {params: par});
  }

  public getTeamBugs(teamId: number, start: Date, end: Date): Observable<Message> {
    const par = new HttpParams()
      .set('start', start.toString())
      .set('end', end.toString());
    return this.http.get<Message>(`${this.apiServerUrl}/prodBugs/${teamId}`, {params: par});
  }

  public getTeamPresence(teamId: number, start: Date, end: Date): Observable<Message> {
    const par = new HttpParams()
      .set('start', start.toString())
      .set('end', end.toString());
    return this.http.get<Message>(`${this.apiServerUrl}/presence/${teamId}`, {params:par});
  }

  public getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiServerUrl}/teams`);
  }
}
