exports.create = function(data){

var fs = require('fs');
var PDFDocument = require('pdfkit');
doc = new PDFDocument(
{
layout: 'portrait'
}
);

outputfile= (__dirname + '/public/pdf/'+ data.creator + '.pdf');

output=fs.createWriteStream(outputfile);

doc.pipe(output); 

doc.image(__dirname + '/public/img/header.jpg',0,0); doc.moveDown();	
doc.image(__dirname + '/public/uploads/'+data.lname+'.jpg', 250,200);
doc.image(__dirname + '/public/uploads/'+data.lname+'sig.jpg', 300,500);
doc.moveDown();doc.moveDown();doc.moveDown();
doc.moveDown(); doc.moveDown(); doc.moveDown();
doc.moveDown();
doc.moveDown();
doc.text('First Name: '+ data.fname); doc.moveDown();
doc.text('Middle Name: '+data.mname); doc.moveDown();
doc.text('Last Name: '+data.lname); doc.moveDown();
doc.text('SSN: '+data.ssn); doc.moveDown();
doc.text('Email: '+data.email); doc.moveDown();
doc.text('Address: '+data.addr1); doc.moveDown();
doc.text('City: '+data.city); doc.moveDown();
doc.text('State: '+data.state); doc.moveDown();
doc.text('Zip: '+data.zip); doc.moveDown();
doc.moveDown();
doc.text('Deposit Information'); 
doc.text('----------------------------------------------------------'); 
doc.moveDown();
doc.text('Deposit Type: '+data.deposittype); doc.moveDown();
doc.text('Deposit Amount: '+data.depositamt); doc.moveDown(); doc.moveDown(); doc.moveDown();
doc.text(data.fname+' '+data.lname,425,700);
doc.moveDown();doc.text('Created By: '+data.creator,15,700);

doc.end();

}