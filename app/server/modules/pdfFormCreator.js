exports.create = function(data){

var fs = require('fs');
var PDFDocument = require('pdfkit');
doc = new PDFDocument

output=fs.createWriteStream('/pdf/'+ data.creator+'.pdf');

doc.pipe(output); 
	
doc.text(data.fname); doc.moveDown();
doc.text(data.mname); doc.moveDown();
doc.text(data.lname); doc.moveDown();
doc.text(data.email); doc.moveDown();
doc.text(data.addr1); doc.moveDown();
doc.text(data.city); doc.moveDown();
doc.text(data.state); doc.moveDown();
doc.text(data.zip); doc.moveDown();
doc.text(data.depositType); doc.moveDown();
doc.text(data.depositAmt); doc.moveDown();
	
doc.end();

return output;
}