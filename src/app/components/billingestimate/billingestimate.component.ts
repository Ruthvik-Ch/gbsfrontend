import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-billingestimate',
  templateUrl: './billingestimate.component.html',
  styleUrls: ['./billingestimate.component.css'],
  providers: [DatePipe]
})
export class BillingestimateComponent implements OnInit {
  @Input() estimateData: any;
  @Output() closeEstimate = new EventEmitter<boolean>();
  currentDate = new Date();

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    console.log('Estimate Component Initialized');
  }

  getNetAmount() {
    const base = Number(this.estimateData.financials.baseAmount);
  const va = Number(this.estimateData.financials.vaCharge);
  const labour = Number(this.estimateData.financials.makingCharge);
  return (base + va + labour).toFixed(2);
  }
  getGst() {
    const base = Number(this.estimateData.financials.baseAmount);
  const va = Number(this.estimateData.financials.vaCharge);
  const labour = Number(this.estimateData.financials.makingCharge);
  return ((base + va + labour)*0.03).toFixed(2);
  }
  getNetAmountAfterGst() {
    const base = Number(this.estimateData.financials.baseAmount);
  const va = Number(this.estimateData.financials.vaCharge);
  const labour = Number(this.estimateData.financials.makingCharge);
  return (base + va + labour +(base + va + labour)*0.03).toFixed(2);
  }

  printEstimate() {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Company Header
    doc.setFontSize(18);
    doc.text('LAXMI JEWELLERS', pageWidth/2, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('020-8555095-8585', pageWidth/2, 28, { align: 'center' });
    doc.setFontSize(20);
    doc.text('ESTIMATE', pageWidth/2, 38, { align: 'center' });

    // Item Details
    doc.setFontSize(12);
    doc.text(`ITEM : ${this.estimateData.productDetails.itemName}`, 20, 50);
    doc.text(`DATE : ${this.datePipe.transform(this.currentDate, 'dd MMM y')}`, pageWidth - 70, 50);
    doc.text(`HSN Code : ${this.estimateData.productDetails.hsnCode}`, 20, 58);
    doc.text(`NET WT : ${this.estimateData.productDetails.weight} GM`, 20, 66);
    doc.text(`GR WT : ${this.estimateData.productDetails.grweight} GM`, 20, 74);

    // Price Breakdown
    let yPos = 88;
    doc.text('GOLD :', 20, yPos);
    doc.text(`${this.estimateData.productDetails.weight} GM`, 70, yPos);
    doc.text(`${this.estimateData.productDetails.rate}`, pageWidth - 50, yPos);
    doc.text(`${this.estimateData.financials.baseAmount}`, pageWidth - 20, yPos, { align: 'right' });


    yPos += 10;
    doc.text('V/A :', 20, yPos);
    doc.text(`${this.estimateData.financials.vaCharge}`, pageWidth - 20, yPos, { align: 'right' });

    // Net Amount
    yPos += 20;
    doc.setLineWidth(0.5);
    doc.line(20, yPos, pageWidth - 20, yPos);
    yPos += 10;
    doc.setFontSize(14);
    doc.text('NET AMOUNT', 20, yPos);
    doc.text(`${this.getNetAmount().toString()}`, pageWidth - 20, yPos, { align: 'right' });

    // GST 
    yPos+=10
    doc.text('GST @3%', 20, yPos);
    doc.text(`${this.getGst().toString()}`, pageWidth - 20, yPos, { align: 'right' });

    // Total
    yPos+=10
    doc.text('Total Amount', 20, yPos);
    doc.text(`${this.getNetAmountAfterGst().toString()}`, pageWidth - 20, yPos, { align: 'right' });

    // Signatory
    yPos += 30;
    doc.setFontSize(12);
    doc.line(pageWidth - 70, yPos, pageWidth - 20, yPos);
    doc.text('Signatory', pageWidth - 50, yPos + 8, { align: 'center' });

    doc.save('estimate.pdf');
  }

  cancel(): void {
    this.closeEstimate.emit(false);
  }
}