import { Component, OnInit } from '@angular/core';
import { Insurance } from '../_models/insurance.model';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-product',
  templateUrl: 'product.page.html',
  styleUrls: ['product.page.scss']
})
export class ProductTab implements OnInit {

  pageTitle = 'Products';
  pageInfo = 'INSURANCES';
  insuranceData: Insurance[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadInitData();
  }

  loadInitData() {
    this.dataService.userInsurance.subscribe((insurance: Insurance[]) => {
      this.insuranceData = insurance ? insurance : null;
    });
  }
}
