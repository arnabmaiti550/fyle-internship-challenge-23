import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user', () => {
    service.getUser('johnpapa').subscribe(user => {
      expect(user.login).toBeTruthy();
    })
  })
  it('should get repos', () => {
    service.getRepos('johnpapa', 10, 1).subscribe(
      repos => {
        expect(repos.length > 0)
      }
    )
  })
});
