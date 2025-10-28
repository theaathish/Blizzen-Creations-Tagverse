import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    description: {
      type: String,
      required: [true, 'Course description is required']
    },
    shortDescription: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner'
    },
    price: {
      type: Number,
      default: 0
    },
    instructor: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: ''
    },
    highlights: [String],
    curriculum: [
      {
        module: String,
        topics: [String]
      }
    ],
    prerequisites: [String],
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Course', courseSchema);
