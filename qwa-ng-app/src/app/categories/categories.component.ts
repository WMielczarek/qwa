import { Component, OnInit } from '@angular/core';
import {Category} from "../model/category";
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories : Category [] = [];

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.getAllCategories();
  }


  getAllCategories(){
    this.apiService.getAllCategories().subscribe(
      res => {
        this.categories = res;
      },
      err => {alert("Error occurred while downloading the categories;")}
    );
  }

}

