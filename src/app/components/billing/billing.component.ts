import { Component, Renderer2, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApicallService } from "src/app/services/apicall.service";
import { BillingPreviewComponent } from '../billingpreview/billingpreview.component';
import { BillingestimateComponent } from '../billingestimate/billingestimate.component';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {
  // Existing properties
  show: any;
  selectedLevel: any;
  categories: any;
  itemname: any;
  hsncode: any;
  gramweight: any;
  netweight: any;
  ratepergram: any;
  value: any;
  stoneRs: any;
  discountRs: any;
  amountRs: any;
  CategoryDropdownResponse: any;
  barcode: any;
  orchardLike: string = 'nnone';
  customername: any;
  mobileno: any;
  aadharno: any;
  pangstno: any;
  pancardno: any;
  custId: any;
  statecode: any;
  pbarcode: any;
  number: any;
  peditBtns: any;
  mctype: any = "amount";
  mgamount: any;
  wdamount: any;
  vaamout: any;
  stoneamount: any;
  isVisible!: boolean | false;
  stonepieces: any;
  SubCategoryDropdownResponse: any;
  carat: any;
  wctype: any;
  stonetype: any;
  stonepi: any;
  mcvalue: any;
  vavalue: any;
  wcvalue: any;
  huid: any;
  tagnumber: any;
  logvalu: any;
  categoryname: any;
  subcategoryname: any;
  ngDropdown: any;
  existingadvances: any;
  valid_advances: number[] = [];
  advance_flag!: boolean | false;
  maxAdvAmt: number = 0;
  advAmount: number = 0;
  maxSchemeAmt: number = 0;
  schemeAmt: number = 0;
  showAnim: boolean = false;
  isAddSuccess: boolean = false;
  loggedInUser: any;

  @ViewChild(BillingPreviewComponent) billingPreview!: BillingPreviewComponent
  @ViewChild(BillingestimateComponent) billingestimate!: BillingestimateComponent

  showPreview: boolean = false;  // Controls modal visibility
  showEstimate: boolean = false; 
  billPreviewData: any = {};     // Holds billing data for preview
  billEstimateData: any = {};    // Holds billing esitimate data

  constructor(
    private api: ApicallService,
    private renderer: Renderer2,
    private toaster: ToastrService
  ) {
    const dataStr = localStorage.getItem('loggedInUserGBS');
    if (dataStr) {
      this.loggedInUser = JSON.parse(dataStr);
    }
  }

  ngOnInit() {
    this.api.getApi("api/categories/").subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        this.toaster.error("Failed to load categories, Please try again.");
      }
    );
  }

  setAnim() {
    this.showAnim = false;
  }

  onAdvAmtChange() {
    if (this.advAmount > this.maxAdvAmt) {
      this.toaster.error("Advance amount cannot be greater than the maximum advance amount");
      this.advAmount = this.maxAdvAmt;
    }
  }

  onSchemeChange() {
    if (this.schemeAmt > this.maxSchemeAmt) {
      this.toaster.error("Scheme amount cannot be greater than the maximum scheme amount");
      this.schemeAmt = this.maxSchemeAmt;
    }
  }

  getProductDetails(productBarCode: any) {
    this.api.getApi("api/products/" + productBarCode).subscribe((response) => {
      this.carat = response.CaratType + "K";
      this.categoryname = response.CategoryName;
      this.subcategoryname = response.SubCategoryName;
      this.logvalu = response.ItemName_Description;
      this.itemname = response.ItemName_Description;
      this.huid = response.HUID;
      this.hsncode = response.HSNCode,
        this.tagnumber = response.TagName,
        this.gramweight = response.GrWeight_Grams,
        this.netweight = response.NetWeight_Grams,
        this.ratepergram = response.Rate_Per_Gram,
        this.mctype = response.Making_Direct,
        this.mcvalue = response.Making_Charge,
        this.wctype = response.Wastage_Charge,
        this.wcvalue = response.Wastage_Direct,
        this.vavalue = response.V_A,
        this.stoneRs = response.Stones_RsPs,
        this.discountRs = response.Discount_RsPs,
        this.amountRs = response.Amount_RsPs
    }, (error) => {
      this.toaster.error("Failed to do the operation, Please try again.");
    });
  }

  getLocalProductDetails(productBarCode: any) {
    // Implement local product details logic
  }

  getAdvances() {
    // Implement advances logic
  }

  add_billing_product(product_bar_code: any) {
    if (product_bar_code == undefined || product_bar_code.length <= 9) {
      document.getElementById("pbarcode-error")!.innerText = "The product bar code length should be 10";
    }
    if (product_bar_code.length == 10) {
      document.getElementById("pbarcode-error")!.innerText = "";
      let table: HTMLTableElement = <HTMLTableElement>document.getElementById("billing-tbody");
      if (table.rows.length > 0) {
        table.deleteRow(0);
      }
      let hrow = table.insertRow(0);
      let single_product_details: any[];
      
      this.api.getApi("api/advance/total/" + this.custId).subscribe((response) => {
        if (response != null && response.totalAmount != null && response.totalAmount > 0) {
          this.maxAdvAmt = response.totalAmount;
          this.advAmount = response.totalAmount;
        } else {
          this.toaster.info("No advances available for this customer");
        }
      }, (error) => {
        this.toaster.error("Failed to do the operation, Please try again.");
      });

      this.api.getApi("api/schemes/total/" + this.custId).subscribe((response) => {
        if (response != null && response.totalAmount != null && response.totalAmount > 0) {
          this.maxSchemeAmt = response.totalAmount;
          this.schemeAmt = response.totalAmount;
        } else {
          this.toaster.info("No schemes available for this customer");
        }
      }, (error) => {
        this.toaster.error("Failed to do the operation, Please try again.");
      });

      this.api.getApi("api/products/" + product_bar_code).subscribe((response) => {
        this.logvalu = response.ItemName_Description;
        this.itemname = response.ItemName_Description;
        this.hsncode = response.HSNCode,
          this.gramweight = response.GrWeight_Grams,
          this.netweight = response.NetWeight_Grams,
          this.ratepergram = response.Rate_Per_Gram,
          this.vavalue = response.V_A,
          this.stonetype = response.Stone_Type,
          this.stoneRs = response.Stones_RsPs,
          this.stonepi = response.Stone_Pieces_CTS,
          this.discountRs = response.Discount_RsPs,
          this.amountRs = response.Amount_RsPs
        if (this.stonepi == "pieces") {
          this.isVisible = true;
          this.stonepieces = response.Stone_Pieces;
        }
        single_product_details = [this.logvalu, this.hsncode, this.gramweight, this.netweight, this.ratepergram, this.vavalue, this.stoneRs, this.discountRs, this.amountRs];

        for (let i = 0; i < 9; i++) {
          let cell = hrow.insertCell(i);
          cell.innerHTML = single_product_details[i];
        }
        hrow.insertCell(9).innerHTML = `<button type="submit" data-pbcode="` + product_bar_code + `" data-bs-toggle="modal" data-bs-target="#productEditModal" class="btn btn-primary pedit-Btns">Edit</button>`;
        this.addButton(hrow);
        let pbarcodeelem = <HTMLInputElement>document.getElementById("pbarcode-inp");
        pbarcodeelem!.value = "";
        this.peditBtns = document.querySelectorAll(".pedit-Btns");
        [...this.peditBtns].forEach((peditBtn) => {
          peditBtn.addEventListener('click', () => {
            this.getLocalProductDetails(peditBtn.getAttribute("data-pbcode"));
          });
        });
      }, (error) => {
        this.toaster.error("Failed to do the operation, Please try again.");
      });
    }
    this.getProductDetails(product_bar_code);
  }

  addRow(single_product_details: any[]) {
    let hrow = this.renderer.createElement('tr');
    for (let i = 0; i <= single_product_details.length; i++) {
      let cell = hrow.insertCell(i);
      cell.innerHTML = single_product_details[i];
    }
    this.addButton(hrow);
    const table = document.getElementById('billing-tbody');
    table?.appendChild(hrow);
  }

  addButton(hrow: any) {
    const button = this.renderer.createElement('button');
    const text = this.renderer.createText('Gen Bill');
    this.renderer.appendChild(button, text);
    this.renderer.addClass(button, 'btn');
    this.renderer.addClass(button, 'btn-primary');
    this.renderer.listen(button, 'click', () => this.generateBill());
    hrow.insertCell(10).appendChild(button);

    const button2 = this.renderer.createElement('button');
    const text2 = this.renderer.createText('Estimate');
    this.renderer.appendChild(button2, text2);
    this.renderer.addClass(button2, 'btn');
    this.renderer.addClass(button2, 'btn-primary');
    this.renderer.listen(button2, 'click', () => this.generateEstimate());
    hrow.insertCell(11).appendChild(button2);
  }




  generateEstimate() {
    console.log('📄 Generating Estimate preview...');
    this.billEstimateData = {
      customerDetails: {
        name: this.customername || 'N/A',
        phone: this.mobileno || 'N/A',
        aadhar: this.aadharno || 'N/A',
        pan: this.pancardno || 'N/A'
      },
      productDetails: {
        itemName: this.itemname || 'N/A',
        category: this.categoryname || 'N/A',
        subCategory: this.subcategoryname || 'N/A',
        hsnCode: this.hsncode || 'N/A',
        grweight:this.gramweight||'N/A',
        weight: this.netweight || 0,
        rate: this.ratepergram || 0
      },
      financials: {
        baseAmount: (this.netweight * this.ratepergram) || 0,
        makingCharge: this.mcvalue || 0,
        wastageCharge: this.wcvalue || 0,
        vaCharge: this.vavalue || 0,
        stoneCharge: this.stoneRs || 0,
        discount: this.discountRs || 0,
        advanceUsed: this.advAmount || 0,
        schemeUsed: this.schemeAmt || 0,
        totalAmount: this.amountRs || 0
      }
    };
    this.showEstimate = true;
    console.log('✅ Estimate data:', this.billEstimateData);
  }
  generateBill() {
    console.log('📄 Generating bill preview...');
    this.billPreviewData = {
      customerDetails: {
        name: this.customername || 'N/A',
        phone: this.mobileno || 'N/A',
        aadhar: this.aadharno || 'N/A',
        pan: this.pancardno || 'N/A'
      },
      productDetails: {
        itemName: this.itemname || 'N/A',
        category: this.categoryname || 'N/A',
        subCategory: this.subcategoryname || 'N/A',
        hsnCode: this.hsncode || 'N/A',
        grweight:this.gramweight||'N/A',
        weight: this.netweight || 0,
        rate: this.ratepergram || 0
      },
      financials: {
        baseAmount: (this.netweight * this.ratepergram) || 0,
        makingCharge: this.mcvalue || 0,
        wastageCharge: this.wcvalue || 0,
        vaCharge: this.vavalue || 0,
        stoneCharge: this.stoneRs || 0,
        discount: this.discountRs || 0,
        advanceUsed: this.advAmount || 0,
        schemeUsed: this.schemeAmt || 0,
        totalAmount: this.amountRs || 0
      }
    };
    this.showPreview = true;
    console.log('✅ Bill preview data:', this.billPreviewData);
  }

  closePreview() {
    console.log('❌ Closing preview from parent...');
    this.showPreview = false; // ✅ Hides preview when closed
  }
  closeEstimate() {
    console.log('❌ Closing Estimate from parent...');
    this.showEstimate = false; // ✅ Hides preview when closed
  }

  confirmBill() {
    console.log('✅ Confirm bill received from preview component');
    const postData = {
      "CustomerName": this.customername || "",
      "Aadhar": this.aadharno || "",
      "Phone": this.mobileno || "",
      "Pan_Card": this.pancardno || "",
      "StateCode": this.statecode || "12345",
      "BarCode": this.pbarcode || "",
      "ItemName_Description": this.itemname || "",
      "CategoryName": this.categoryname || "",
      "SubCategoryName": this.subcategoryname || "",
      "HSNCode": this.hsncode || "",
      "CaratType": this.carat || "",
      "HUID": this.huid || "",
      "TagName": this.tagnumber || "",
      "GrWeight_Grams": this.gramweight || "",
      "NetWeight_Grams": this.netweight || "",
      "Rate_Per_Gram": this.ratepergram || "",
      "Making_Charge": this.mcvalue || "",
      "Wastage_Charge": this.wcvalue || "",
      "V_A": this.vavalue || "",
      "Stone_Type": this.stonetype || "",
      "Stone_Pieces_CTS": this.stonepieces || "",
      "Stones_RsPs": this.stoneRs || "",
      "Discount_RsPs": this.discountRs || "",
      "Amount_RsPs": this.amountRs || "",
      "AdvanceAmount": this.advAmount || "",
      "Stone_Pieces": this.stonepieces || "",
      "SchemeAmount": this.schemeAmt || ""
    };

    this.api.postApi("api/sales/", postData).subscribe(
      (response) => {
        console.log('📦 API response:', response);
        this.handleSuccessResponse();
        this.showPreview = false;
      },
      (error) => {
        console.error('⚠️ API error:', error);
        this.handleErrorResponse();
        this.showPreview = false;
      }
    );
  }

  private handleSuccessResponse() {
    this.toaster.success("Bill generated successfully");
    this.showAnim = true;
    this.isAddSuccess = true;

    if (this.advAmount > 0) {
      this.updateAdvance();
    }

    if (this.schemeAmt > 0) {
      this.updateScheme();
    }

    this.deleteProduct();
    this.clearForm();
  }

  private handleErrorResponse() {
    this.showAnim = true;
    this.isAddSuccess = false;
    this.toaster.error("Failed to generate bill, Please try again.");
  }

  private updateAdvance() {
    const advData = {
      Amount: "-" + this.advAmount,
      AdvanceDesc: "Spent on " + this.itemname + " item purchase"
    };
    this.api.postApi("api/advance/customer/" + this.custId, advData).subscribe(
      () => { },
      (error) => this.toaster.error("Advance update failed")
    );
  }

  private updateScheme() {
    const schData = {
      "SchemeName": "Purchase " + this.itemname,
      "SchemeAmount": "-" + this.schemeAmt,
      "SchemeDesc": "Spent on " + this.itemname + " item purchase"
    };
    this.api.postApi("api/schemes/customer/" + this.custId, schData).subscribe(
      () => { },
      (error) => this.toaster.error("Scheme update failed")
    );
  }

  private deleteProduct() {
    this.api.putApi("api/products/delete/" + this.hsncode + "/" + this.huid, {}).subscribe(
      () => { },
      (error) => this.toaster.error("Product deletion failed")
    );
  }

  private clearForm() {
    this.custId = null;
    this.customername = '';
    this.mobileno = '';
    this.aadharno = '';
    this.pancardno = '';
    this.itemname = '';
    this.amountRs = 0;
  }

  getCategoryValue(event: any) {
    this.CategoryDropdownResponse = event.target.value;
  }

  getSubCategoryValue(event: any) {
    this.SubCategoryDropdownResponse = event.target.value;
  }

  getCaratValue(event: any) {
    this.carat = event.target.value;
    if (this.carat == "24K") {
      this.ratepergram = localStorage.getItem("24K");
    }
    else if (this.carat == "22K") {
      this.ratepergram = localStorage.getItem("22K");
    }
    else if (this.carat == "18K") {
      this.ratepergram = localStorage.getItem("18K");
    }
    else {
      this.ratepergram = localStorage.getItem("Silver");
    }
  }

  getWcValue(event: any) {
    this.wctype = event.target.value;
    this.wdcalculate();
  }

  getStoneType(event: any) {
    this.stonetype = event.target.value;
  }

  getStone(event: any) {
    this.stonepi = event.target.value;
    this.isVisible = this.stonepi == "pieces";
  }

  mgcalculate() {
    this.mgamount = this.mctype == "percentage" ?
      (this.netweight * this.ratepergram * this.mcvalue) / 100 :
      parseInt(this.mcvalue);

    if (this.wdamount == undefined) {
      this.vavalue = this.mgamount;
      this.amountRs = this.netweight * this.ratepergram + this.mgamount;
    }
    else {
      this.vavalue = this.mgamount + this.wdamount;
      this.amountRs = this.netweight * this.ratepergram + this.mgamount + this.wdamount;
    }
    this.amountRs = this.amountRs.toFixed(4);
  }

  wdcalculate() {
    this.wdamount = this.wctype == "percentage" ?
      (this.netweight * this.ratepergram * this.wcvalue) / 100 :
      parseInt(this.wcvalue);

    if (this.mgamount == undefined) {
      this.vavalue = this.wdamount;
      this.amountRs = this.netweight * this.ratepergram + this.wdamount;
    }
    else {
      this.vavalue = this.mgamount + this.wdamount;
      this.amountRs = this.netweight * this.ratepergram + this.mgamount + this.wdamount;
    }
    this.amountRs = this.amountRs.toFixed(4);
  }

  stonecalculate() {
    this.stoneamount = this.stonepi === "pieces" ?
        (Number(this.stoneRs) * Number(this.stonepieces)) :
        Number(this.stoneRs);

    // let base = this.netweight * this.ratepergram;
    // if (this.mgamount == undefined && this.wdamount == undefined) {
    //   this.amountRs = base + this.stoneamount;
    // }
    // else if (this.mgamount == undefined) {
    //   this.amountRs = base + this.wdamount + this.stoneamount;
    // }
    // else if (this.wdamount == undefined) {
    //   this.amountRs = base + this.mgamount + this.stoneamount;
    // }
    // else {
    //   this.amountRs = base + this.mgamount + this.wdamount + this.stoneamount;
    // }
    // this.amountRs = this.amountRs.toFixed(4);
  }

  calculate() {
    const netWeight = Number(this.netweight);
    const ratePerGram = Number(this.ratepergram);
    const stoneAmount = Number(this.stoneamount);
    const vaValue = Number(this.vavalue || 0);
    const discountRs = Number(this.discountRs || 0);

    this.amountRs = (netWeight * ratePerGram) - discountRs;
    this.amountRs = this.amountRs.toFixed(4);
  }

  getCustomerDetails() {
    if (this.custId) {
      this.api.getApi(`api/customer/CustID/${this.custId}`)
        .subscribe((data: any) => {
          this.customername = data.CustomerName || '';
          this.mobileno = data.Phone || '';
          this.aadharno = data.Aadhar || '';
          this.pancardno = data.Pan_Card || '';
        });
    } else {
      this.customername = '';
      this.mobileno = '';
      this.aadharno = '';
      this.statecode = '';
    }
  }

  editBillDetails() {
    this.calculate();
    this.stonecalculate();
    let data = {
      ItemName_Description: this.itemname,
      HSNCode: this.hsncode + "",
      GrWeight_Grams: this.gramweight + "",
      NetWeight_Grams: this.netweight + "",
      Rate_Per_Gram: this.ratepergram + "",
      Making_Direct: this.mctype,
      Making_Charge: this.mcvalue,
      Wastage_Charge: this.wctype,
      Wastage_Direct: this.wcvalue,
      V_A: this.vavalue,
      Stones_RsPs: this.stoneRs,
      Stone_Pieces_CTS: this.stonetype,
      Discount_RsPs: this.discountRs,
      Amount_RsPs: this.amountRs,
      BarCode_path: "Pathuuuu",
      BarCode: this.barcode,
      Branch: this.loggedInUser.branch,
    };

    let table: HTMLTableElement = <HTMLTableElement>document.getElementById("billing-tbody");
    let updatedProductDetails: any[] = [];
    if (table.rows.length == 1) {
      table.deleteRow(0);
      let hrow = table.insertRow(0);
      updatedProductDetails = [this.logvalu, this.hsncode, this.gramweight, this.netweight, this.ratepergram, this.vavalue, this.stoneRs, this.discountRs, this.amountRs];

      for (let i = 0; i < 9; i++) {
        let cell = hrow.insertCell(i);
        cell.innerHTML = updatedProductDetails[i];
      }
      hrow.insertCell(9).innerHTML = `<button type="submit" data-pbcode="` + this.pbarcode + `" data-bs-toggle="modal" data-bs-target="#productEditModal" class="btn btn-primary pedit-Btns">Edit</button>`;
      this.addButton(hrow);
      let pbarcodeelem = <HTMLInputElement>document.getElementById("pbarcode-inp");
      pbarcodeelem!.value = "";
      this.peditBtns = document.querySelectorAll(".pedit-Btns");
      [...this.peditBtns].forEach((peditBtn) => {
        peditBtn.addEventListener('click', () => {
          this.getLocalProductDetails(peditBtn.getAttribute("data-pbcode"));
        });
      });
    }
  }
}