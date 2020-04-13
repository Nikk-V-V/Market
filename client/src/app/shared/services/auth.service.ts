import {Injectable} from '@angular/core'
import {User} from '../interfaces'
import {Observable, Subject} from 'rxjs'
import {tap} from 'rxjs/operators'
import {HttpClient} from '@angular/common/http'

@Injectable()
export class AuthService {

  private token = null
  auth = new Subject<boolean>()

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>('/api/auth/login', user)
      .pipe(tap(({token}) => {
        localStorage.setItem('auth-token', token)
        this.setToken(token)
        this.isAuthenticated()
      }))
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user)
  }

  isAuthenticated(): boolean {
    this.auth.next(!!this.token)
    return !!this.token
  }

  logout() {
    this.token = null
    this.auth.next(false)
    localStorage.clear()
  }

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }
}
