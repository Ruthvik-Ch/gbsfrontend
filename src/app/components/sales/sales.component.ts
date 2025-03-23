import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApicallService } from "src/app/services/apicall.service";

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {
  salesDetails: any[] = [];
  customername: any;
  mobileno: any;
  aadharno: any;
  itemname: any;
  hsncode: any;
  gramweight: any;
  netweight: any;
  ratepergram: any;
  value: any;
  stoneRs: any;
  discountRs: any;
  amountRs: any;
  carat_type: any;
  category_name: any;
  sub_category: any;
  huid: any;
  tagnumber: any;
  wcvalue: any;
  vavalue: any;
  stonepieces: any;
  mcvalue: any;
  stonetype: any;
  sviewBtns: any;
  singleSales: any;
  panno: any;
  esalesId: any;
  filteredSalesDetails: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  searchTermDate: string = '';
  constructor(private api: ApicallService, private toaster: ToastrService) { }
  ngOnInit() {

    // To get all sales api should be created

    this.api.getApi('api/sales/').subscribe((response) => {
      this.salesDetails = response;
      this.filteredSalesDetails = this.salesDetails;
    }, (error) => {
      this.toaster.error("Failed to do the operation, Please try again.");
    });

  }

  viewSalesById(salesId: any) {
    this.api.getApi(`api/sales/SalesID/` + salesId).subscribe((response) => {
      if (response) {
        this.singleSales = response;
        this.esalesId = salesId;
        this.customername = this.singleSales.CustomerName;
        this.mobileno = this.singleSales.Phone;
        this.aadharno = this.singleSales.Aadhar;
        this.carat_type = this.singleSales.CaratType;
        this.category_name = this.singleSales.CategoryName;
        this.sub_category = this.singleSales.SubCategoryName;
        this.itemname = this.singleSales.ItemName_Description;
        this.huid = this.singleSales.HUID;
        this.hsncode = this.singleSales.HSNCode;
        this.tagnumber = this.singleSales.Tagname;
        this.gramweight = this.singleSales.GrWeight_Grams;
        this.netweight = this.singleSales.NetWeight_Grams;
        this.ratepergram = this.singleSales.Rate_Per_Gram;
        this.panno = this.singleSales.Pan_Card;
        this.mcvalue = this.singleSales.Making_Charge;
        this.wcvalue = this.singleSales.Wastage_Charge;
        this.vavalue = this.singleSales.V_A;
        this.stonetype = this.singleSales.Stone_Type;
        this.stonepieces = this.singleSales.Stones_RsPs;
        this.stoneRs = this.singleSales.Stones_RsPs;
        this.discountRs = this.singleSales.Discount_RsPs;
        this.amountRs = this.singleSales.Amount_RsPs;
      }

    }, (error) => {
      this.toaster.error("Failed to do the operation, Please try again.");
    });
  }
  editSales(salesId: any) {
    let data = {
      "CustomerName": this.customername,
    }
    window.location.reload();
    this.api.putApi('api/sales/' + salesId, data).subscribe((response) => {

    });

  }
  filterSales() {

    // Filter using date if no date then use all sales
    if (this.searchTermDate != '') {
      this.filteredSalesDetails = this.salesDetails.filter(sales =>
        sales.createdAt.toLowerCase().includes(this.searchTermDate.toLowerCase())
      );
    } else {
      this.filteredSalesDetails = this.salesDetails;
    }

    // Filter using item name
    this.filteredSalesDetails = this.filteredSalesDetails.filter(sales =>
      sales.CustomerName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }





}
