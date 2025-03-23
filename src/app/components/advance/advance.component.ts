import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApicallService } from 'src/app/services/apicall.service';

@Component({
  selector: 'app-advance',
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.css']
})
export class AdvanceComponent {
  mobileno: any;
  advanceamt: any;
  desc: any;
  alladvances: any[] = [];
  custId: any;
  filteredAdvances: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  
  constructor(private api: ApicallService, private toaster: ToastrService) { }

  ngOnInit() {
    this.getAllAdvances();
  }

  getAllAdvances() {
    this.api.getApi("api/advance/").subscribe((response: any) => {
      this.alladvances = response;
      this.filteredAdvances = this.alladvances;
      console.log(this.filteredAdvances);
    }, (error) => {
      this.toaster.error("Failed to do the operation, Please try again.");
    });
  }
  add_advance(mobileno: any) {
    let data = {
      Amount: this.advanceamt,
      AdvanceDesc: this.desc
    };
    console.log(mobileno);
    this.api.postApi("api/advance/customer/" + this.custId, data).subscribe((response: any) => {
      this.getAllAdvances();
      this.toaster.success("Advance added successfully");
    }, (error) => {
      this.toaster.error("Failed to do the operation, Please try again.");
    });
  }

  filterAdvances() {
    this.filteredAdvances = this.alladvances.filter(advance => 
      advance.CustomerName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    console.log(this.filteredAdvances);
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
