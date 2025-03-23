import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApicallService } from 'src/app/services/apicall.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent {

  constructor(private api: ApicallService,  private toaster: ToastrService){
    const dataStr = localStorage.getItem('loggedInUserGBS');
    if (dataStr) {
      this.loggedInUser =(JSON.parse(dataStr));
    }
  }
  carattype:any = "22K";
  categoryname:any;
  subcategoryname:any;
  quantity:any = "";
  categories:any[] =  [];
  filteredCategories:any[] = [];
  searchTerm: string = '';
  loggedInUser: any;


  ngOnInit(){
    const dataStr = localStorage.getItem('loggedInUserGBS');
    if (dataStr) {
      this.loggedInUser =(JSON.parse(dataStr));
    }
    this.getCategories();
  }
  getCategories(){
    this.api.getApi("api/categories/").subscribe((response) => {
      this.categories = response;
      this.filteredCategories = this.categories;
    }, (error)=>{
      this.toaster.error("Failed to do the operation, Please try again.");
    });
  }
  addcategory(){

    let data = {
      CaratType: this.carattype,
      CategoryName: this.categoryname,
      SubCategoryName: this.subcategoryname,
      Quantity: this.quantity? this.quantity: "1",
      Branch: this.loggedInUser.branch? this.loggedInUser.branch: "GBS"
    }
    
    this.api.postApi("api/categories/",data).subscribe((response) => {
      this.getCategories();
      this.toaster.success("Category added successfully.");
    }, (error)=>{
      this.toaster.error("Failed to do the operation, Please try again.");
    });


  }
  filterCategories() {
    this.filteredCategories = this.categories.filter(category => 
      category.CategoryName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  deleteCatRecord(id:any){  
    let body = {
      category: "",
      SubCategoryName: ""
    }

    for(let i=0; i<this.categories.length; i++){
      if(this.categories[i].CategoryID == id){
        body.category = this.categories[i].CategoryName;
        body.SubCategoryName = this.categories[i].SubCategoryName;
      }
    }

    this.api.putApi("api/categories/delete", body).subscribe((response) => {
      this.getCategories();
      this.toaster.success("Category deleted successfully.");
    }, (error)=>{
      this.toaster.error("Failed to do the operation, Please try again.");
    });
  }
}
