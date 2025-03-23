import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApicallService } from '../services/apicall.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  twentyfourKarat:any;
  twentytwoKarat:any;
  eighteenKarat:any;
  silver:any;
  loggedInUser: any = null;
  customerDetails: any[] = [];
  filteredCustomers: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;


  constructor(public authService: AuthService, private api: ApicallService, private toaster: ToastrService){}


  savegoldprice(){
    localStorage.setItem("24K",this.twentyfourKarat);
    localStorage.setItem("22K",this.twentytwoKarat);
    localStorage.setItem("18K",this.eighteenKarat);
    localStorage.setItem("Silver",this.silver);
    window.location.reload();
  }
  ngOnInit(){
    this.authService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user;
    });
    this.getCustomers();
    document.addEventListener("DOMContentLoaded", (event) => {
      this.twentyfourKarat = localStorage.getItem("24K");
      this.twentytwoKarat = localStorage.getItem("22K");
      this.eighteenKarat = localStorage.getItem("18K");
      this.silver = localStorage.getItem("Silver");
    });
  }

  getCustomers(){
    this.api.getApi('api/customer/').subscribe((response) => {
      this.customerDetails = response;
      this.filteredCustomers = this.customerDetails;
    }, (error)=>{
      this.toaster.error("Failed to get customers data, Please try again.");
    });
  }

  onSeacrhBtnClick(){
    this.getCustomers();
  }
  filterCustomers() {
    this.filteredCustomers = this.customerDetails.filter(customer => 
    (customer.CustomerName.toLowerCase().includes(this.searchTerm.toLowerCase())) || (customer.Phone.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }
  
}
document.addEventListener("DOMContentLoaded", (event) => {
  let sidebar = document.querySelector(".sidebar");
  let sidebarBtn = document.querySelector(".sidebarBtn");
    if(sidebarBtn!=null && sidebar!=null){
      sidebarBtn.addEventListener('click', (event)=> {
        sidebar!.classList.toggle("active");
        if(sidebar!.classList.contains("active")){
        sidebarBtn!.classList.replace("bx-menu" ,"bx-menu-alt-right");
       }else{
        sidebarBtn!.classList.replace("bx-menu-alt-right", "bx-menu");
       }
       });
    }
  });


