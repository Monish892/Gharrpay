import mongoose from 'mongoose'

const visitSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lead',
      required: true
    },
    propertyName: {
      type: String,
      required: true
    },
    visitDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled'],
      default: 'Scheduled'
    },
    notes: {
      type: String,
      default: ''
    },
    visitOutcome: {
      type: String,
      enum: ['positive', 'negative', 'followup', null],
      default: null
    },
    agentNotes: {
      type: String,
      default: ''
    },
    completedAt: {
      type: Date,
      default: null
    }
  },
  { timestamps: true }
)

export default mongoose.model('Visit', visitSchema)
