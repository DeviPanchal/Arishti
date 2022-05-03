import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    public MatDialogRef: MatDialogRef<LoginComponent>,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  showHint: boolean = false
  wrongPassword: boolean = false
  nameForm = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  get userName(): any {
    return this.nameForm.get('userName');
  }

  get password(): any {
    return this.nameForm.get('password');
  }

  submit() {
    if (this.nameForm.get('userName')?.value == "Arishti" && this.nameForm.get('password')?.value == "PASSWORD") {
      this.MatDialogRef.close()
    }
    else {
      this.wrongPassword = true
      this.showHint = false
    }
  }

  hint() {
    this.showHint = true
    this.wrongPassword = false
  }

  close() {
    this.showHint = false
    this.wrongPassword = false
  }
}
