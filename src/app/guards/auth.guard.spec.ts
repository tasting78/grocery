import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: { getUser: jest.fn() } },
        { provide: Router, useValue: { navigate: jest.fn() } }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should allow the authenticated user to access app', () => {
    authService.getUser = jest.fn(() => ({ role: 'user' }));
    const route = { data: { roles: ['user', 'admin'] } } as any;
    const state = {} as any;
    expect(authGuard.canActivate(route, state)).toBe(true);
  });

  it('should not allow the unauthenticated user to access app', () => {
    authService.getUser = jest.fn(() => null);
    const route = { data: { roles: ['user', 'admin'] } } as any;
    const state = {} as any;
    expect(authGuard.canActivate(route, state)).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should not allow the user with wrong role to access app', () => {
    authService.getUser = jest.fn(() => ({ role: 'user' }));
    const route = { data: { roles: ['admin'] } } as any;
    const state = {} as any;
    expect(authGuard.canActivate(route, state)).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
