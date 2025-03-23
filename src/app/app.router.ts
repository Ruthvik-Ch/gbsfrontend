import {Routes,RouterModule} from '@angular/router';
import { BarcodegenaratorComponent } from './components/barcodegenarator/barcodegenarator.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {StockComponent} from './components/stock/stock.component';
import {LoginComponent} from './components/login/login.component'
import { NavbarComponent } from './navbar/navbar.component';
import { BillingComponent } from './components/billing/billing.component';
import { SalesComponent } from './components/sales/sales.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { AdvanceComponent } from './components/advance/advance.component';
import { CustomizedordersComponent } from './components/customizedorders/customizedorders.component';
import { SchemeComponent } from './components/scheme/scheme.component';
import { CustomerComponent } from './components/customer/customer.component';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';
import { AuthGuard } from './guards/auth.guard';
export const router: Routes=[
    {path:'',component:DashboardComponent, canActivate: [AuthGuard]},
    {path : 'dashboard',component : DashboardComponent, canActivate: [AuthGuard]},
    {path : 'barcodegen' ,component : BarcodegenaratorComponent, canActivate: [AuthGuard]},
    {path: 'stock',component:StockComponent, canActivate: [AuthGuard]},
    {path: 'billing',component:BillingComponent, canActivate: [AuthGuard]},
    {path:'navbar',component: NavbarComponent, canActivate: [AuthGuard]},
    {path:'sales',component: SalesComponent, canActivate: [AuthGuard]},
    {path: 'productlist',component:ProductlistComponent, canActivate: [AuthGuard]},
    {path: 'advance',component: AdvanceComponent, canActivate: [AuthGuard]},
    {path: 'customizedorders',component:CustomizedordersComponent, canActivate: [AuthGuard]},
    {path: 'schemes',component:SchemeComponent, canActivate: [AuthGuard]},
    {path: 'customer',component:CustomerComponent, canActivate: [AuthGuard]},
    {path: 'addcategory',component:AddcategoryComponent, canActivate: [AuthGuard]},
    {path: '**', component: LoginComponent}
];
export const routes = RouterModule.forRoot(router);