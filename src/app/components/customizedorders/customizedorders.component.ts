import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApicallService } from 'src/app/services/apicall.service';

@Component({
  selector: 'app-customizedorders',
  templateUrl: './customizedorders.component.html',
  styleUrls: ['./customizedorders.component.css'],
})
export class CustomizedordersComponent {
  show: any;
  itemNameFilter: any;
  deliveryDateFilter: any;
  modelNumberFilter: any;
  itemname: any;
  ddofornament: any;
  weight: any;
  date: any;
  makingcharge: any;
  wastage: any;
  gramrate: any;
  modelnumber: any;
  advances: any;
  customizedorders: any;
  currentPage: number = 1;

  constructor(private api: ApicallService,  private toaster: ToastrService) {}

  ngOnInit() {
    this.api.getApi('api/customize/').subscribe((response) => {
      console.log(typeof response);
      this.customizedorders = response;
    }, (error)=>{
      this.toaster.error("Failed to do the operation, Please try again.");
    });
  }
  applyFilters(){
    if(this.itemNameFilter){
      this.api.getApi('api/customized/itemName/' + this.itemNameFilter).subscribe((response) => {
        this.customizedorders = [
          response
        ];
      }, (error)=>{
        this.toaster.error("Failed to do the operation, Please try again.");
      });
    }
    if(this.modelNumberFilter){
      this.api.getApi('api/customized/' + this.modelNumberFilter).subscribe((response) => {
          this.customizedorders = [
            response
          ];
      }, (error)=>{
        this.toaster.error("Failed to do the operation, Please try again.");
      });
    }
    if(this.deliveryDateFilter){
      this.api.getApi('api/customized/deliveryDate/' + this.deliveryDateFilter).subscribe((response) => {
        this.customizedorders = response;
        console.log(response);
    }, (error)=>{
      this.toaster.error("Failed to do the operation, Please try again.");
    });
    }
  }

  addcustomizedorders() {
    let data = {
      OrderedDate:this.date,
      DeliveryDate: this.ddofornament,
      ItemName: this.itemname,
      ModelNumber: this.modelnumber,
      Weight: this.weight,
      Making_Charge: this.makingcharge,
      Wastage: this.wastage,
      Gram_Rate: this.gramrate,
      Advance_Amount: this.advances,
    };
    console.log(data);
    this.api.postApi('api/customized/', data).subscribe((response) => {
      if (response) {
        window.location.reload();
      }
    }, (error)=>{
      this.toaster.error("Failed to do the operation, Please try again.");
    });
  }
}
