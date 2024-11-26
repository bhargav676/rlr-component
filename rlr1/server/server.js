const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Image = require('./model');  // Assuming your model is in 'model.js'
const component=require('./component')
const app = express();

app.use(express.json());
app.use(cors());

cloudinary.config({
  cloud_name: 'dthh2uenu',
  api_key: '184761731987834',   
  api_secret: '3BY0vtJkpgH7vJ527uMEsJ58tHs',
});


mongoose.connect('mongodb+srv://322103312083:951509290@cluster0.pz9fe.mongodb.net/rlr')
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.log('Error occurred while connecting to the database:', err);
  });

// Configure multer-storage-cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',  // The folder where images will be stored in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage: storage });
 
// Backend Endpoint to handle image upload
app.post('/uploadimage', upload.fields([ 
  { name: 'mainImage', maxCount: 1 },
  { name: 'step_1_image', maxCount: 1 },
  { name: 'step_2_image', maxCount: 1 },
  { name: 'step_3_image', maxCount: 1 },
  { name: 'step_4_image', maxCount: 1 },
  { name: 'step_5_image', maxCount: 1 },
  { name: 'step_6_image', maxCount: 1 },
  { name: 'step_7_image', maxCount: 1 },
  { name: 'step_8_image', maxCount: 1 },
  { name: 'step_9_image', maxCount: 1 },
  { name: 'step_10_image', maxCount: 1 },
]), async (req, res) => {
 

  if (!req.files) {
    return res.status(400).send("No files uploaded.");
  }

  // Validate required fields in the request body
  const { title, abstract, videoLink, componentsLink } = req.body;
  if (!title || !abstract) {
    return res.status(400).send("Title and abstract are required.");
  }

  const imageUrls = []; 
  const stepInputs = [];

  // Collect all image URLs from Cloudinary responses
  for (let i = 1; i <= 10; i++) {
    if (req.files[`step_${i}_image`]) {
      imageUrls.push(req.files[`step_${i}_image`][0].path);
      if (req.body[`step_${i}_input`]) {
        stepInputs.push(req.body[`step_${i}_input`]);
      }
    }
  }

  if (req.files.mainImage) {
    imageUrls.unshift(req.files.mainImage[0].path);
  }

  try {
    const newImage = new Image({
      title,
      abstract,
      videoLink,
      componentsLink,
      images: imageUrls,
      stepInputs: stepInputs,  
    });
    await newImage.save();
    res.status(200).json({ message: "Image and data uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).send("Error uploading image: " + error.message);
  }
});


app.get('/getimages', async (req, res) => {
  try {
    // Fetch all the images and data from the database
    const images = await Image.find();

    // Check if no images found
    if (!images || images.length === 0) {
      return res.status(404).send("No images found.");
    }

    // Return the images and associated data
    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).send("Error fetching images: " + error.message);
  }
});



app.post('/components', upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
  
    const imageUrl = req.file.path; 
    const {name,quantity,price,description}=req.body
    try {
      const newdata = new component({ url: imageUrl,name,quantity,price,description });
      await newdata.save();
      res.status(200).json({ status: "Image uploaded successfully", imageUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).send("Error uploading image: " + error.message);
    }
  });



  // Fetch all images (GET /components)
app.get('/components', async (req, res) => {
    try {
      const images = await component.find(); 
      res.status(200).json(images); 
    } catch (error) {
      console.error("Error fetching images:", error);
      res.status(500).send("Error fetching images: " + error.message);
    }
  });
  
app.delete('/components/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
      const deletedComponent = await component.findByIdAndDelete(id); 
      
      if (!deletedComponent) {
        return res.status(404).json({ message: "Component not found" }); 
      }
      
      res.status(200).json({
        status: "Component deleted successfully", 
        id: deletedComponent._id
      });
    } catch (error) {
      console.error("Error deleting component:", error);
      res.status(500).json({ message: "Error deleting component", error: error.message });
    }
  });
app.get('/',(req,res)=>{
  res.send('hello world');
})
  

app.listen(4001, () => {
  console.log("Server connected on port 4001");
});
