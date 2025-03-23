import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BarcodegenaratorComponent } from './components/barcodegenarator/barcodegenarator.component';
import { routes } from './app.router';
import { StockComponent } from './components/stock/stock.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BillingComponent } from './components/billing/billing.component';
import { SalesComponent } from './components/sales/sales.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { AdvanceComponent } from './components/advance/advance.component';
import { CustomizedordersComponent } from './components/customizedorders/customizedorders.component';
import { SchemeComponent } from './components/scheme/scheme.component';
import { CustomerComponent } from './components/customer/customer.component';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { NgxPaginationModule } from 'ngx-pagination';
import { BillingPreviewComponent } from './components/billingpreview/billingpreview.component';
import { BillingestimateComponent } from './components/billingestimate/billingestimate.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BarcodegenaratorComponent,
    StockComponent,
    LoginComponent,
    NavbarComponent,
    BillingComponent,
    BillingPreviewComponent,
    SalesComponent,
    ProductlistComponent,
    AdvanceComponent,
    CustomizedordersComponent,
    SchemeComponent,
    CustomerComponent,
    AddcategoryComponent,
    BillingestimateComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
    }),
    routes
  ],
  providers: [ToastrModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
