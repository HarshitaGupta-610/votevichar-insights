import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface InsightsPDFData {
  scenarioName: string;
  statesCount: number;
  cycleLength: number;
  costSavings: string;
  efficiency: string;
  complexity: string;
  benefits: string[];
  considerations: string[];
  timeline: string;
  prerequisites: string;
  riskLevel: string;
}

export const generateInsightsPDF = async (data: InsightsPDFData): Promise<Blob> => {
  const pdf = new jsPDF("p", "mm", "a4");
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = margin;

  // Header
  pdf.setFillColor(26, 54, 93); // Primary blue
  pdf.rect(0, 0, pageWidth, 40, "F");
  
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont("helvetica", "bold");
  pdf.text("VoteVichar", margin, 20);
  
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text("Election Synchronization Analysis Report", margin, 30);
  
  yPos = 55;

  // Reset text color
  pdf.setTextColor(0, 0, 0);

  // Report metadata
  pdf.setFontSize(10);
  pdf.setTextColor(128, 128, 128);
  pdf.text(`Generated: ${new Date().toLocaleDateString("en-IN", { 
    year: "numeric", 
    month: "long", 
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })}`, margin, yPos);
  yPos += 15;

  // Scenario Title
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(18);
  pdf.setFont("helvetica", "bold");
  pdf.text(data.scenarioName, margin, yPos);
  yPos += 10;

  pdf.setFontSize(11);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(100, 100, 100);
  pdf.text(`${data.statesCount} States | ${data.cycleLength}-Year Cycle`, margin, yPos);
  yPos += 15;

  // Executive Summary Box
  pdf.setFillColor(240, 248, 255);
  pdf.roundedRect(margin, yPos, pageWidth - 2 * margin, 35, 3, 3, "F");
  
  pdf.setTextColor(26, 54, 93);
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text("Executive Summary", margin + 5, yPos + 10);
  
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(60, 60, 60);
  
  const summaryText = `Projected Savings: ${data.costSavings} | Efficiency Gain: ${data.efficiency} | Complexity: ${data.complexity}`;
  pdf.text(summaryText, margin + 5, yPos + 22);
  
  yPos += 45;

  // Key Metrics
  pdf.setTextColor(26, 54, 93);
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("Key Metrics", margin, yPos);
  yPos += 8;

  const metrics = [
    { label: "Cost Savings", value: data.costSavings, color: [34, 139, 34] },
    { label: "Efficiency Gain", value: data.efficiency, color: [26, 54, 93] },
    { label: "Complexity Level", value: data.complexity, color: [255, 140, 0] },
  ];

  metrics.forEach((metric, index) => {
    const xOffset = margin + (index * 55);
    pdf.setFillColor(metric.color[0], metric.color[1], metric.color[2]);
    pdf.roundedRect(xOffset, yPos, 50, 20, 2, 2, "F");
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");
    pdf.text(metric.label, xOffset + 5, yPos + 8);
    
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "bold");
    pdf.text(metric.value, xOffset + 5, yPos + 16);
  });

  yPos += 30;

  // Benefits Section
  pdf.setTextColor(34, 139, 34);
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text("Potential Benefits", margin, yPos);
  yPos += 8;

  pdf.setTextColor(60, 60, 60);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  
  data.benefits.forEach((benefit) => {
    pdf.text(`• ${benefit}`, margin + 5, yPos);
    yPos += 6;
  });

  yPos += 8;

  // Considerations Section
  pdf.setTextColor(255, 140, 0);
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text("Considerations & Trade-offs", margin, yPos);
  yPos += 8;

  pdf.setTextColor(60, 60, 60);
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  
  data.considerations.forEach((consideration) => {
    pdf.text(`• ${consideration}`, margin + 5, yPos);
    yPos += 6;
  });

  yPos += 10;

  // Feasibility Assessment
  pdf.setTextColor(26, 54, 93);
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text("Feasibility Assessment", margin, yPos);
  yPos += 8;

  pdf.setFillColor(248, 248, 248);
  pdf.roundedRect(margin, yPos, pageWidth - 2 * margin, 30, 3, 3, "F");
  
  pdf.setTextColor(60, 60, 60);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  
  pdf.text(`Timeline: ${data.timeline}`, margin + 5, yPos + 10);
  pdf.text(`Prerequisites: ${data.prerequisites}`, margin + 5, yPos + 18);
  pdf.text(`Risk Level: ${data.riskLevel}`, margin + 5, yPos + 26);

  yPos += 40;

  // Disclaimer
  pdf.setFillColor(255, 248, 240);
  pdf.roundedRect(margin, yPos, pageWidth - 2 * margin, 25, 3, 3, "F");
  
  pdf.setTextColor(150, 100, 50);
  pdf.setFontSize(8);
  pdf.setFont("helvetica", "italic");
  
  const disclaimer = "Disclaimer: This simulation uses hypothetical data for demonstration purposes. Actual implementation would require detailed feasibility studies, stakeholder consultations, and legislative analysis. VoteVichar provides neutral, evidence-based insights without advocating for any specific policy position.";
  
  const splitDisclaimer = pdf.splitTextToSize(disclaimer, pageWidth - 2 * margin - 10);
  pdf.text(splitDisclaimer, margin + 5, yPos + 8);

  // Footer
  const footerY = pdf.internal.pageSize.getHeight() - 15;
  pdf.setDrawColor(200, 200, 200);
  pdf.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
  
  pdf.setTextColor(128, 128, 128);
  pdf.setFontSize(8);
  pdf.setFont("helvetica", "normal");
  pdf.text("VoteVichar - Election Synchronization Analysis Tool", margin, footerY);
  pdf.text("Page 1 of 1", pageWidth - margin - 20, footerY);

  return pdf.output("blob");
};

export const downloadPDF = async (data: InsightsPDFData, filename?: string): Promise<void> => {
  const blob = await generateInsightsPDF(data);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || `VoteVichar_Report_${new Date().toISOString().split("T")[0]}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const captureChartAsPDF = async (elementId: string): Promise<string | null> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) return null;
    
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });
    
    return canvas.toDataURL("image/png");
  } catch (error) {
    console.error("Error capturing chart:", error);
    return null;
  }
};
