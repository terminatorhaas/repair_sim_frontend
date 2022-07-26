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
  differences = []

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
           this.differences= []
           var lastmin = null
           var lastsec = null
           var firstime = true
           data.forEach(element => {
            const jahr = element.timestamp.substring(0, 4);
            const monat = element.timestamp.substring(4, 6);
            const tag = element.timestamp.substring(6, 8);
            const stunde = element.timestamp.substring(8, 10);
            const minute = element.timestamp.substring(10, 12);
            const sekunde = element.timestamp.substring(12, 14);

            element.timestamp = tag + "-" + monat + "-" + jahr + ", " +stunde + ":" + minute + ":" + sekunde

            if(firstime==false){
              

              //this.differences.push((parseInt(element.timestamp) - parseInt(lastelement)))
              this.differences.push(((minute-lastmin)*60 + (sekunde-lastsec)) + "s")
            } else{
              this.differences.push(0 +"s");
            }
            lastmin = minute
            lastsec = sekunde

            this.events.push(element)

            firstime = false;
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
