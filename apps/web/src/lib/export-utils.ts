import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { SOW } from '@sow-workbench/db';

// Helper function to convert text with + or newline separators into HTML bullet list
function formatAsBulletList(text: string): string {
  if (!text) return '';
  
  // Split by + or newlines, clean up each item
  const items = text
    .split(/\+|\n/)
    .map(item => item.trim())
    .filter(item => item.length > 0);
  
  // If only one item or no items, return as plain text
  if (items.length <= 1) return text;
  
  // Create HTML bullet list
  return `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
}

// Brand settings interface
interface BrandSettings {
  companyName: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string; 
  accentColor: string;
  fontFamily: string;
  fontSize: string;
}

// Default fallback brand colors if settings not available
const defaultBrandColors = {
  primary: '#0e2e33',    // Dark navy
  accent: '#20e28f',     // Green accent
  text: '#2d3748',       // Dark gray text
  lightGray: '#f8fafc',  // Light background
};

// Fetch brand settings from API
async function fetchBrandSettings(): Promise<BrandSettings> {
  try {
    const response = await fetch('/api/settings');
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Failed to fetch brand settings:', error);
  }
  
  // Return defaults if fetch fails
  return {
    companyName: 'Social Garden',
    logoUrl: '',
    primaryColor: '#0e2e33',
    secondaryColor: '#16803d',
    accentColor: '#20e28f',
    fontFamily: 'Plus Jakarta Sans',
    fontSize: '14'
  };
}

// Create professional HTML template for PDF
const createPDFTemplate = (sow: SOW, brandSettings: BrandSettings): string => {
  const data = sow.sowData as any;
  const brandColors = {
    primary: brandSettings?.primaryColor || defaultBrandColors.primary,
    accent: brandSettings?.accentColor || defaultBrandColors.accent,
    text: defaultBrandColors.text,
    lightGray: defaultBrandColors.lightGray,
  };
  const logoUrl = brandSettings?.logoUrl || 'https://i.ibb.co/4gtm4Xm0/Logo-Dark-Green.png';
  const fontFamily = brandSettings?.fontFamily || 'Plus Jakarta Sans';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <base href="https://demo.qandu.me/" />
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: ${brandColors.text};
          background: white;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 50px;
          padding-bottom: 30px;
          border-bottom: 3px solid ${brandColors.accent};
        }
        
        .logo {
          width: 180px;
          height: auto;
        }
        
        .header-text {
          text-align: right;
        }
        
        .header-title {
          font-size: 24px;
          font-weight: 700;
          color: ${brandColors.primary};
          margin-bottom: 5px;
        }
        
        .header-subtitle {
          font-size: 14px;
          color: ${brandColors.text};
          opacity: 0.8;
        }
        
        .project-header {
          background: linear-gradient(135deg, ${brandColors.primary} 0%, #1a4a52 100%);
          color: white;
          padding: 30px;
          border-radius: 12px;
          margin-bottom: 40px;
        }
        
        .project-title {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        
        .project-client {
          font-size: 16px;
          opacity: 0.9;
          margin-bottom: 20px;
        }
        
        .section {
          margin-bottom: 35px;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: ${brandColors.primary};
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 2px solid ${brandColors.accent};
          display: inline-block;
        }
        
        .section-content {
          font-size: 14px;
          line-height: 1.7;
        }
        
        .scope {
          background: ${brandColors.lightGray};
          border-radius: 10px;
          padding: 25px;
          margin-bottom: 25px;
          border-left: 4px solid ${brandColors.accent};
        }
        
        .scope-title {
          font-size: 20px;
          font-weight: 600;
          color: ${brandColors.primary};
          margin-bottom: 15px;
        }
        
        .scope-overview {
          font-size: 14px;
          margin-bottom: 20px;
          line-height: 1.6;
        }
        
        .roles-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .roles-table th {
          background: ${brandColors.primary};
          color: white;
          padding: 12px 15px;
          text-align: left;
          font-weight: 600;
          font-size: 14px;
        }
        
        .roles-table td {
          padding: 12px 15px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 14px;
        }
        
        .roles-table td:nth-child(3),
        .roles-table td:nth-child(4),
        .roles-table td:nth-child(5) {
          text-align: right;
          font-weight: 600;
        }
        
        .roles-table tr:nth-child(even) {
          background: #f9fafb;
        }
        
        .subtotal {
          text-align: right;
          font-weight: 600;
          color: ${brandColors.primary};
          font-size: 16px;
          margin-top: 15px;
          padding: 15px;
          background: white;
          border-radius: 8px;
          border: 2px solid ${brandColors.accent};
        }
        
        .deliverables, .assumptions {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin: 15px 0;
          border-left: 4px solid ${brandColors.accent};
        }
        
        .deliverables ul, .assumptions ul {
          list-style-type: disc;
          margin-left: 20px;
          margin-top: 8px;
        }
        
        .deliverables li, .assumptions li {
          margin-bottom: 8px;
          line-height: 1.6;
        }
        
        .footer {
          margin-top: 60px;
          padding-top: 30px;
          border-top: 2px solid ${brandColors.accent};
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .footer-text {
          font-size: 10px;
          color: ${brandColors.text};
          flex: 1;
        }
        
        @media print {
          .container { padding: 20px; }
          .project-header { break-inside: avoid; }
          .scope { break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header with Logo -->
        <div class="header">
          <img src="${logoUrl}" alt="Logo" class="logo" />
          <div class="header-text">
            <div class="header-title">Statement of Work</div>
            <div class="header-subtitle">Professional Services Agreement</div>
          </div>
        </div>
        
        <!-- Project Header -->
        <div class="project-header">
          <div class="project-title">${data?.projectTitle || 'Untitled Project'}</div>
          <div class="project-client">Client: ${data?.clientName || 'Not specified'}</div>
        </div>
        
        <!-- Project Overview -->
        ${data?.projectOverview ? `
        <div class="section">
          <div class="section-title">Project Overview</div>
          <div class="section-content">${data.projectOverview}</div>
        </div>
        ` : ''}
        
        <!-- Project Outcomes -->
        ${data?.projectOutcomes?.length ? `
        <div class="section">
          <div class="section-title">Project Outcomes</div>
          <div class="section-content">
            ${data.projectOutcomes.map((outcome: string, index: number) => 
              `<div style="margin-bottom: 8px;">${index + 1}. ${outcome}</div>`
            ).join('')}
          </div>
        </div>
        ` : ''}
        
        <!-- Scopes -->
        ${data?.scopes?.map((scope: any, index: number) => `
        <div class="scope">
          <div class="scope-title">Scope ${index + 1}: ${scope.scopeName}</div>
          ${scope.scopeOverview ? `<div class="scope-overview">${scope.scopeOverview}</div>` : ''}
          
          ${scope.deliverables ? `
          <div class="deliverables">
            <strong>Deliverables:</strong>
            <div style="margin-top: 8px;">${formatAsBulletList(scope.deliverables)}</div>
          </div>
          ` : ''}

          ${scope.roles?.length ? `
          <table class="roles-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Hours</th>
                <th>Rate</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${scope.roles.map((role: any) => `
              <tr>
                <td>${role.name || 'Unnamed Role'}</td>
                <td>${role.hours || 0}</td>
                <td>$${role.rate || 0}</td>
                <td>$${role.total || 0}</td>
              </tr>
              `).join('')}
            </tbody>
          </table>
          ${scope.subtotal ? `<div class="subtotal">Scope Subtotal: $${scope.subtotal.toFixed(2)}</div>` : ''}
          ` : ''}          ${scope.assumptions?.length ? `
          <div class="assumptions">
            <strong>Assumptions:</strong>
            ${formatAsBulletList(scope.assumptions.join(' + '))}
          </div>
          ` : ''}
        </div>
        `).join('') || ''}
        
        <!-- Budget Notes -->
        ${data?.budgetNote || data?.scopes?.length ? `
        <div class="section">
          <div class="section-title">Budget Notes</div>
          <div class="section-content">
            <strong>Total Investment:</strong> $${data?.scopes?.reduce((total: number, scope: any) => total + (scope.subtotal || 0), 0).toLocaleString() || '0'} (including GST)<br><br>
            ${data?.budgetNote || 'This scope has been carefully crafted to deliver maximum ROI while maintaining the highest quality standards.'}
          </div>
        </div>
        ` : ''}
        
      </div>
    </body>
    </html>
  `;
};

// Create professional HTML template matching Social Garden branding
const createProfessionalHTML = (sow: SOW): string => {
  const data = sow.sowData as any;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: A4;
      margin: 0.85in 0.75in 1in 0.75in;
    }
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    @media print {
      .page-header {
        position: running(header);
      }
      
      @page {
        @top-center {
          content: element(header);
        }
      }
    }
    
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      line-height: 1.5;
      color: #333;
      background: white;
      font-size: 11px;
    }
    
    .logo-header {
      text-align: center;
      margin-bottom: 20px;
    }
    
    .logo-image {
      max-height: 40px;
      width: auto;
    }
    
    .main-header {
      background: linear-gradient(135deg, #0e2e33 0%, #20e28f 100%);
      color: white;
      text-align: center;
      padding: 20px;
      margin-bottom: 25px;
      font-weight: 600;
      font-size: 16px;
      text-transform: uppercase;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(32, 226, 143, 0.2);
    }
    
    .project-info {
      margin-bottom: 30px;
      padding: 20px;
      background: #f8fafc;
      border-radius: 8px;
      border-left: 4px solid #20e28f;
    }
    
    .project-title {
      font-size: 20px;
      font-weight: 700;
      color: #0e2e33;
      margin-bottom: 10px;
    }
    
    .project-client {
      font-size: 13px;
      color: #666;
      margin-bottom: 8px;
    }
    
    .project-date {
      font-size: 11px;
      color: #999;
      font-style: italic;
    }
    
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      font-size: 10px;
    }
    
    .items-header {
      background: linear-gradient(135deg, #0e2e33 0%, #20e28f 100%);
      color: white;
    }
    
    .items-header th {
      padding: 10px 8px;
      text-align: center;
      font-weight: 600;
      font-size: 10px;
      border: 1px solid white;
    }
    
    .items-header th:first-child {
      text-align: left;
      padding-left: 12px;
    }
    
    .items-header th:nth-child(3),
    .items-header th:nth-child(4) {
      text-align: right;
      padding-right: 12px;
    }
    
    .items-table td {
      padding: 8px 10px;
      border: 1px solid #ddd;
      vertical-align: top;
      font-size: 9px;
      line-height: 1.5;
    }
    
    .items-table td:nth-child(3),
    .items-table td:nth-child(4) {
      text-align: right;
      font-weight: 500;
    }
    
    .items-table tr:nth-child(even) {
      background: #f9fafb;
    }
    
    .section-divider {
      background: #20e28f;
      color: white;
      padding: 8px 15px;
      font-weight: 600;
      font-size: 12px;
      margin: 15px 0 10px 0;
      text-align: center;
    }
    
    .total-row {
      background: #666 !important;
      color: white;
      font-weight: bold;
    }
    
    .total-row td {
      border-color: #666;
    }
    
    .overview-section {
      background: #20e28f;
      color: white;
      text-align: center;
      padding: 12px;
      margin: 20px 0;
      font-weight: 600;
      font-size: 14px;
    }
    
    .summary-table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
    }
    
    .summary-table th {
      background: linear-gradient(135deg, #0e2e33 0%, #20e28f 100%);
      color: white;
      padding: 12px;
      text-align: center;
      font-weight: 600;
    }
    
    .summary-table td {
      padding: 8px;
      border: 1px solid #ddd;
      text-align: center;
      font-weight: 600;
      font-size: 12px;
    }
    
    .deliverables-section, .assumptions-section {
      background: #f0f9ff;
      padding: 15px 18px;
      margin: 18px 0;
      border-left: 4px solid #20e28f;
      border-radius: 4px;
    }
    
    .section-heading {
      font-weight: 700;
      color: #0e2e33;
      margin-bottom: 10px;
      font-size: 12px;
    }
    
    .content-text {
      line-height: 1.7;
      font-size: 10px;
    }
    
    .content-text ul {
      margin: 8px 0;
      padding-left: 20px;
    }
    
    .content-text li {
      margin-bottom: 6px;
      line-height: 1.6;
    }
    
    .page-header {
      font-size: 9px;
      color: #666;
      padding-bottom: 8px;
      border-bottom: 2px solid #20e28f;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .footer {
      position: fixed;
      bottom: 0.4in;
      left: 0.75in;
      right: 0.75in;
      font-size: 8px;
      color: #666;
      border-top: 2px solid #20e28f;
      padding-top: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .footer-left {
      text-align: left;
      font-weight: 500;
    }
    
    .footer-center {
      text-align: center;
      font-style: italic;
    }
    
    .footer-right {
      text-align: right;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <!-- Header with Social Garden Logo -->
  <div class="logo-header">
    <img src="data:image/png;base64,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" alt="Social Garden" class="logo-image" />
  <div class="logo-header">
    <img src="https://i.ibb.co/4gtm4Xm0/Logo-Dark-Green.png" alt="Social Garden" class="logo-image" />
  </div>
  </div>
  
  <!-- Main Header Section -->
  <div class="main-header">
    ${data?.projectTitle || 'Marketing Automation'} | Advisory & Consultation | Services
  </div>
  
  <!-- Project Information -->
  <div class="project-info">
    <div class="project-title">${data?.projectTitle || 'Untitled Project'}</div>
    <div class="project-client">Client: ${data?.clientName || 'Not specified'}</div>
    <div class="project-date">Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
  </div>
  
  <!-- Items Table Header -->
  <table class="items-table">
    <thead class="items-header">
      <tr>
        <th style="width: 45%;">ITEMS</th>
        <th style="width: 25%;">ROLE</th>
        <th style="width: 12%;">HOURS</th>
        <th style="width: 18%;">TOTAL COST + GST</th>
      </tr>
    </thead>
    <tbody>
  
      ${data?.scopes?.map((scope: any, scopeIndex: number) => {
        let scopeRows = '';
        
        // Add scope header row
        scopeRows += `
        <tr>
          <td colspan="4" style="background: #20e28f; color: white; font-weight: 600; text-align: center; padding: 10px;">
            ${scope.scopeName}
          </td>
        </tr>`;
        
        // Add scope overview if exists
        if (scope.scopeOverview) {
          scopeRows += `
          <tr>
            <td colspan="4" style="padding: 10px; font-style: italic; background: #f8fafc;">
              ${scope.scopeOverview}
            </td>
          </tr>`;
        }

        // Add deliverables immediately under the scope overview (client requested)
        if (scope.deliverables && scope.deliverables.length > 0) {
          scopeRows += `
          <tr>
            <td colspan="4" style="background: #f0f9ff; padding: 8px;">
              <strong>Deliverables:</strong><br>
              ${Array.isArray(scope.deliverables) ? scope.deliverables.map((d: string) => `• ${d}`).join('<br>') : scope.deliverables}
            </td>
          </tr>`;
        }

        // Add roles (task rows)
        if (scope.roles?.length) {
          scope.roles.forEach((role: any, roleIndex: number) => {
            scopeRows += `
            <tr>
              <td>${role.description || role.name || 'Service Item'}</td>
              <td style="text-align: center;">${role.name || 'Role'}</td>
              <td style="text-align: right; padding-right: 20px;">${role.hours || 0}</td>
              <td style="text-align: right; font-weight: 600;">$${(role.total || 0).toLocaleString()}</td>
            </tr>`;
          });
        }
        
        // Add assumptions
        if (scope.assumptions?.length) {
          scopeRows += `
          <tr>
            <td colspan="4" style="background: #fef7e7; padding: 8px;">
              <strong>Assumptions:</strong><br>
              ${scope.assumptions.map((a: string) => `• ${a}`).join('<br>')}
            </td>
          </tr>`;
        }
        
        return scopeRows;
      }).join('') || ''}
      
      <!-- Total Row -->
      <tr class="total-row">
        <td colspan="3" style="text-align: center; font-weight: bold;">TOTAL + GST</td>
        <td style="text-align: right; font-weight: bold;">
          $${data?.scopes?.reduce((total: number, scope: any) => total + (scope.subtotal || 0), 0).toLocaleString() || '0'}
        </td>
      </tr>
    </tbody>
  </table>
  
  <!-- Scope & Price Overview Section -->
  <div class="overview-section">
    Scope & Price Overview
  </div>
  
  <table class="summary-table">
    <thead>
      <tr>
        <th style="width: 60%;">SCOPE</th>
        <th style="width: 20%;">ESTIMATED TOTAL HOURS</th>
        <th style="width: 20%;">TOTAL COST</th>
      </tr>
    </thead>
    <tbody>
      ${data?.scopes?.map((scope: any) => `
      <tr>
        <td style="text-align: left; padding-left: 12px;">${scope.scopeName}</td>
        <td style="text-align: right; padding-right: 15px;">${scope.roles?.reduce((total: number, role: any) => total + (role.hours || 0), 0) || 0}</td>
        <td style="text-align: right; font-weight: 600; padding-right: 12px;">$${(scope.subtotal || 0).toLocaleString()}</td>
      </tr>
      `).join('') || ''}
      <tr style="background: linear-gradient(135deg, #0e2e33 0%, #20e28f 100%); color: white; font-weight: 700;">
        <td style="text-align: left; padding: 14px 12px;">TOTAL PROJECT + GST</td>
        <td style="text-align: right; padding: 14px 15px 14px 0;">${data?.scopes?.reduce((total: number, scope: any) => total + (scope.roles?.reduce((roleTotal: number, role: any) => roleTotal + (role.hours || 0), 0) || 0), 0) || 0}</td>
        <td style="text-align: right; padding: 14px 12px 14px 0;">$${data?.scopes?.reduce((total: number, scope: any) => total + (scope.subtotal || 0), 0).toLocaleString() || '0'}</td>
      </tr>
    </tbody>
  </table>
  
  ${data?.projectOverview ? `
  <div class="deliverables-section">
    <div class="section-heading">Project Overview:</div>
    <div class="content-text">${data.projectOverview}</div>
  </div>
  ` : ''}
  
  ${data?.budgetNote || data?.scopes?.length ? `
  <div class="assumptions-section">
    <div class="section-heading">Budget Notes:</div>
    <div class="content-text">
      <strong>Total Investment:</strong> $${data?.scopes?.reduce((total: number, scope: any) => total + (scope.subtotal || 0), 0).toLocaleString() || '0'} (including GST)<br><br>
      ${data?.budgetNote || 'This scope has been carefully crafted to deliver maximum ROI while maintaining the highest quality standards.'}
    </div>
  </div>
  ` : ''}
  
  <div class="footer">
    <div class="footer-left">Social Garden</div>
    <div class="footer-center">CONFIDENTIAL - For ${data?.clientName || 'Client'} Use Only</div>
    <div class="footer-right">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
  </div>
</body>
</html>
  `;
};

export async function exportToPDF(sow: SOW): Promise<void> {
  try {
    console.log('🎨 Generating PDF (Puppeteer) with brand settings');
    // Fetch brand settings
    const brandSettings = await fetchBrandSettings();

    // Generate professional HTML with brand settings
    const html = createPDFTemplate(sow, brandSettings as BrandSettings);
    console.log('📄 Generated HTML template');
    
    // Try external service first, fallback to browser print
    console.log('🚀 Sending to PDF export API...');
    const filename = `${sow.name || 'SOW'}_Export_${new Date().toISOString().split('T')[0]}.pdf`;
    
    try {
      const response = await fetch('/api/export/pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html, filename })
      });

      if (response.ok) {
        console.log('✅ PDF generated successfully via Puppeteer!');
        // Download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        return;
      }
      throw new Error('PDF service returned non-ok response');
    } catch (serviceError) {
      console.warn('⚠️ PDF service unavailable or failed, using browser fallback', serviceError);
    }

    // Fallback: Use browser print functionality
    console.log('🖨️ Using browser print fallback...');
    
    // Create a new window with the HTML content
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('Popup blocked - please allow popups and try again');
    }
    
    printWindow.document.write(html);
    printWindow.document.close();
    
    // Wait for content to load, then print
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
        // Close after a delay to allow print dialog
        setTimeout(() => {
          printWindow.close();
        }, 1000);
      }, 500);
    };
    
    console.log('✅ Browser print dialog opened!');

  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again or check if popups are blocked.');
  }
}

export function exportToXLSX(sow: SOW): void {
  try {
    const data = sow.sowData as any;
    const workbook = XLSX.utils.book_new();

    // Sheet 1: Detailed Breakdown (matching first screenshot)
    const detailedData = [
      ['', '', '', '', '', '', ''], // Empty row for logo space
      ['', '', '', '', '', '', ''],
      ['', '', 'SOCIAL GARDEN', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', 'Marketing Automation', 'Customer Journey Mapping', 'Services', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['ITEMS', '', '', 'ROLE', '', 'HOURS', 'TOTAL COST + GST'],
      ['', '', '', '', '', '', ''],
    ];

    // Add scope data
    if (data?.scopes && Array.isArray(data.scopes)) {
      data.scopes.forEach((scope: any, scopeIndex: number) => {
        // Scope header
        detailedData.push([scope.scopeName, '', '', '', '', '', '']);
        detailedData.push(['', '', '', '', '', '', '']);

        // Add deliverables first (shown under scope overview in PDF)
        if (scope.deliverables && (Array.isArray(scope.deliverables) ? scope.deliverables.length > 0 : scope.deliverables.trim().length > 0)) {
          detailedData.push(['', '', '', '', '', '', '']);
          const deliverablesText = Array.isArray(scope.deliverables) 
            ? scope.deliverables.join(', ') 
            : scope.deliverables.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
          detailedData.push(['Deliverables:', deliverablesText, '', '', '', '', '']);
        }

        // Add roles for this scope (task rows)
        if (scope.roles && Array.isArray(scope.roles)) {
          scope.roles.forEach((role: any) => {
            detailedData.push([
              role.description || role.name || 'Service Item',
              '', '', 
              role.name || 'Role',
              '',
              role.hours || 0,
              `$${(role.total || 0).toLocaleString()}`
            ]);
          });
        }

        // Add assumptions if exists
        if (scope.assumptions && scope.assumptions.length > 0) {
          detailedData.push(['', '', '', '', '', '', '']);
          detailedData.push(['Assumptions:', scope.assumptions.join(', '), '', '', '', '', '']);
        }

        detailedData.push(['', '', '', '', '', '', '']); // Spacing
      });
    }

    // Add total row
    const totalCost = data?.scopes?.reduce((total: number, scope: any) => total + (scope.subtotal || 0), 0) || 0;
    detailedData.push(['TOTAL', '', '', '', '', '', `$${totalCost.toLocaleString()}`]);

    const detailedSheet = XLSX.utils.aoa_to_sheet(detailedData);
    
    // Set column widths
    detailedSheet['!cols'] = [
      { wch: 40 }, // Items column
      { wch: 10 }, // Space
      { wch: 15 }, // Space  
      { wch: 25 }, // Role column
      { wch: 5 },  // Space
      { wch: 10 }, // Hours
      { wch: 15 }  // Total cost
    ];

    XLSX.utils.book_append_sheet(workbook, detailedSheet, 'Detailed Breakdown');

    // Sheet 2: Scope & Price Overview (matching second screenshot)
    const overviewData = [
      ['', '', '', ''], // Logo space
      ['', '', '', ''],
      ['SOCIAL GARDEN', '', '', ''],
      ['', '', '', ''],
      ['Marketing Automation | Advisory & Consultation | Services', '', '', ''],
      ['', '', '', ''],
      ['Overview:', '', '', ''],
      [data?.projectOverview || 'This scope of work details a proposed solution for Social Garden to support the client with Marketing Automation advisory and consultation services related to customer journey mapping', '', '', ''],
      ['', '', '', ''],
      ['What does the scope include?', '', '', ''],
      ['• Customer Journey Mapping', '', '', ''],
      ['', '', '', ''],
      ['Project Phases:', '', '', ''],
      ['• Discovery & Analysis', '', '', ''],
      ['• Technical Assessment & Orchestration Mapping', '', '', ''],
      ['• Final Delivery & Handover', '', '', ''],
      ['', '', '', ''],
      ['Scope & Pricing Overview', '', '', ''],
      ['', '', '', ''],
      ['PROJECT PHASES', 'TOTAL HOURS', 'AVG. HOURLY RATE', 'TOTAL COST'],
    ];

    // Add scope summary data
    if (data?.scopes && Array.isArray(data.scopes)) {
      data.scopes.forEach((scope: any) => {
        const totalHours = scope.roles?.reduce((total: number, role: any) => total + (role.hours || 0), 0) || 0;
        const avgRate = totalHours > 0 ? Math.round((scope.subtotal || 0) / totalHours) : 0;
        
        overviewData.push([
          scope.scopeName,
          totalHours.toString(),
          `$${avgRate}`,
          `$${(scope.subtotal || 0).toLocaleString()}`
        ]);
      });
    }

    // Add total row for overview
    const totalHours = data?.scopes?.reduce((total: number, scope: any) => 
      total + (scope.roles?.reduce((roleTotal: number, role: any) => roleTotal + (role.hours || 0), 0) || 0), 0) || 0;
    const totalProjectCost = data?.scopes?.reduce((total: number, scope: any) => total + (scope.subtotal || 0), 0) || 0;
    
    overviewData.push([
      'TOTAL PROJECT',
      totalHours.toString(),
      '',
      `$${totalProjectCost.toLocaleString()}`
    ]);

    const overviewSheet = XLSX.utils.aoa_to_sheet(overviewData);
    
    // Set column widths for overview sheet
    overviewSheet['!cols'] = [
      { wch: 40 }, // Project phases
      { wch: 15 }, // Total hours
      { wch: 15 }, // Avg hourly rate
      { wch: 15 }  // Total cost
    ];

    XLSX.utils.book_append_sheet(workbook, overviewSheet, 'Scope & Price Overview');

    // Save the workbook
    const filename = `${sow.name || 'SOW'}_SocialGarden_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, filename);

  } catch (error) {
    console.error('Error generating XLSX:', error);
    alert('Failed to generate Excel file. Please try again.');
  }
}
