const {response} = require('express')
const File = require('../models/file');

// Show the list of files
const indexfile = async (req, res, next) => {
  try {
    const files = await File.find();
    res.json(files); // Sending the array directly without wrapping it in an object
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching files' });
  }
};

// Show a single file by id
const showfile = async (req, res, next) => {
  const { Doc_code } = req.params; // Assuming the Doc_code is in the URL parameters
  try {
    const file = await File.findOne({ Doc_code }); // Corrected to use findOne with a query object
    if (file) {
      res.json(file);
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the file' });
  }
};


// Add a file
const addfile = async (req, res, next) => {
  try {
    const file = new File({
      Doc_code: req.body.Doc_code,
      sender: req.body.sender,
      recipient: req.body.recipient,
      category: req.body.category,
      priortization: req.body.priortization,
      description: req.body.description,
      filename: req.files ? req.files[0].originalname : '',
      // Check if req.files exists and handle multiple files
      files: req.files ? req.files.map(file => file.path) : [], 
    });

    await file.save();
    res.status(201).json({ message: 'File added successfully' });
  } catch (error) {
    console.error("Error adding file:", error);
    res.status(500).json({ message: 'An error occurred while adding the file' });
  }
};



// Update a file
const updatefile = async (req, res, next) => {
  const { Doc_code } = req.params;
  const updateData = {
    sender: req.body.sender,
    recipient: req.body.recipient,
    category: req.body.category,
    priortization: req.body.priortization,
    description: req.body.description,
  };
  try {
    const updatedFile = await File.findByIdAndUpdate(Doc_code, updateData, { new: true });
    if (updatedFile) {
      res.json({ message: 'File updated successfully' });
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the file' });
  }
};

// Delete a file
const destroyfile = async (req, res, next) => {
  const { Doc_code } = req.params;
  try {
    const deletedFile = await File.findByIdAndDelete(Doc_code);
    if (deletedFile) {
      res.json({ message: 'File deleted successfully' });
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the file' });
  }
};

module.exports = {
  indexfile,
  showfile,
  addfile,
  updatefile,
  destroyfile,
};
