import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  imgCtrl = new FormControl();
  filtered_IMG: Observable<string[]>;
  subImages: string[] = [];
  all_Images: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('imageInput')
  imageInput!: ElementRef<HTMLInputElement>;

  constructor( 
    public fb: FormBuilder,
    public MatDialogRef: MatDialogRef<FormComponent>,
    public dialog: MatDialog,
  ) {
    this.filtered_IMG = this.imgCtrl.valueChanges.pipe(
      startWith(null),
      map((image: string | null) => (image ? this._filter(image) : this.all_Images.slice())),
    );
   }

  ngOnInit(): void {
  }
  nameForm = this.fb.group({
    id: ['', [Validators.required]],
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
    date: ['', [Validators.required]],
    titleIMG: ['', [Validators.required]],
    facebook: [''],
    twitter: [''],
    instagram: [''],
    linkedIn: [''],
  });

  get id(): any {
    return this.nameForm.get('id');
  }
  get title(): any {
    return this.nameForm.get('title');
  }
  get content(): any {
    return this.nameForm.get('content');
  }
  get date(): any {
    return this.nameForm.get('date');
  }
  get titleIMG(): any {
    return this.nameForm.get('titleIMG');
  }
  // get facebook(): any {
  //   return this.nameForm.get('facebook');
  // }
  // get twitter(): any {
  //   return this.nameForm.get('twitter');
  // }
  // get instagram(): any {
  //   return this.nameForm.get('instagram');
  // }
  // get linkedIn(): any {
  //   return this.nameForm.get('linkedIn');
  // }



  submit() {
    let date = (this.nameForm.get('date')?.value)
    // let splittedString = date.splice(41, -1)
  
    // console.log(splittedString)
    

    let obj = {
      id: this.nameForm.get('id')?.value,
      title: this.nameForm.get('title')?.value,
      content: this.nameForm.get('content')?.value,
      date: this.nameForm.get('date')?.value,
      titleImg: this.nameForm.get('titleIMG')?.value,
      images: this.subImages,
      facebook: this.nameForm.get('facebook')?.value,
      twitter: this.nameForm.get('twitter')?.value,
      instagram: this.nameForm.get('instagram')?.value,
      linkedIn: this.nameForm.get('linkedIn')?.value,
    }
    console.log(obj)
      this.MatDialogRef.close()
  }

  close() {
    this.MatDialogRef.close()
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our image
    if (value) {
      this.subImages.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.imgCtrl.setValue(null);
  }

  remove(image: string): void {
    const index = this.subImages.indexOf(image);

    if (index >= 0) {
      this.subImages.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.subImages.push(event.option.viewValue);
    this.imageInput.nativeElement.value = '';
    this.imgCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.all_Images.filter(image => image.toLowerCase().includes(filterValue));
  }

}
