import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-billing-preview',
  templateUrl: './billingpreview.component.html',
  styleUrls: ['./billingpreview.component.css'],
  providers: [DatePipe]
})
export class BillingPreviewComponent implements OnInit {
  @Input() billData: any;
  @Output() closePreview = new EventEmitter<boolean>();
  @Output() confirmBill = new EventEmitter<boolean>();
  
  currentDate: Date = new Date();
  invoiceNo: string = '';
  totalWithTax: number = 0;
  balanceAmount: number = 0;

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    console.log('🔄 BillingPreviewComponent initialized');
    console.log('📋 Received bill data:', this.billData);
    this.calculateAmounts();

    const dateStr = this.datePipe.transform(this.currentDate, 'ddMMyy');
    this.invoiceNo = `${dateStr}/INV/${Math.floor(1000 + Math.random() * 9000)}`;
  }

  calculateAmounts(): void {
    const baseAmount = this.billData?.financials?.baseAmount || 0;
    const advance = this.billData?.financials?.advanceUsed || 0;
    const scheme = this.billData?.financials?.schemeUsed || 0;
    const discount = this.billData?.financials?.discount || 0;
    const vavlue = this.billData?.financials?.vaCharge || 0;
    const stoneamount = this.billData?.financials?.stoneCharge|| 0;

    const sgst = baseAmount * 0.015;
    const cgst = baseAmount * 0.015;

    this.totalWithTax = parseFloat((baseAmount + sgst + cgst + Number(vavlue) + Number(stoneamount)).toFixed(2));
    this.balanceAmount = parseFloat((this.totalWithTax - advance - scheme - discount).toFixed(2));
  }

  printBill(): void {
    console.log('🖨️ Initiating PDF generation...');
    const doc = new jsPDF();
    const yOffset = 25;

    doc.setFontSize(16).setFont('helvetica', 'bold');
    doc.text('TAX INVOICE', doc.internal.pageSize.width / 2, 15 + yOffset, { align: 'center' });

    doc.setFontSize(12).setFont('helvetica', 'bold');
    doc.text(this.billData?.customerDetails?.name, 15, 25 + yOffset);
    doc.setFont('helvetica', 'normal').setFontSize(10);
    doc.text(`Mobile No: ${this.billData?.customerDetails?.phone}`, 15, 30 + yOffset);
    doc.text(`Aadhar No: ${this.billData?.customerDetails?.aadhar}`, 15, 35 + yOffset);
    doc.text(`State Code: Andhra Pradesh-37`, 15, 40 + yOffset);
    doc.text(`PAN No / GST No: ${this.billData?.customerDetails?.pan}`, 15, 45 + yOffset);

    doc.text(`Inv. No: ${this.invoiceNo}`, 195, 25 + yOffset, { align: 'right' });
    doc.text(`Date: ${this.datePipe.transform(this.currentDate, 'dd-MMM-yy')}`, 195, 30 + yOffset, { align: 'right' });
    doc.text(`Type: ${this.billData?.productDetails?.category}`, 195, 35 + yOffset, { align: 'right' });

    autoTable(doc, {
        head: [['Item Name / Description', 'HSN Code', 'Gr.Weight Grams', 'Net.Weight Grams', 'Rate Per.Gm', 'Val.Add. Rs. Ps.', 'Stones Rs. Ps.', 'Discount Rs. Ps.', 'Amount Rs. Ps.']],
        body: [[
            this.billData?.productDetails?.itemName,
            this.billData?.productDetails?.hsnCode,
            this.billData?.productDetails?.grweight,
            this.billData?.productDetails?.weight,
            this.billData?.productDetails?.rate,
            this.billData?.financials?.vaCharge,
            this.billData?.financials?.stoneCharge,
            this.billData?.financials?.discount,
            this.billData?.financials?.baseAmount
        ]],
        startY: 50 + yOffset,
        theme: 'grid',
    });

    const bottomSectionY = 160 + yOffset;
    const rightColX = 120;

    doc.setFont('helvetica', 'bold').text('Our Bank Details:', 15, bottomSectionY);
    doc.setFont('helvetica', 'normal');
    doc.text('Bank & Branch: State Bank of India, Main Branch, Chira', 15, bottomSectionY + 5);
    doc.text('A/c. No: 37782144574    IFSC: SBIN0001009', 15, bottomSectionY + 10);

    const sgst = (this.billData?.financials?.baseAmount * 0.015).toFixed(2);
    const cgst = (this.billData?.financials?.baseAmount * 0.015).toFixed(2);

    doc.text('SGST @1.5%:', rightColX, bottomSectionY);
    doc.text(sgst, 195, bottomSectionY, { align: 'right' });

    doc.text('CGST @1.5%:', rightColX, bottomSectionY + 5);
    doc.text(cgst, 195, bottomSectionY + 5, { align: 'right' });

    doc.setFont('helvetica', 'bold');
    doc.text('Total Bill Amount:', rightColX, bottomSectionY + 15);
    doc.text(this.totalWithTax.toString(), 195, bottomSectionY + 15, { align: 'right' });

     // Payment Details
     doc.setFont('helvetica', 'normal');
     doc.text('Advance:', rightColX, bottomSectionY + 20);
     doc.text(this.billData?.financials?.advanceUsed.toString(), 195, bottomSectionY + 20, { align: 'right' });
 
     doc.text('Scheme Amount:', rightColX, bottomSectionY + 25);
     doc.text(this.billData?.financials?.schemeUsed.toString(), 195, bottomSectionY + 25, { align: 'right' });
 
     // doc.text('Old Gold Pur. Bill No:', rightColX, bottomSectionY + 30);
     // doc.text('Amount:', rightColX, bottomSectionY + 35);
 
     doc.text('Discount/Rounding Off:', rightColX, bottomSectionY + 40);
     doc.text(this.billData?.financials?.discount.toString(), 195, bottomSectionY + 40, { align: 'right' });

    doc.text('Balance Amount:', rightColX, bottomSectionY + 45);
    doc.text(this.balanceAmount.toString(), 195, bottomSectionY + 45, { align: 'right' });

    doc.setFontSize(10);
    doc.text('GST NO: 37AELPP7040L1ZZ', 15, bottomSectionY + 70);
    doc.text('Signature of the Customer', doc.internal.pageSize.width / 2, bottomSectionY + 70, { align: 'center' });
    doc.text('Authorised Signature', doc.internal.pageSize.width - 15, bottomSectionY + 70, { align: 'right' });

    doc.save('invoice.pdf');
    this.confirmBill.emit(true);
  }

  cancel(): void {
    this.closePreview.emit(false);
  }
}
