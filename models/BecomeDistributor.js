const { Schema, model } = require('mongoose')

// Page content (title + sections)
const BecomeDistributorContentSchema = new Schema({
  title:        { type: String, default: 'Slyder Hotel Lock System Distributor' },
  submissionNote: { type: String, default: 'Please submit the completed application form along with any supporting documents to slydereletronics@gmail.com. We will review your application and contact you if further information is required.' },
  sections:     [{ heading: String, body: String }],
}, { timestamps: true })

// Application form submissions
const DistributorApplicationSchema = new Schema({
  // Contact Info
  companyName:    String,
  contactPerson:  String,
  title:          String,
  email:          String,
  phone:          String,
  address:        String,
  // Company Profile
  yearsInBusiness:  String,
  businessLocation: String,
  numEmployees:     String,
  website:          String,
  companyDesc:      String,
  // Strengths
  technicalExpertise: String,
  customerSupport:    String,
  installationServices: String,
  maintenanceUpgrades:  String,
  trainingServices:     String,
  // Sales Background
  projectExamples:    String,
  clientTestimonials: String,
  salesPerformance:   String,
  // Declaration
  signature: String,
  date:      String,
  read:      { type: Boolean, default: false },
}, { timestamps: true })

module.exports = {
  BecomeDistributorContent: model('BecomeDistributorContent', BecomeDistributorContentSchema),
  DistributorApplication:   model('DistributorApplication',   DistributorApplicationSchema),
}
