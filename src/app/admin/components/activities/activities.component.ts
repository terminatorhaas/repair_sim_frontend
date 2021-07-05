import { AuthService } from 'src/app/auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { trackByHourSegment } from 'angular-calendar/modules/common/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivityComponent implements OnInit {

  recommendations = [];
  errorMessage;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getNewRecommendations();
    setTimeout(() =>{console.log(this.recommendations)},1000);
  }

  getNewRecommendations(){
    this.recommendations= [];
    for (var i = 0; i < 10; i++) {
      this.getRecommendation();
    }
  }
  getRecommendation(){
    var add = true;
      this.http.get<any>('api/users/' + this.authService.currentUserValue.username + '/vorschlaege', {}).subscribe((data) => {
        add = true;
        this.recommendations.forEach(element => {
          if(element.aktivitaetsBezeichnung===data.aktivitaetsBezeichnung){
            add= false;
          }
        });
        if(add===true){
          this.recommendations.push(data);
        }
      },(error) => {
        console.error('Couldnt generate Recommendation')
        this.errorMessage = "Keine Vorschläge generierbar. Lege deine Interessen zunächst in den Einstellungen fest!";
      });
  }

  remove(element){
    this.recommendations = this.recommendations.filter(obj => obj !== element);
  }

  plan(element){
  }
}
