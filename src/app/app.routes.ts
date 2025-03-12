import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { NotfoundComponent } from './core/pages/notfound/notfound.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: '',
        component: AuthLayoutComponent,
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
    { path: '**', component: NotfoundComponent }
];
