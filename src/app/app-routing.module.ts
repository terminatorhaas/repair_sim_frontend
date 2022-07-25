import { UsersComponent } from './admin/components/users/users.component';
import { ActivityComponent } from './admin/components/activities/activities.component';
import { RecommendationsComponent } from './core/components/recommendations/recommendations.component';
import { ActivityPreferencesComponent } from './core/components/activity-preferences/activity-preferences.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './core/components/welcome/welcome.component';
import { MasterComponent } from './master/master.component';
import { CalenderComponent } from './core/components/calender/calender.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { InterestsComponent } from './admin/components/interests/interests.component';

/**
 * Routing off Application
 * Components that are only available if logged in are protected by AuthGuard
 */
const routes: Routes = [
    {
      path: 'welcome',
      component: WelcomeComponent
    },
    {
      path: '',
      component: MasterComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: '',
          component: WelcomeComponent
        },
        {
          path: 'simulations',
          component: CalenderComponent
        },
        {
          path: 'activity-preferences',
          component: ActivityPreferencesComponent
        },
        {
          path: 'insights',
          component: RecommendationsComponent
        },
        {
          path: 'interests',
          component: InterestsComponent
        },
        {
          path: 'activities',
          component: ActivityComponent
        },
        {
          path: 'users',
          component: UsersComponent
        }
      ]
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    { path: '**', redirectTo: '' }
  ];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
