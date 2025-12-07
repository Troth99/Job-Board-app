import Application from "../models/Application.js";


export const createApplication = async (req, res) => {
  try {
    const { jobId, userId, email, phone, coverLetter, cv } = req.body;

    // Save only CV link in MongoDB
    const application = await Application.create({
      jobId,
      userId,
      email,
      phone,
      cv,
      coverLetter,
    });
    res.status(201).json(application);
  } catch (err) {
    console.error("Application creation error:", err);
    res.status(500).json({ error: "Failed to create application", details: err.message });
  }
};


export const downloadCv = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application || !application.cvUrl) {
      return res.status(404).json({ error: "CV not found" });
    }
    res.download(application.cvUrl);
  } catch (err) {
    res.status(500).json({ error: "Failed to download CV" });
  }
};


export const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await Application.find({ jobId });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};


export const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) return res.status(404).json({ error: "Not found" });
    res.json(application);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch application" });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const  {status}  = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required.' });
    }
    const updated = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Application not found.' });
    }
    res.json(updated);
  } catch (error) {
console.error('Error updating application status:', error, req.body, req.params.id);
res.status(500).json({ message: 'Server error.' });
  }
};
export const deleteApplication = async (req, res) => {
  try {
    await Application.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Application deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete application" });
  }
};
