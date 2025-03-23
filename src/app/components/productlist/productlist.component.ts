import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApicallService } from 'src/app/services/apicall.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent {

  products: any[] = [];
  show: any;
  selectedLevel : any;
  categories : any;
  itemname: any;
  hsncode: any;
  gramweight:any;
  netweight: any;
  ratepergram:any;
  value:any;
  stoneRs:any;
  discountRs:any;
  amountRs: any;
  categoryName:any;
  subCategoryName:any;
  CategoryDropdownResponse : any;
  barcode:any;
  orchardLike: string = 'nnone';
  customername:any;
  mobileno:any;
  aadharno:any;
  pangstno:any;
  statecode:any;
  pbarcode:any;
  number:any;
  peditBtns:any;
  mctype:any = "amount";
  mgamount:any;
  wdamount:any;
  vaamout:any;
  stoneamount:any;
  isVisible!: boolean | false;
  stonepieces:any;
  stonepiecescts:any;
  SubCategoryDropdownResponse: any;
  carat: any;
  wctype: any;
  stonetype: any;
  stonepi: any;
  mcvalue: any;
  vavalue: any;
  wcvalue: any;
  huid:any;
  tagname: any;
  logvalu:any;
  filteredProducts: any[] = [];
  searchTerm: string = '';
  selectedSubCat: any;
  options: string[] = ['All'];
  currentPage: number = 1;
  loggedInUser: any;



  constructor(private api: ApicallService,  private toaster: ToastrService) {
    const dataStr = localStorage.getItem('loggedInUserGBS');
    if (dataStr) {
      this.loggedInUser =(JSON.parse(dataStr));
    }
  }

  ngOnInit() {
    this.api.postApi("api/categories/subcategories/", {}).subscribe((response: any) => {
      response.forEach((element: any) => {
        this.options.push(element);
      });
    }, (error)=>{
      this.toaster.error("Failed to do the operation, Please try again.");
    }) 
    this.api.getApi("api/products/").subscribe((response) => {
      this.products = response;
      this.filteredProducts = this.products;
    }, (error)=>{
      this.toaster.error("Failed to do the operation, Please try again.");
    });
  }
  seeSingleProduct(product_bar_code:any){

    this.api.getApi("api/products/"+product_bar_code).subscribe((response) => {
      this.logvalu=response.ItemName_Description;;
      this.itemname = response.ItemName_Description;
      this.categoryName = response.CategoryName,
      this.subCategoryName=response.SubCategoryName,
      this.hsncode = response.HSNCode,
      this.gramweight = response.GrWeight_Grams,
      this.netweight = response.NetWeight_Grams,
      this.vavalue = response.V_A,
      this.tagname = response.TagName,
      this.mcvalue = response.Making_Direct,
      this.huid = response.HUID,
      this.wcvalue = response.Wastage_Direct,
      this.stonetype=response.Stone_Type;
      this.stonepiecescts=response.Stone_Pieces_CTS;
      this.ratepergram = response.Rate_Per_Gram;
      this.stoneRs = response.Stones_RsPs,
      this.discountRs = response.Discount_RsPs,
      this.amountRs = response.Amount_RsPs
    }, (error)=>{
      this.toaster.error("Failed to do the operation, Please try again.");
    });

    
  }
  filterProducts(){
    if(this.selectedSubCat.toLowerCase() == 'all') {
      this.filteredProducts = this.products.filter(product => 
        product.ItemName_Description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }else{
      this.filteredProducts = this.products.filter(product => 
        product.ItemName_Description.toLowerCase().includes(this.searchTerm.toLowerCase()) && product.SubCategoryName.toLowerCase().includes(this.selectedSubCat.toLowerCase())
      );
    }

  }
  filterProductsByName() {
    // this.filteredProducts = this.products.filter(product => 
    //   product.ItemName_Description.toLowerCase().includes(this.searchTerm.toLowerCase())
    // );
  }
  filterProductsBySubCat(){
    // this.filteredProducts = this.filteredProducts.filter(product => 
    //   //product.SubCategory.toLowerCase().includes(this.searchTerm.toLowerCase())
    //   product.ItemName_Description.toLowerCase().includes(this.selectedSubCat.toLowerCase())
    // );
  }


  onSelectionChange(selectedSubCat: string) {
    console.log('Selected option:', selectedSubCat);
    // Perform any other action here
    this.selectedSubCat = selectedSubCat;
    this.filterProducts();
  }

  deleteProduct(hsncode:any,huid:any){
    let data = {
      ItemName_Description: this.itemname,
      HSNCode: this.hsncode+"",
      GrWeight_Grams: this.gramweight+"",
      NetWeight_Grams: this.netweight+"",
      Rate_Per_Gram: this.ratepergram+"",
      Stones_RsPs: this.stoneRs+"",
      Discount_RsPs: this.discountRs+"",
      Amount_RsPs: this.amountRs+"",
      BarCode_path: "barcode_path",
      BarCode: this.barcode,
      Branch: this.loggedInUser.branch
      
    };
    console.log("LOGGER");
      console.log(hsncode);
      this.api.putApi("api/products/delete/"+hsncode+"/"+huid,data).subscribe(() => {
        this.fetchItems();
        console.log('Hi');
      }, (error)=>{
        this.toaster.error("Failed to do the operation, Please try again.");
      })
    
  }

  updateProduct(hsncode:any,huid:any){
    this.calculate();
    this.stonecalculate();
    let data = {
      ItemName_Description: this.itemname,
      HSNCode: this.hsncode+"",
      GrWeight_Grams: this.gramweight+"",
      NetWeight_Grams: this.netweight+"",
      Rate_Per_Gram: this.ratepergram+"",
      Stones_RsPs: this.stoneRs+"",
      Discount_RsPs: this.discountRs+"",
      Amount_RsPs: this.amountRs+"",
      BarCode: this.barcode,
      Branch: this.loggedInUser.branch
    };
    console.log("LOGGER FOR Update");
      console.log(hsncode);

      this.api.putApi("api/products/"+hsncode+"/"+huid,data).subscribe(() => {
        this.fetchItems();
        console.log('Hi');
      }, (error)=>{
        this.toaster.error("Failed to do the operation, Please try again.");
      })
    
  }

  fetchItems() {
    this.api.getApi("api/products/").subscribe((response) => {
      this.products = response;
      this.filteredProducts = this.products;
    }, (error)=>{
      this.toaster.error("Failed to do the operation, Please try again.");
    });
  }


  getCategoryValue(event:any){
    this.CategoryDropdownResponse = event.target.value;
  }
  getSubCategoryValue(event:any){
    this.SubCategoryDropdownResponse = event.target.value;
  }
  getCaratValue(event:any){
    this.carat = event.target.value;
  }
  // getMcValue(event:any){
  //   this.mctype = event.target.value;
  //   this.mgcalculate();
  // }
  getWcValue(event:any){
    this.wctype = event.target.value;
    this.wdcalculate();
  }
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
  mgcalculate(){
    if(this.mctype =="percentage" ){
      this.mgamount = (this.netweight*this.ratepergram*this.mcvalue)/100;
    }
    else{
      this.mgamount = parseInt(this.mcvalue);
    }
    if(this.wdamount == undefined){
      this.vavalue = this.mgamount;
      this.amountRs = this.netweight*this.ratepergram+this.mgamount;
    }
    else{
      this.vavalue = this.mgamount+this.wdamount;
      this.amountRs = this.netweight*this.ratepergram+this.mgamount+this.wdamount;
    }
    this.amountRs = this.amountRs.toFixed(4);
  }

  wdcalculate(){
    if(this.wctype =="percentage" ){
      this.wdamount = (this.netweight*this.ratepergram*this.wcvalue)/100;
    }
    else{
      this.wdamount = parseInt(this.wcvalue);
    }
    if(this.mgamount == undefined){
      this.vavalue = this.wdamount;
      this.amountRs = this.netweight*this.ratepergram+this.wdamount;
    }
    else{
      this.vavalue = this.mgamount+this.wdamount;
      this.amountRs = this.netweight*this.ratepergram+this.mgamount+this.wdamount;
    }
    this.amountRs = this.amountRs.toFixed(4);
  }
  stonecalculate(){
    if(this.stonepi == "pieces"){
      this.stoneamount = this.stoneRs*this.stonepieces;
    }
    else{
      this.stoneamount = parseInt(this.stoneRs);
    }
    if(this.mgamount == undefined && this.wdamount == undefined){
      this.amountRs = this.netweight*this.ratepergram+this.stoneamount;
    }
    else if(this.mgamount == undefined){
      this.amountRs = this.netweight*this.ratepergram+this.wdamount+this.stoneamount;
    }
    else if(this.wdamount == undefined){
      this.amountRs = this.netweight*this.ratepergram+this.mgamount+this.stoneamount;
    }
    else{
      this.amountRs = this.netweight*this.ratepergram+this.mgamount+this.wdamount+this.stoneamount;
    }
    this.amountRs = this.amountRs.toFixed(4);
  }
  calculate(){
    if(this.discountRs == undefined){
      this.amountRs = this.netweight*this.ratepergram+this.stoneamount+this.vavalue;
    }
    else{
      this.amountRs = this.netweight*this.ratepergram+this.stoneamount+this.vavalue-this.discountRs;
    }
    this.amountRs = this.amountRs.toFixed(4);
  }
}



// hrow.insertCell(9).innerHTML=`<button type="submit" " data-bs-toggle="modal" data-bs-target="#productEditModal" class="btn btn-primary pedit-Btns">Edit</button>`;
