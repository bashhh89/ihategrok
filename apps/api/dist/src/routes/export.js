import express from 'express';
const router = express.Router();
// POST /api/export/pdf - Generate PDF via Weasyprint service
router.post('/pdf', async (req, res) => {
    try {
        const { html, filename } = req.body;
        if (!html) {
            return res.status(400).json({ error: 'HTML content is required' });
        }
        const pdfFilename = filename || `Export_${new Date().toISOString().split('T')[0]}.pdf`;
        console.log('🚀 Proxying PDF generation to Weasyprint service...');
        // Forward request to Weasyprint service
        // Try external URL first, then fallback to Docker internal network
        const weasyPrintUrls = [
            'https://socialgarden-theweasyprint.ul2dku.easypanel.host/pdf',
            'http://10.0.2.2:5001/pdf'
        ];
        let response;
        let lastError;
        for (const baseUrl of weasyPrintUrls) {
            try {
                response = await fetch(`${baseUrl}?filename=${encodeURIComponent(pdfFilename)}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/html',
                    },
                    body: html
                });
                if (response.ok)
                    break;
            }
            catch (error) {
                lastError = error;
                continue;
            }
        }
        if (!response || !response.ok) {
            console.error('Weasyprint service error:', response?.status, response?.statusText);
            return res.status(500).json({
                error: 'PDF generation service is currently unavailable. Please try again later.'
            });
        }
        // Get the PDF buffer
        const pdfBuffer = Buffer.from(await response.arrayBuffer());
        // Set response headers for PDF download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${pdfFilename}"`);
        res.setHeader('Content-Length', pdfBuffer.length);
        // Send the PDF
        res.send(pdfBuffer);
        console.log('✅ PDF generated and sent successfully');
    }
    catch (error) {
        console.error('Error in PDF export proxy:', error);
        // Check if it's a network error (service unreachable)
        if (error?.code === 'ENOTFOUND' || error?.code === 'ECONNREFUSED' || error?.name === 'FetchError') {
            return res.status(503).json({
                error: 'PDF generation service is currently unavailable. Please contact support or try again later.'
            });
        }
        res.status(500).json({ error: 'Internal server error during PDF generation' });
    }
});
export { router as exportRoutes };
