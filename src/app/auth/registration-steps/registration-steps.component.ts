import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

import uniData from './university.json';

@Component({
  selector: 'registration-steps',
  templateUrl: './registration-steps.component.html',
  styleUrls: ['./registration-steps.component.scss'],
})
export class RegistrationStepsComponent implements OnInit {

  universities: Uni[] = uniData
  filteredUniversities: Observable<Uni[]> | null = null;
  profilePhotoPath: string = "";

  nameFG = this._formBuilder.group({
    name: ['', Validators.required],
  });
  universityFG = this._formBuilder.group({
    university: ['', Validators.required],
  });
  departmentFG = this._formBuilder.group({
    department: ['', Validators.required],
  });
  classFG = this._formBuilder.group({
    class: ['', Validators.required],
  });
  descriptionFG = this._formBuilder.group({
    department: ['', Validators.required],
  });
  photoUrlFG = this._formBuilder.group({
    department: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.filteredUniversities = this.universityFG.get('university')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value!)),
    );

  }

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    class: new FormControl('', Validators.required),
    description: new FormControl(''),
    // photoUrl: new FormControl('')
  });

  get formArray(): AbstractControl | null { return this.form.get('formArray'); }

  private _filter(name: string): Uni[] {
    const filterValue = name.toLowerCase();

    return this.universities.filter(universities => universities.name.toLowerCase().includes(filterValue));
  }

  uploadFinished(event: any) {
    console.log(event);
    // this.profilePhotoPath = this.createImgPath(event.dbPath)
  }

  updateUser() {
  }
}

export interface Uni {
  name: string;
}