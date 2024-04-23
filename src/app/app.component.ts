import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'fyle-frontend-challenge'
  userDatas: any = {};
  currentReposUrl: string = ''
  userName: string = '';
  searchText: string = '';
  isUserDataLoading: boolean = false;
  isRepositoryDataLoading: boolean = false;
  currentUserData: any;
  currentRepositoryData: any = [];
  pageEvent: any;
  pageIndex: number = 0;
  pageSize: number = 10;


  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    let savedDatas = localStorage.getItem("userDatas");
    this.userDatas = savedDatas ? JSON.parse(savedDatas) : {};
  }

  getUserInfo(): void {

    if (!this.userName) return;
    if (this.userDatas[this.userName]) {
      this.currentUserData = this.userDatas[this.userName];

      this.getRepositories();
      return;
    }
    this.isUserDataLoading = true;
    this.apiService.getUser(this.userName).subscribe((response: any) => {
      this.userDatas[this.userName] = response;
      this.userDatas[this.userName].repos = {};
      this.currentUserData = this.userDatas[this.userName] || {}
      localStorage.setItem('userDatas', JSON.stringify(this.userDatas))

      this.getRepositories();
      this.isUserDataLoading = false;
    }, (error) => {
      console.log("error", error);
      this.currentUserData = {};
      this.isUserDataLoading = false;
    });
  }

  getRepositories(): void {
    if (!this.userName || !this.currentUserData?.login) return;
    if (this.userDatas[this.userName]?.repos[this.pageIndex]) {
      this.currentRepositoryData = this.userDatas[this.userName].repos[this.pageIndex];
      return;
    }

    this.isRepositoryDataLoading = true;
    this.apiService.getRepos(this.userName, this.pageSize, this.pageIndex + 1).subscribe((response: any) => {
      this.userDatas[this.userName].repos[this.pageIndex] = response;
      localStorage.setItem('userDatas', JSON.stringify(this.userDatas))
      this.currentRepositoryData = this.userDatas[this.userName].repos[this.pageIndex] || [];
      this.isRepositoryDataLoading = false;
    }, (error) => {
      console.log("error", error);
      this.currentRepositoryData = [];
      this.isRepositoryDataLoading = false;
    });
  }

  handlePage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    if (this.pageSize !== event.pageSize) {
      this.userDatas[this.userName].repos = {}
      localStorage.setItem('userDatas', JSON.stringify(this.userDatas))
    }
    this.pageSize = event.pageSize;
    this.getRepositories()
  }

  formSubmit() {
    if (this.searchText.length) {
      this.userName = this.searchText;
      this.getUserInfo();
      this.searchText = ''
    }
  }
}
