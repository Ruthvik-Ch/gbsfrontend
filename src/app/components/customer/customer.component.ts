import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApicallService } from 'src/app/services/apicall.service';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent {
  customername: any;
  mobileno: any;
  aadharno: any;
  sviewBtns: any;
  singleSales: any;
  email: any;
  address: any;
  almobileno: any;
  panno: any;
  singleCustomer: any;
  newcustomername: any;
  newaadharno: any;
  newpanno: any;
  newemail: any;
  newaddress: any;
  newmobileno: any;
  newalmobileno: any;
  ecustomerid:any;
  mobileError: boolean = false;
  altMobileError: boolean = false;
  customerDetails: any[] = [];
  filteredCustomers: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;

  constructor(private api: ApicallService,  private toaster: ToastrService) {}
  ngOnInit() {
    this.getCustomers();
  }
  getCustomers(){
    this.api.getApi('api/customer/').subscribe((response) => {
      this.customerDetails = response;
      this.filteredCustomers = this.customerDetails;
    }, (error)=>{
      this.toaster.error("Failed to get customer, Please try again.");
    });
  }
  viewSalesById(customerid: any) {
    this.api.getApi('api/customer/CustID/' + customerid).subscribe((response) => {
        if (response) {
          this.singleCustomer = response;
          this.customername = this.singleCustomer.CustomerName;
          this.aadharno = this.singleCustomer.Aadhar;
          this.panno = this.singleCustomer.Pan_Card;
          this.email = this.singleCustomer.Email;
          this.address = this.singleCustomer.Address;
          this.mobileno = this.singleCustomer.Phone;
          this.almobileno = this.singleCustomer.AlternatePhone;
          this.ecustomerid = customerid;
        }
      }, (error)=>{
        this.toaster.error("Failed to do the operation, Please try again.");
      });
  }
  editCustomer(customerid:any){
    let data = {
      CustomerName: this.customername,
      Aadhar: this.aadharno,
      Pan_Card: this.panno,
      Email: this.email,
      Address: this.address,
      Phone: this.mobileno,
      AlternatePhone: this.almobileno,
    };
    this.api.putApi('api/customer/'+customerid, data).subscribe((response) => {
      this.getCustomers();
    }, (error)=>{
      this.toaster.error("Failed to do the operation, Please try again.");
    });
  }
  addcustomer() {
    let data = {
      CustomerName: this.newcustomername,
      Aadhar: this.newaadharno,
      Pan_Card: this.newpanno,
      Email: this.newemail,
      Address: this.newaddress,
      Phone: this.mobileno,
      AlternatePhone: this.newalmobileno,
    };
    this.api.postApi('api/customer/', data).subscribe((response) => {
      this.getCustomers();
    }, (error)=>{
      this.toaster.error("Failed to do the operation, Please try again.");
    });
  }

  validateMobile() {
    const phonePattern = /^[0-9]{10}$/; 
    this.mobileError = !phonePattern.test(this.mobileno);
  }
  
  
  validateAltMobile() {
    const phonePattern = /^[0-9]{10}$/; 
    this.altMobileError = !phonePattern.test(this.newalmobileno);
  }

  filterCustomers() {
    this.filteredCustomers = this.customerDetails.filter(customer => 
      customer.CustomerName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
