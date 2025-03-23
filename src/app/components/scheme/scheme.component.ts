import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApicallService } from 'src/app/services/apicall.service';

@Component({
  selector: 'app-scheme',
  templateUrl: './scheme.component.html',
  styleUrls: ['./scheme.component.css']
})
export class SchemeComponent {
  mobileno: any;
  schemeamt: any;
  desc: any;
  schemename: any;
  allSchemes: any[]=[];
  custId: any;

  filteredSchemes: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;

  constructor(private api: ApicallService, private toaster: ToastrService) { }

  ngOnInit() {
    this.getAllSchemes();
  }
  getAllSchemes() {
    this.api.getApi("api/schemes/").subscribe((response: any) => {
      this.allSchemes = response;
      this.filteredSchemes = this.allSchemes;
    }, (error) => {
      this.toaster.error("Failed to do the operation, Please try again.");
    });
  }
  add_scheme() {
    let data = {
      "SchemeName": this.schemename,
      "SchemeAmount": this.schemeamt,
      "SchemeDesc": this.desc
    };
    this.api.postApi("api/schemes/customer/" + this.custId, data).subscribe((response: any) => {
      this.getAllSchemes();
      this.toaster.success("Scheme added successfully");
    }, (error) => {
      this.toaster.error("Failed to do the operation, Please try again.");
    });

  }
  filterSchemes() {
    this.filteredSchemes = this.allSchemes.filter(schemes => 
      schemes.CustomerName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  getCustomerDetails() {
    
    if (this.custId) {
      this.api.getApi(`api/customer/CustID/${this.custId}`)
        .subscribe((data: any) => {
          this.mobileno = data.Phone || '';
        });
    } else {
      // Clear fields if customerID is empty
      this.mobileno = '';
    }
  }
}

