"use strict";exports.id=66,exports.ids=[66],exports.modules={35603:(e,t,o)=>{o.d(t,{_:()=>c});var i=o(41567),r=o(57634),a=o(72853),s=o(47985),n=o(2998);let l=(0,s.j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),c=r.forwardRef(({className:e,...t},o)=>i.jsx(a.f,{ref:o,className:(0,n.cn)(l(),e),...t}));c.displayName=a.f.displayName},12953:(e,t,o)=>{o.d(t,{g:()=>s});var i=o(41567),r=o(57634),a=o(2998);let s=r.forwardRef(({className:e,...t},o)=>i.jsx("textarea",{className:(0,a.cn)("flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",e),ref:o,...t}));s.displayName="Textarea"},54804:(e,t,o)=>{o.d(t,{F:()=>l,z:()=>c});var i=o(49106);function r(e){if(!e)return"";let t=e.split(/\+|\n/).map(e=>e.trim()).filter(e=>e.length>0);return t.length<=1?e:`<ul>${t.map(e=>`<li>${e}</li>`).join("")}</ul>`}let a={primary:"#0e2e33",accent:"#20e28f",text:"#2d3748",lightGray:"#f8fafc"};async function s(){try{let e=await fetch("/api/settings");if(e.ok)return await e.json()}catch(e){console.error("Failed to fetch brand settings:",e)}return{companyName:"Social Garden",logoUrl:"",primaryColor:"#0e2e33",secondaryColor:"#16803d",accentColor:"#20e28f",fontFamily:"Plus Jakarta Sans",fontSize:"14"}}let n=(e,t)=>{let o=e.sowData,i={primary:t?.primaryColor||a.primary,accent:t?.accentColor||a.accent,text:a.text,lightGray:a.lightGray},s=t?.logoUrl||"https://i.ibb.co/4gtm4Xm0/Logo-Dark-Green.png";return t?.fontFamily,`
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
          color: ${i.text};
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
          border-bottom: 3px solid ${i.accent};
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
          color: ${i.primary};
          margin-bottom: 5px;
        }
        
        .header-subtitle {
          font-size: 14px;
          color: ${i.text};
          opacity: 0.8;
        }
        
        .project-header {
          background: linear-gradient(135deg, ${i.primary} 0%, #1a4a52 100%);
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
          color: ${i.primary};
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 2px solid ${i.accent};
          display: inline-block;
        }
        
        .section-content {
          font-size: 14px;
          line-height: 1.7;
        }
        
        .scope {
          background: ${i.lightGray};
          border-radius: 10px;
          padding: 25px;
          margin-bottom: 25px;
          border-left: 4px solid ${i.accent};
        }
        
        .scope-title {
          font-size: 20px;
          font-weight: 600;
          color: ${i.primary};
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
          background: ${i.primary};
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
          color: ${i.primary};
          font-size: 16px;
          margin-top: 15px;
          padding: 15px;
          background: white;
          border-radius: 8px;
          border: 2px solid ${i.accent};
        }
        
        .deliverables, .assumptions {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin: 15px 0;
          border-left: 4px solid ${i.accent};
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
          border-top: 2px solid ${i.accent};
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .footer-text {
          font-size: 10px;
          color: ${i.text};
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
          <img src="${s}" alt="Logo" class="logo" />
          <div class="header-text">
            <div class="header-title">Statement of Work</div>
            <div class="header-subtitle">Professional Services Agreement</div>
          </div>
        </div>
        
        <!-- Project Header -->
        <div class="project-header">
          <div class="project-title">${o?.projectTitle||"Untitled Project"}</div>
          <div class="project-client">Client: ${o?.clientName||"Not specified"}</div>
        </div>
        
        <!-- Project Overview -->
        ${o?.projectOverview?`
        <div class="section">
          <div class="section-title">Project Overview</div>
          <div class="section-content">${o.projectOverview}</div>
        </div>
        `:""}
        
        <!-- Project Outcomes -->
        ${o?.projectOutcomes?.length?`
        <div class="section">
          <div class="section-title">Project Outcomes</div>
          <div class="section-content">
            ${o.projectOutcomes.map((e,t)=>`<div style="margin-bottom: 8px;">${t+1}. ${e}</div>`).join("")}
          </div>
        </div>
        `:""}
        
        <!-- Scopes -->
        ${o?.scopes?.map((e,t)=>`
        <div class="scope">
          <div class="scope-title">Scope ${t+1}: ${e.scopeName}</div>
          ${e.scopeOverview?`<div class="scope-overview">${e.scopeOverview}</div>`:""}
          
          ${e.deliverables?`
          <div class="deliverables">
            <strong>Deliverables:</strong>
            <div style="margin-top: 8px;">${r(e.deliverables)}</div>
          </div>
          `:""}

          ${e.roles?.length?`
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
              ${e.roles.map(e=>`
              <tr>
                <td>${e.name||"Unnamed Role"}</td>
                <td>${e.hours||0}</td>
                <td>$${e.rate||0}</td>
                <td>$${e.total||0}</td>
              </tr>
              `).join("")}
            </tbody>
          </table>
          ${e.subtotal?`<div class="subtotal">Scope Subtotal: $${e.subtotal.toFixed(2)}</div>`:""}
          `:""}          ${e.assumptions?.length?`
          <div class="assumptions">
            <strong>Assumptions:</strong>
            ${r(e.assumptions.join(" + "))}
          </div>
          `:""}
        </div>
        `).join("")||""}
        
        <!-- Budget Notes -->
        ${o?.budgetNote||o?.scopes?.length?`
        <div class="section">
          <div class="section-title">Budget Notes</div>
          <div class="section-content">
            <strong>Total Investment:</strong> $${o?.scopes?.reduce((e,t)=>e+(t.subtotal||0),0).toLocaleString()||"0"} (including GST)<br><br>
            ${o?.budgetNote||"This scope has been carefully crafted to deliver maximum ROI while maintaining the highest quality standards."}
          </div>
        </div>
        `:""}
        
      </div>
    </body>
    </html>
  `};async function l(e){try{console.log("\uD83C\uDFA8 Generating PDF (Puppeteer) with brand settings");let t=await s(),o=n(e,t);console.log("\uD83D\uDCC4 Generated HTML template"),console.log("\uD83D\uDE80 Sending to PDF export API...");let i=`${e.name||"SOW"}_Export_${new Date().toISOString().split("T")[0]}.pdf`;try{let e=await fetch("/api/export/pdf",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({html:o,filename:i})});if(e.ok){console.log("✅ PDF generated successfully via Puppeteer!");let t=await e.blob(),o=window.URL.createObjectURL(t),r=document.createElement("a");r.href=o,r.download=i,document.body.appendChild(r),r.click(),document.body.removeChild(r),window.URL.revokeObjectURL(o);return}throw Error("PDF service returned non-ok response")}catch(e){console.warn("⚠️ PDF service unavailable or failed, using browser fallback",e)}console.log("\uD83D\uDDA8️ Using browser print fallback...");let r=window.open("","_blank");if(!r)throw Error("Popup blocked - please allow popups and try again");r.document.write(o),r.document.close(),r.onload=()=>{setTimeout(()=>{r.print(),setTimeout(()=>{r.close()},1e3)},500)},console.log("✅ Browser print dialog opened!")}catch(e){console.error("Error generating PDF:",e),alert("Failed to generate PDF. Please try again or check if popups are blocked.")}}function c(e){try{let t=e.sowData,o=i.P6.book_new(),r=[["","","","","","",""],["","","","","","",""],["","","SOCIAL GARDEN","","","",""],["","","","","","",""],["","Marketing Automation","Customer Journey Mapping","Services","","",""],["","","","","","",""],["ITEMS","","","ROLE","","HOURS","TOTAL COST + GST"],["","","","","","",""]];t?.scopes&&Array.isArray(t.scopes)&&t.scopes.forEach((e,t)=>{if(r.push([e.scopeName,"","","","","",""]),r.push(["","","","","","",""]),e.deliverables&&(Array.isArray(e.deliverables)?e.deliverables.length>0:e.deliverables.trim().length>0)){r.push(["","","","","","",""]);let t=Array.isArray(e.deliverables)?e.deliverables.join(", "):e.deliverables.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();r.push(["Deliverables:",t,"","","","",""])}e.roles&&Array.isArray(e.roles)&&e.roles.forEach(e=>{r.push([e.description||e.name||"Service Item","","",e.name||"Role","",e.hours||0,`$${(e.total||0).toLocaleString()}`])}),e.assumptions&&e.assumptions.length>0&&(r.push(["","","","","","",""]),r.push(["Assumptions:",e.assumptions.join(", "),"","","","",""])),r.push(["","","","","","",""])});let a=t?.scopes?.reduce((e,t)=>e+(t.subtotal||0),0)||0;r.push(["TOTAL","","","","","",`$${a.toLocaleString()}`]);let s=i.P6.aoa_to_sheet(r);s["!cols"]=[{wch:40},{wch:10},{wch:15},{wch:25},{wch:5},{wch:10},{wch:15}],i.P6.book_append_sheet(o,s,"Detailed Breakdown");let n=[["","","",""],["","","",""],["SOCIAL GARDEN","","",""],["","","",""],["Marketing Automation | Advisory & Consultation | Services","","",""],["","","",""],["Overview:","","",""],[t?.projectOverview||"This scope of work details a proposed solution for Social Garden to support the client with Marketing Automation advisory and consultation services related to customer journey mapping","","",""],["","","",""],["What does the scope include?","","",""],["• Customer Journey Mapping","","",""],["","","",""],["Project Phases:","","",""],["• Discovery & Analysis","","",""],["• Technical Assessment & Orchestration Mapping","","",""],["• Final Delivery & Handover","","",""],["","","",""],["Scope & Pricing Overview","","",""],["","","",""],["PROJECT PHASES","TOTAL HOURS","AVG. HOURLY RATE","TOTAL COST"]];t?.scopes&&Array.isArray(t.scopes)&&t.scopes.forEach(e=>{let t=e.roles?.reduce((e,t)=>e+(t.hours||0),0)||0,o=t>0?Math.round((e.subtotal||0)/t):0;n.push([e.scopeName,t.toString(),`$${o}`,`$${(e.subtotal||0).toLocaleString()}`])});let l=t?.scopes?.reduce((e,t)=>e+(t.roles?.reduce((e,t)=>e+(t.hours||0),0)||0),0)||0,c=t?.scopes?.reduce((e,t)=>e+(t.subtotal||0),0)||0;n.push(["TOTAL PROJECT",l.toString(),"",`$${c.toLocaleString()}`]);let d=i.P6.aoa_to_sheet(n);d["!cols"]=[{wch:40},{wch:15},{wch:15},{wch:15}],i.P6.book_append_sheet(o,d,"Scope & Price Overview");let p=`${e.name||"SOW"}_SocialGarden_${new Date().toISOString().split("T")[0]}.xlsx`;i.NC(o,p)}catch(e){console.error("Error generating XLSX:",e),alert("Failed to generate Excel file. Please try again.")}}}};