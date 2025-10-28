import mongoose from 'mongoose';

const placementSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true
    },
    course: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: [true, 'Company name is required']
    },
    position: {
      type: String,
      required: true
    },
    salary: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: ''
    },
    testimonial: {
      type: String,
      default: ''
    },
    placementDate: {
      type: Date,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Placement', placementSchema);
