import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { UserItem } from '../../../shared/interfaces/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  interessenId: number;

  users: UserItem[];

  //inject Service for users
  constructor(
    private userService: UserService,
    private modal: NgbModal,
  ) { }

  //get all users
  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      console.log(data);
    });
  }

  deleteUser(user) {
    //initialize Modal
    const modalRef = this.modal.open(AlertComponent);
    modalRef.componentInstance.mode = "delete";
    modalRef.componentInstance.title = "Bist du dir Sicher, dass du den User komplett löschen möchtest?";
    modalRef.result.then((res) => {
      if (res === "delete") {
        this.userService.deleteUser(user.username).subscribe(data => {
          console.log(data);
          this.users = this.users.filter(obj => obj !== user);
        },
          error => {
            console.log("could not delete");
          });
      }
    }, () => { console.log('Backdrop click') });
  }

  changeUser(user: UserItem) {
    //initialize Modal
    const modalRef = this.modal.open(AlertComponent);
    modalRef.componentInstance.mode = "changeUser";
    modalRef.componentInstance.title = "User ändern";
    modalRef.componentInstance.username = user.username;
    modalRef.componentInstance.role = user.role;
    modalRef.result.then((res) => {
      if (res === "change") {
        this.userService.changeUser(user.username, modalRef.componentInstance.role).subscribe(data => {
        user.role=  modalRef.componentInstance.role;
        },
          error => {
            console.log("could not change");
          });
      }
    }, () => { console.log('Backdrop click') });
  }

}
