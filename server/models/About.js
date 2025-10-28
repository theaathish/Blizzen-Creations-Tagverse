import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      default: 'About Blizzen Creations Academy'
    },
    heroImage: {
      type: String,
      default: ''
    },
    heroDescription: {
      type: String,
      required: true
    },
    missionTitle: {
      type: String,
      default: 'Our Mission'
    },
    missionDescription: {
      type: String,
      required: true
    },
    visionTitle: {
      type: String,
      default: 'Our Vision'
    },
    visionDescription: {
      type: String,
      required: true
    },
    valuesTitle: {
      type: String,
      default: 'Our Core Values'
    },
    values: [
      {
        title: String,
        description: String,
        icon: String
      }
    ],
    team: [
      {
        name: String,
        position: String,
        bio: String,
        image: String
      }
    ],
    achievements: [
      {
        label: String,
        value: String
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('About', aboutSchema);
