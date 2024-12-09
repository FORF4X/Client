import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:5001/api/account';
  private authStatusSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatusSubject.asObservable(); // Observable to subscribe to authentication status

  constructor(private http: HttpClient) {}

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-user`, userData).pipe(
      tap((response: any) => {
        this.storeToken(response.token);
        localStorage.setItem('profile', JSON.stringify(response.profile)); // Save profile
        this.authStatusSubject.next(true); // Emit true, user is logged in
      }),
      catchError(this.handleError)
    );
  }

  registerDoctor(doctorData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-doctor`, doctorData).pipe(
      tap((response: any) => {
        this.storeToken(response.token);
        localStorage.setItem('profile', JSON.stringify(response.profile)); // Save profile
        this.authStatusSubject.next(true); // Emit true, user is logged in
      }),
      catchError(this.handleError)
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // Save token and profile to localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('profile', JSON.stringify(response.profile)); // Ensure profile is saved
        this.authStatusSubject.next(true); // Emit true, user is logged in
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    // Clear token and profile from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    this.authStatusSubject.next(false); // Emit false, user is logged out
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getDecodedToken(): any | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Invalid token:', error);
        return null;
      }
    }
    return null;
  }

  getRole(): string | null {
    const profile = JSON.parse(localStorage.getItem('profile') || '{}');
    return profile?.role || null;
  }

  isDoctor(): boolean {
    return this.getRole() === 'Doctor';
  }

  isUser(): boolean {
    return this.getRole() === 'User';
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const decodedToken = this.getDecodedToken();
    if (decodedToken) {
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return decodedToken.exp > currentTime;
    }
    return false;
  }

  private storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
