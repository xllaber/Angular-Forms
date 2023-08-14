import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CountryService} from "../../services/country.service";

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit{

  countries: any[] = [];
  user = {
    name: "Ximo",
    lastName: "Llacer",
    email: "ximo@mail.com",
    country: "ESP",
    gender: "M"
  };

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.countryService.getCountries()
      .subscribe(countries => {
        this.countries = countries;
        this.countries.unshift({
          name: "Select your country",
          code: ""
        });
      });
  }

  save(template: NgForm){

    if(template.invalid) {
      Object.values(template.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    console.log(this.user);
    return;
  }
}
