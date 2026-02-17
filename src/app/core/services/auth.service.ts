import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';

export interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private api: ApiService,
    private localStorage: LocalStorageService
  ) {
    this.initializeAuthState();
  }

  // Initialize auth state from localStorage
  private initializeAuthState(): void {
    const user = this.localStorage.getCurrentUser();
    const token = this.localStorage.getToken();

    if (user && token && !this.localStorage.isTokenExpired(token)) {
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    } else {
      this.logout();
    }
  }

  // Get current user synchronously
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Get current user asynchronously
  getCurrentUser$(): Observable<User | null> {
    return this.currentUser$;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Login
  login(credentials: LoginRequest): Observable<User> {
    return this.api.post<AuthResponse>('/auth/login', credentials)
      .pipe(
        tap(response => {
          this.setTokens(response.accessToken, response.refreshToken);
          this.localStorage.setCurrentUser(response.user);
          this.currentUserSubject.next(response.user);
          this.isAuthenticatedSubject.next(true);
        }),
        map(response => response.user)
      );
  }

  // Register
  register(data: RegisterRequest): Observable<User> {
    return this.api.post<AuthResponse>('/auth/register', data)
      .pipe(
        tap(response => {
          this.setTokens(response.accessToken, response.refreshToken);
          this.localStorage.setCurrentUser(response.user);
          this.currentUserSubject.next(response.user);
          this.isAuthenticatedSubject.next(true);
        }),
        map(response => response.user)
      );
  }

  // Refresh token
  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.localStorage.getRefreshToken();
    if (!refreshToken) {
      return new Observable(observer => {
        observer.error(new Error('No refresh token available'));
      });
    }

    return this.api.post<AuthResponse>('/auth/refresh-token', { refreshToken })
      .pipe(
        tap(response => {
          this.setTokens(response.accessToken, response.refreshToken);
          this.localStorage.setCurrentUser(response.user);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  // Logout
  logout(): void {
    this.localStorage.removeTokens();
    this.localStorage.removeCurrentUser();
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  // Set tokens
  private setTokens(accessToken: string, refreshToken: string): void {
    this.localStorage.setToken(accessToken);
    this.localStorage.setRefreshToken(refreshToken);
  }

  // Get access token
  getAccessToken(): string | null {
    return this.localStorage.getToken();
  }
}
