import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly JWT_TOKEN = 'ecom_jwt_token';
  private readonly REFRESH_TOKEN = 'ecom_refresh_token';
  private readonly CURRENT_USER = 'ecom_current_user';

  constructor() { }

  // Token Management
  setToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN, token);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  removeTokens(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = this.parseJwt(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch {
      return true;
    }
  }

  // User Management
  setCurrentUser(user: any): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

  getCurrentUser(): any {
    const user = localStorage.getItem(this.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  }

  removeCurrentUser(): void {
    localStorage.removeItem(this.CURRENT_USER);
  }

  clear(): void {
    localStorage.clear();
  }

  // Helper
  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }
}
