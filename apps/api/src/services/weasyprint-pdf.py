#!/usr/bin/env python3
"""
WeasyPrint PDF Generation Service
Generates professional PDFs with proper page numbers and formatting
"""

import sys
import json
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration

def generate_pdf(html_content):
    """Generate PDF from HTML using WeasyPrint"""
    try:
        # Font configuration for custom fonts
        font_config = FontConfiguration()
        
        # Additional CSS for page numbers and PDF-specific styling
        pdf_css = CSS(string='''
            @page {
                size: A4;
                margin: 0.5in 0.5in 0.75in 0.5in;
                
                @bottom-center {
                    content: "Page " counter(page) " of " counter(pages);
                    font-size: 10px;
                    color: #666;
                }
                
                @bottom-left {
                    content: "Social Garden";
                    font-size: 10px;
                    font-weight: 600;
                    color: #666;
                }
                
                @bottom-right {
                    content: "CONFIDENTIAL";
                    font-size: 10px;
                    font-style: italic;
                    color: #666;
                }
            }
            
            /* Prevent page breaks inside important elements */
            .scope, .roles-table, .section {
                page-break-inside: avoid;
            }
            
            /* Ensure tables don't break badly */
            table {
                page-break-inside: avoid;
            }
            
            thead {
                display: table-header-group;
            }
            
            tr {
                page-break-inside: avoid;
            }
        ''', font_config=font_config)
        
        # Create HTML object and render to PDF
        html = HTML(string=html_content, base_url='https://demo.qandu.me/')
        pdf_bytes = html.write_pdf(stylesheets=[pdf_css], font_config=font_config)
        
        # Write to stdout for Node.js to capture
        sys.stdout.buffer.write(pdf_bytes)
        sys.stdout.buffer.flush()
        
        return 0
        
    except Exception as e:
        sys.stderr.write(f"PDF Generation Error: {str(e)}\\n")
        return 1

if __name__ == '__main__':
    # Read HTML content from stdin
    html_content = sys.stdin.read()
    
    if not html_content:
        sys.stderr.write("Error: No HTML content provided\\n")
        sys.exit(1)
    
    sys.exit(generate_pdf(html_content))
