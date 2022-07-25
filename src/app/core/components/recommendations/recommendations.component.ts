import { RecommendationService } from '../../services/recommendation.service';
import { CalenderService } from '../../services/calender.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { trackByHourSegment } from 'angular-calendar/modules/common/util';
import { Router } from '@angular/router';

/**
 * Component for Recommendations for user
 */
@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  events = [];
  errorMessage: string;

  //inject services
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private calenderService: CalenderService,
    private recommendationService: RecommendationService,
    private router: Router
  ) { }

  //get new Recommendations on Init
  ngOnInit(): void {
    setInterval(()=> { this.getRecommendation(); }, 1000);
  }

  getRecommendation(){
    this.recommendationService.getRecommendationBackend("none").subscribe((data) => {
           console.log(data)
           this.events = []
           data.forEach(element => {
            this.events.push(element)
           });
         });
    //only add Recommendation if it is not already present
    // var add = true;
    //   this.recommendationService.getRecommendationBackend(this.authService.currentUserValue.access_token).subscribe((data) => {
    //     add = true;
    //     this.recommendations.forEach(element => {
    //       if(element.aktivitaetsBezeichnung===data.aktivitaetsBezeichnung){
    //         add= false;
    //       }
    //     });
    //     if(add===true){
    //       this.recommendations.push(data);
    //     }
    //   },(error) => {
    //     //if there are no recommendations than display error
    //     console.error('Couldnt generate Recommendation')
    //     this.errorMessage = "Keine Vorschläge generierbar. Lege deine Interessen zunächst in den Einstellungen fest!";
    //   });
  }
  
}
