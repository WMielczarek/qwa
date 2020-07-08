import { Component, OnInit } from '@angular/core';
import {ApiService} from "../service/api.service";
import {Category} from "../model/category";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  categories : Category[];

  constructor(
    private apiService : ApiService
  ) { }

  ngOnInit() {
    this.apiService.getAllCategories().subscribe(
      res=> {
        this.categories = res;
      },
      err=> {
        alert("Nie udało się pobrać kategorii z serwera");
      }
    )
  }

}
