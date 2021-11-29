import {Component, OnInit} from '@angular/core';
import {Team} from "./entity/team";
import {MetricsService} from "./metrics.service";
import {HttpErrorResponse} from '@angular/common/http'
import {NgForm} from "@angular/forms";
import {Message} from "./entity/message";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'teamstatapp';
  teams: Team[] = [];
  advice: string = '';
  action: string = 'Efficiency';
  selectedTeamId: number = 0;


  constructor(private service: MetricsService) {
  }

  ngOnInit() {
    this.getTeams();
  }

  public getTeams(): void {
    this.service.getAllTeams().subscribe(
      (response: Team[]) => {
        this.teams = response;
      }
    )
  }

  public getTeamEfficiency(teamId: number, start: Date, end: Date): void {
    this.service.getTeamEfficiency(teamId, start, end).subscribe(
      (response: Message) => {
        this.advice = response.advice;
      },
      (error: HttpErrorResponse) => {
        this.advice = error.message
      }
    )
  }

  public getTeamBugs(teamId: number, start: Date, end: Date): void {
    this.service.getTeamBugs(teamId, start, end).subscribe(
      (response: Message) => {
        this.advice = response.advice;
      },
      (error: HttpErrorResponse) => {
        this.advice = error.message
      }
    )
  }

  public getTeamPresence(teamId: number, start: Date, end: Date): void {
    this.service.getTeamPresence(teamId, start, end).subscribe(
      (response: Message) => {
        this.advice = response.advice;
      },
      (error: HttpErrorResponse) => {
        this.advice = error.message
      }
    )
  }

  public onOpenModal(teamId: number): void {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (this.action === 'Efficiency') {
      button.setAttribute('data-target', '#getEfficiencyModal');
    }
    if (this.action === 'Bugs statistic in prod') {
      button.setAttribute('data-target', '#getProdBugsModal');
    }
    if (this.action === 'Presence Percent') {
      button.setAttribute('data-target', '#getPresenceModal');
    }
    this.selectedTeamId = teamId;
    // @ts-ignore
    container.appendChild(button);
    button.click();
  }

  public onGetEfficiency(efficiencyInfo: NgForm) {
    const value = efficiencyInfo.value;
    const startPeriod = value.startPeriod;
    const endPeriod = value.endPeriod;
    this.getTeamEfficiency(this.selectedTeamId, startPeriod, endPeriod);
    // @ts-ignore
    document.getElementById('closeGroups').click();
  }

  public onGetProdBugs(efficiencyInfo: NgForm) {
    const value = efficiencyInfo.value;
    const startPeriod = value.startPeriod;
    const endPeriod = value.endPeriod;
    this.getTeamBugs(this.selectedTeamId, startPeriod, endPeriod);
    // @ts-ignore
    document.getElementById('closeBugs').click();
  }

  public onGetPresence(efficiencyInfo: NgForm) {
    const value = efficiencyInfo.value;
    const startPeriod = value.startPeriod;
    const endPeriod = value.endPeriod;
    this.getTeamPresence(this.selectedTeamId, startPeriod, endPeriod)
    // @ts-ignore
    document.getElementById('clearPresence').click();
  }

  actionChanged(event: Event) {
    // @ts-ignore
    this.action = event.target.value
  }
}
