import express from 'express';
import { spawn } from 'child_process';
import path from 'path';

const router = express.Router();

// POST /api/export/pdf - Generate PDF using WeasyPrint
router.post('/pdf', async (req, res) => {
  try {
    const { html, filename } = req.body;

    if (!html) {
      return res.status(400).json({ error: 'HTML content is required' });
    }

    const pdfFilename = filename || `Export_${new Date().toISOString().split('T')[0]}.pdf`;

    console.log('🚀 Starting PDF generation with WeasyPrint...');
    
    // Spawn WeasyPrint Python process
    const pythonScript = path.join(__dirname, '..', 'services', 'weasyprint-pdf.py');
    const weasyprint = spawn('python3', [pythonScript]);
    
    const pdfChunks: Buffer[] = [];
    const errorChunks: string[] = [];
    
    // Collect PDF data from stdout
    weasyprint.stdout.on('data', (chunk) => {
      pdfChunks.push(chunk);
    });
    
    // Collect error messages from stderr
    weasyprint.stderr.on('data', (chunk) => {
      errorChunks.push(chunk.toString());
    });
    
    // Handle process completion
    weasyprint.on('close', (code) => {
      if (code !== 0) {
        const errorMsg = errorChunks.join('');
        console.error('WeasyPrint error:', errorMsg);
        return res.status(500).json({ 
          error: 'Failed to generate PDF',
          details: errorMsg
        });
      }
      
      const pdfBuffer = Buffer.concat(pdfChunks);
      
      // Set response headers for PDF download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${pdfFilename}"`);
      res.setHeader('Content-Length', pdfBuffer.length);
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      
      // Send PDF
      res.end(pdfBuffer);
      console.log('✅ PDF generated successfully with WeasyPrint');
    });
    
    // Handle process errors
    weasyprint.on('error', (err) => {
      console.error('Failed to spawn WeasyPrint:', err);
      res.status(500).json({ 
        error: 'Failed to start PDF generation',
        details: err.message
      });
    });
    
    // Write HTML to stdin and close
    weasyprint.stdin.write(html);
    weasyprint.stdin.end();
    
  } catch (error: any) {
    console.error('Error in PDF generation:', error);
    res.status(500).json({ 
      error: 'Failed to generate PDF. Please try again.',
      details: error.message
    });
  }
});

// POST /api/export/pdf-weasyprint - Generate PDF using Weasyprint service
router.post('/pdf-weasyprint', async (req, res) => {
  try {
    const { html, filename } = req.body;

    if (!html) {
      return res.status(400).json({ error: 'HTML content is required' });
    }

    const pdfFilename = filename || `Export_${new Date().toISOString().split('T')[0]}.pdf`;

    console.log('🚀 Starting PDF generation with Weasyprint...'); 

    // Call external Weasyprint service
    const response = await fetch('https://api.statelessdotcom.com/weasyprintc/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html })
    });

    if (!response.ok) {
      throw new Error(`Weasyprint service error: ${response.status}`);
    }

    const pdfBuffer = Buffer.from(await response.arrayBuffer());

    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error('Weasyprint returned empty response');
    }

    // Set response headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${pdfFilename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);

    // Send the PDF
    res.send(pdfBuffer);
    console.log('✅ PDF generated successfully with Weasyprint');
    
  } catch (error: any) {
    console.error('Error in Weasyprint PDF generation:', error);
    res.status(500).json({ 
      error: 'Failed to generate PDF with Weasyprint. Please try the alternative PDF option.' 
    });
  }
});

export { router as exportRoutes };