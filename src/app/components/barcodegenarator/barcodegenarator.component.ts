import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import JsBarcode from 'jsbarcode';
import { ApicallService } from 'src/app/services/apicall.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-barcodegenarator',
  templateUrl: './barcodegenarator.component.html',
  styleUrls: ['./barcodegenarator.component.css']
})
export class BarcodegenaratorComponent implements OnInit, AfterViewChecked {
  products: any = []; 
  barcodesGenerated: boolean = false;

  constructor(
    private api: ApicallService,
    private toaster: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Fetch products from API
    this.api.getApi("api/products/").subscribe(
      (response) => {
        this.products = response;
        this.barcodesGenerated = false; // Ensure barcodes will be regenerated
        console.log(this.products);
      },
      (error) => {
        this.toaster.error("Failed to do the operation, Please try again.");
      }
    );
  }

  ngAfterViewChecked() {
    if (!this.barcodesGenerated && this.products.length > 0) {
      this.products.forEach((product: any) => {
        this.generateBarcode(product.BarCode, product.ProductID);
      });
      this.barcodesGenerated = true; 
    }
  }
  generateBarcode(barcode: string, productId: number): void {
    const barcodeElement = document.getElementById(`barcode-${productId}`);
    if (barcodeElement) {
      JsBarcode(barcodeElement, barcode, {
        // format: "CODE128",
        displayValue: true,
        height: 60,
        margin: 10,
      });
    }
  }
}
