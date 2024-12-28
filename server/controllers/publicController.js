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
    
    return res.status(201).json({
      message: 'Form submitted successfully.',
      submission,
      data
    });
}

const ProgressTracking = require('./../models/ProgressTrackingModel'); // Adjust the path as needed

const view = async (req, res) => {
  const { formId } = req.params;

    let progress = await ProgressTracking.findOne({ formId });
    if (!progress) {
      progress = new ProgressTracking({ formId, viewCount: 1, startedCount: 0, completedCount: 0 });
    } else {
      progress.viewCount += 1;
    }
    await progress.save();

    res.status(200).json({
      message: 'Form view tracked successfully.',
      viewCount: progress.viewCount,
    });
};

const start = async (req, res) => {
  const { formId } = req.params;

    let progress = await ProgressTracking.findOne({ formId });
    if (!progress) {
      progress = new ProgressTracking({ formId, startedCount: 1, completedCount: 0, viewCount: 0 });
    } else {
      progress.startedCount += 1;
    }
    await progress.save();

    res.status(200).json({
      message: 'Form start tracked successfully.',
      startedCount: progress.startedCount,
    });
  }

const complete =  async (req, res) => {
  const { formId } = req.params;

    let progress = await ProgressTracking.findOne({ formId });
    if (!progress) {
      progress = new ProgressTracking({ formId, completedCount: 1, startedCount: 0, viewCount: 0 });
    } else {
      progress.completedCount += 1;
    }
    await progress.save();

    res.status(200).json({
      message: 'Form completion tracked successfully.',
      completedCount: progress.completedCount,
    });
};

module.exports = {
    getform: asyncHandler(getform),
    submitForm:asyncHandler(submitForm), 
    view:asyncHandler(view),
    start:asyncHandler(start),
    complete:asyncHandler(complete)
};