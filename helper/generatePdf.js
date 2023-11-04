const fs = require('fs');
const pdf = require('html-pdf');
const path = require('path')
const ejs = require('ejs')
const { Readable } = require('stream');



async function generatePDF(data) {
    try {
        if (data && data.totalAmount) {
            let amount = data.totalAmount;
            delete data.totalAmount;
            amount += (amount * 12) / 100;
            data.totalAmount = amount;
        }

        const templatePath = path.join(__dirname, '..', 'views', 'invoice.html');
        const htmlTemplate = fs.readFileSync(templatePath, 'utf8');
        const htmlContent = ejs.render(htmlTemplate, { data });

        return new Promise((resolve, reject) => {
            pdf.create(htmlContent, { format: 'Letter' }).toStream((err, stream) => {
                if (err) {
                    console.error('Error in PDF generation:', err);
                    reject(err);
                } else {
                    const chunks = [];
                    stream.on('data', (chunk) => {
                        chunks.push(chunk);
                    });

                    stream.on('end', () => {
                        const pdfBlob = Buffer.concat(chunks);
                        resolve(pdfBlob);
                    });
                }
            });
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
}


module.exports = {
    generatePDF
}




