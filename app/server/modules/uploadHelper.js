var fs = require("fs");
var stream = require('stream');

var fileName;

 /**
 *  do upload
 */
 function doUpload(req, res) {
                fileName = req.files.identification.name;
                req.setEncoding("binary");
    var filePath = "c://test/";
    var fileStream = null;
                var serverPath = filePath + req.files.identification.name;
                var is = fs.createReadStream(req.files.identification.path)
                var os = fs.createWriteStream(serverPath);

                stream(is, os, function(error) {
                    fs.unlinkSync(req.files.identification.path);
					stream.end();
                    if(error) {
                res.send(JSON.stringify({
                    error: 'Error occurred in File Upload'
                }));
                return;
            }
            console.log("Request complete for upload and calling the dot net service for Parsing...................................");
			res.send("FILE UPLOAD COMPLETED ..................");
			//upload_complete(req, res);
         }
                );


}


function upload_complete(req,res) {
    console.log("Request complete for upload and calling the dot net service for Parsing...................................");
    res.send("FILE UPLOAD COMPLETED ..................");
}





exports.doUpload=doUpload;
