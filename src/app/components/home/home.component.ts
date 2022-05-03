import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.loginDialog()
  }

  subImages:Array<any> = [
    "../../../assets/download.jfif",
    "../../../assets/facebook.png",
    "../../../assets/fileIcon.png",
    "../../../assets/folderIconpng.png",
    "../../../assets/googleIcon.png",
    "../../../assets/instagram.png",
    "../../../assets/linkedin.png",
    "../../../assets/twitter.png",
  ]

  loginDialog() {
    this.dialog.open(LoginComponent, {
      width: "40%",
      height: "40%",
      disableClose: true,

    });
  }

  openFormDialog() {
    this.dialog.open(FormComponent, {
      width: "50%",
      height: "70%",
      disableClose: true,

    });
  }
}
