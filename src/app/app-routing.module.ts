import { ActivityComponent } from './admin/components/activities/activities.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { ActivityPreferencesComponent } from './activity-preferences/activity-preferences.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './shared/components/welcome/welcome.component';
import { MasterComponent } from './shared/components/master/master.component';
import { HomeComponent } from './shared/components/home/home.component';
import { CalenderComponent } from './calender/calender.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { InterestsComponent } from './admin/components/interests/interests.component';

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
          path: 'calender',
          component: CalenderComponent
        },
        {
          path: 'activity-preferences',
          component: ActivityPreferencesComponent
        },
        {
          path: 'recommendations',
          component: RecommendationsComponent
        },
        {
          path: 'interests',
          component: InterestsComponent
        },
        {
          path: 'activities',
          component: ActivityComponent
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
