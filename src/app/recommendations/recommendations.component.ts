import { CalenderService } from './../services/calender.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { trackByHourSegment } from 'angular-calendar/modules/common/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  recommendations = [];
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private calenderService: CalenderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMoreRecommendations();
    setTimeout(() =>{console.log(this.recommendations)},1000);
  }

  getMoreRecommendations(){
    for (var i = 0; i < 10; i++) {
      this.getRecommendation();
    }
  }
  getRecommendation(){
    var add = true;
      this.http.get<any>('api/users/' + this.authService.currentUserValue.username + '/vorschlaege', {}).subscribe(data => {
        add = true;
        this.recommendations.forEach(element => {
          if(element.aktivitaetsBezeichnung===data.aktivitaetsBezeichnung){
            add= false;
          }
        });
        if(add===true){
          this.recommendations.push(data);
        }
      });
  }

  remove(element){
    this.recommendations = this.recommendations.filter(obj => obj !== element);
  }

  plan(element){
    this.router.navigate(["/calender"]);
    this.calenderService.setEvent(element);
  }
}
