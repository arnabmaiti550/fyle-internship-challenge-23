import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, throwError } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getUser(githubUsername: string): Observable<any> {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}`);
  }

  getRepos(githubUsername: string, perPage: number, index: number): Observable<any> {
    return this.httpClient.get(`https://api.github.com/users/${githubUsername}/repos?per_page=${perPage}&page=${index}`);
  }
  // implement getRepos method by referring to the documentation. Add proper types for the return type and params 
}
