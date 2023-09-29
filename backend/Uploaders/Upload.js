const multer = require('multer')
var path = require('path');

var multerStorage = multer.diskStorage({
	destination: function(req, file, callback) {
   
      callback(null, "./uploads");			
	},
	filename: function(req, file, callback) {
		callback(null, file.originalname);
	},
	
});

const upload = multer({
    storage: multerStorage,
    fileFilter: function (req, file, callback) {
      var ext = path.extname(file.originalname);
      if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg'&& ext !== '.HEIC' && ext !== '.JPG' && ext !== '.PNG' && ext !== '.JPEG') {
          return callback(new Error('Only images are allowed'))
      }
      callback(null, true)
  }
  
  
  });
  



const uploadFiles = upload.array("files", 5);





module.exports = uploadFiles












