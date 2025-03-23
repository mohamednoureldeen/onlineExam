import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { NotfoundComponent } from './core/pages/notfound/notfound.component';
import { logedGuard } from './core/guards/loged.guard';
import { authGuard } from './core/guards/auth.guard';
import { BlankLayoutComponent } from './core/layout/blank-layout/blank-layout/blank-layout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: '',
        component: AuthLayoutComponent, canActivate:[logedGuard],
        children: [
            {
                path: 'login',
                title: 'login',
                loadComponent: () => import('./core/pages/login/login.component').then(m => m.LoginComponent)
            },
            {
                path: 'register',
                title: 'register',
                loadComponent: () => import('./core/pages/register/register.component').then(m => m.RegisterComponent)
            },
            {
                path: 'forgot',
                title: 'forgot-password',
                loadComponent: () => import('./core/pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
            },

            
        ],
       
    },
    {
        path: '',
        component: BlankLayoutComponent, canActivate:[authGuard],
        children: [
            {
                path: 'dashboard',
                title: 'dashboard',
                loadComponent: () => import('./core/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
        ]
    },
    { path: '**', component: NotfoundComponent }
];
