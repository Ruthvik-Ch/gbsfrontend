import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApicallService } from "src/app/services/apicall.service";
import * as uuid from 'uuid';



declare var bitconverter: any;
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})

export class StockComponent {
  
  show: any;
  selectedLevel : any;
  categories : any;
  itemname: any;
  hsncode: any;
  gramweight:any;
  netweight: any;
  ratepergram:any;
  vavalue:any;
  stoneRs:any;
  discountRs:any;
  amountRs: any;
  CategoryDropdownResponse : any;
  SubCategoryDropdownResponse:any;
  barcode:any;
  orchardLike: string = 'nnone';
  huid:any;
  tagnumber:any;
  carat:any;
  mctype:any;
  stonetype:any;
  stonepi :any;
  mcvalue:any;
  wctype:any;
  wcvalue:any;
  tgnumber:any;
  mgamount:any;
  wdamount:any;
  stoneamount:any;
  isVisible!: boolean | false;
  stonepieces:any;
  uniqueCategories: any;
  showAnim: boolean = false;
  isAddSuccess: boolean = false;
  loggedInUser: any;
  subCatList: any[] = [];
  wastageWeight: any;
  pricePerStone: any;

  constructor(private api: ApicallService,  private toaster: ToastrService) {
    const dataStr = localStorage.getItem('loggedInUserGBS');
    if (dataStr) {
      this.loggedInUser =(JSON.parse(dataStr));
    }
    this.ratepergram = localStorage.getItem("22K");
  }
  ngOnInit() {
    this.api.getApi("api/categories/").subscribe((response: any) => {
      this.categories = response;
      this.uniqueCategories = this.getUnqCats(this.categories);
    }, (error)=>{
      this.toaster.error("Failed to do the operation, Please try again.");
    });
  }
  getUnqCats(categories: any){
    let tempUniqueCategories: any[] = [];
    for(let i=0; i<categories.length; i++){
      if(tempUniqueCategories.indexOf(categories[i].CategoryName) == -1){
        tempUniqueCategories.push(categories[i].CategoryName);
      }
    }
    console.log(tempUniqueCategories);
    return tempUniqueCategories;
  }
  getStoneVal(){
    this.stoneRs = this.pricePerStone*this.stonepieces;
  }
 
  getVA() {
    // Calculate VA as sum of mcvalue and wcvalue
    this.vavalue = Number(this.mcvalue) + Number(this.wcvalue);
    
    // Calculate amountRs whenever VA changes
    this.calculateAmount();
  }

  cal_wastage_amount() {
    this.wcvalue = this.ratepergram * this.wastageWeight;
    console.log(this.wcvalue, this.wastageWeight);
    // Recalculate VA when wastage changes
    this.getVA();
  }

  calculateAmount() {
    if(this.netweight && this.ratepergram && this.vavalue) {
      this.amountRs = (Number(this.netweight) * Number(this.ratepergram)) + Number(this.vavalue) + Number(this.stoneRs);
      this.amountRs = this.amountRs.toFixed(4);
    }
  }

  getCategoryValue(event:any){
    this.CategoryDropdownResponse = event.target.value;
    this.getSubCatListFromCat(this.CategoryDropdownResponse);
  }
  getSubCatListFromCat(cat: string){
    this.subCatList = [];
    this.categories.forEach((element: any) => {
      if(element.CategoryName == cat){
        this.subCatList.push(element.SubCategoryName);
      }
    });
  }
  getSubCategoryValue(event:any){
    this.SubCategoryDropdownResponse = event.target.value;
  }
  getCaratValue(event:any){
    this.carat = event.target.value;
    if(this.carat =="24K"){
      this.ratepergram = localStorage.getItem("24K");
    }
    else if(this.carat == "22K"){
      this.ratepergram = localStorage.getItem("22K");
    }
    else if(this.carat == "18K"){
      this.ratepergram = localStorage.getItem("18K");
    }
    else{
      this.ratepergram = localStorage.getItem("Silver");
    }
  }
  // getMcValue(event:any){
  //   this.mctype = event.target.value;
  //   this.mgcalculate();
  // }
  // getWcValue(event:any){
  //   this.wctype = event.target.value;
  //   //this.wdcalculate();
  //   this.getWastageAmt();
  // }
  // cal_wastage_amount(){
  //   this.wcvalue = this.ratepergram*this.wastageWeight;
  //   console.log(this,this.wcvalue, this.wastageWeight);
  // }
  getStoneType(event:any){
    this.stonetype = event.target.value;
  }
  getStone(event:any){
    this.stonepi = event.target.value;
    if(this.stonepi == "pieces"){
      this.isVisible = true;
    }
    else{
      this.isVisible = false;
    }
  }

  getWastageAmt(){
    this.wcvalue = this.ratepergram * this.wastageWeight;
    //this.wdcalculate();
  }

  // mgcalculate(){
  //   if(this.mctype =="percentage" ){
  //     this.mgamount = (this.netweight*this.ratepergram*this.mcvalue)/100;
  //   }
  //   else{
  //     this.mgamount = parseInt(this.mcvalue);
  //   }
  //   if(this.wdamount == undefined){
  //     this.vavalue = this.mgamount;
  //     this.amountRs = this.netweight*this.ratepergram+this.mgamount;
  //   }
  //   else{
  //     this.vavalue = this.mgamount+this.wdamount;
  //     this.amountRs = this.netweight*this.ratepergram+this.mgamount+this.wdamount;
  //   }
  //   this.amountRs = this.amountRs.toFixed(4);
  // }


  // stonecalculate(){
  //   if(this.stonepi == "pieces"){
  //     this.stoneamount = this.stoneRs*this.stonepieces;
  //   }
  //   else{
  //     this.stoneamount = parseInt(this.stoneRs);
  //   }
  //   if(this.mgamount == undefined && this.wdamount == undefined){
  //     this.amountRs = this.netweight*this.ratepergram+this.stoneamount;
  //   }
  //   else if(this.mgamount == undefined){
  //     this.amountRs = this.netweight*this.ratepergram+this.wdamount+this.stoneamount;
  //   }
  //   else if(this.wdamount == undefined){
  //     this.amountRs = this.netweight*this.ratepergram+this.mgamount+this.stoneamount;
  //   }
  //   else{
  //     this.amountRs = this.netweight*this.ratepergram+this.mgamount+this.wdamount+this.stoneamount;
  //   }
  //   this.amountRs = this.amountRs.toFixed(4);
    
  // }
  // calculate(){
  //   this.amountRs = this.netweight*this.ratepergram;
  //   this.amountRs = this.amountRs.toFixed(4);
  // }
  submit_product() {
    let myId = uuid.v4();
    
    // Calculate final amount before submission
    this.calculateAmount();

    let data = {
      ItemName_Description: this.itemname + "",
      HSNCode: this.hsncode + "",
      HUID: this.huid + "",
      TagName: this.tgnumber + "",
      BarCode_Prefix: this.barcode + "",
      GrWeight_Grams: this.gramweight + "",
      NetWeight_Grams: this.netweight + "",
      Rate_Per_Gram: this.ratepergram + "",
      Making_Charge: this.mcvalue + "",
      Making_Direct: this.mcvalue + "",  // Changed from mctype to mcvalue
      Wastage_Charge: this.wcvalue + "",  // Changed from wctype to wcvalue
      Wastage_Direct: this.wcvalue + "",
      V_A: this.vavalue + "",
      Stone_Type: this.stonetype + "",
      Stone_Pieces_CTS: this.stonepi + "",
      Stone_Pieces: this.stonepieces + "",
      Stones_RsPs: this.stoneRs + "",
      Discount_RsPs: "0",
      Amount_RsPs: this.amountRs + "",  // Now includes VA value
      BarCode: this.barcode + myId.slice(0, 8),
      Branch: this.loggedInUser.branch ? this.loggedInUser.branch : "",
      categoryName: this.CategoryDropdownResponse ? this.CategoryDropdownResponse : "",
      SubCategoryName: this.SubCategoryDropdownResponse ? this.SubCategoryDropdownResponse : "",
    };

    console.log(data);
    this.api.postApi("api/products/", data).subscribe((response) => {
      this.toaster.success("Product added successfully");
      this.setAnim();
    }, (error) => {
      this.toaster.error("Failed to do the operation, Please try again.");
    });
  }
  setAnim(){
    this.showAnim = false;
    this.itemname = '';
    this.huid = '';
    this.hsncode = '';
    this.tgnumber = '';
    this.barcode = '';
    this.gramweight = null;
    this.netweight = null;
    this.ratepergram = null;
    this.mcvalue = null;
    this.wcvalue = null;
    this.vavalue = null;
    this.stonepieces = null;
    this.stoneRs = null;

  }
}