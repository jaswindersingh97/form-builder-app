const Form = require("../models/FormModel");
const asyncHandler = require('./../utils/asyncHandler')
const Submission = require('./../models/SubmissionModel')
const getform =async(req,res) =>{
    const {formId} = req.params;
    const form = await Form.findById(formId)
    if(!form){
        return res.status(400).json({
            message:"Form doesn't exists please check"
        })
    }
    return res.status(200).json({
        message:"Form fetched successfully",
        form:form
    })
}
const submitForm = async(req,res) =>{
    const {formId} = req.params;
    const {data} = req.body;

    const submission = await Submission.create({
      formId,
      data,
    });
  


    res.status(201).json({
      message: 'Form submitted successfully.',
      submission,
      data
    });
  
}

module.exports = {
    getform: asyncHandler(getform),
    submitForm:asyncHandler(submitForm)
};