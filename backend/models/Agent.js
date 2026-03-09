import mongoose from 'mongoose'

const agentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
      default: null
    },
    activeLeads: {
      type: Number,
      default: 0
    },
    totalLeadsAssigned: {
      type: Number,
      default: 0
    },
    successfulBookings: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active'
    }
  },
  { timestamps: true }
)

export default mongoose.model('Agent', agentSchema)
