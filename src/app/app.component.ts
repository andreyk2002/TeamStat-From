import {Component, OnInit} from '@angular/core';
import {Team} from "./entity/team";
import {MetricsService} from "./metrics.service";
import {HttpErrorResponse} from '@angular/common/http'
import {NgForm} from "@angular/forms";
import {Message} from "./entity/message";
import {Issue} from "./entity/issue";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'teamstatapp';
  teams: Team[] = [];
  advice: string = '';
  jiraString: string = '';
  action: string = 'Efficiency';
  selectedTeamId: number = 0;
  loggedToJira = false
  issues: Issue[] = [];

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

  public createIssue(issue: string) {
    this.service.createIssue(issue).subscribe(
      (response: string) => {
        this.jiraString = "Issue created successfully: "
      },
      (error: HttpErrorResponse) => {
        this.advice = error.message
      }
    )
  }


  public getIssues() {
    this.service.getIssues().subscribe(
      (response: Issue[]) => {
        this.issues = response;
      }, (error: HttpErrorResponse) => {
        this.jiraString = error.message
      }
    );
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

  public jiraLogin(username: string, password: string) {
    this.service.jiraLogin(username, password).subscribe((response: Message) => {
        this.loggedToJira = true;
        this.jiraString = "login successful"
      },
      (error: HttpErrorResponse) => {
        this.jiraString = error.message
      }
    )
  }

  public jiraAction(dataTarget: string) {
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', dataTarget);
    // @ts-ignore
    container.appendChild(button);
    button.click();
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

  public onJiraLogin(jiraLogin: NgForm) {
    const value = jiraLogin.value
    const username = value.username
    const password = value.password
    this.jiraLogin(username, password)
    // @ts-ignore
    document.getElementById('closeJiraLogin').click()
  }

  public onCreateIssue(createIssue: NgForm) {
    let value = createIssue.value;
    let issue = value.issue;
    this.createIssue(issue)
    // @ts-ignore
    document.getElementById('closeCreateIssue').click()
  }

  public onBrowseIssues(browseIssues: NgForm) {

  }

  public loginModal() {
    this.jiraAction('#jiraLogin')
  }

  public viewIssuesModal() {
    this.getIssues();
    this.jiraAction('#browseIssues')
  }

  public createIssuesModal() {
    this.jiraAction('#createIssue')
  }
}
