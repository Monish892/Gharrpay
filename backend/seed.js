import Agent from './models/Agent.js'
import Lead from './models/Lead.js'
import Visit from './models/Visit.js'
import { connectDB } from './config/database.js'

const seedDatabase = async () => {
  try {
    await connectDB()
    
    await Agent.deleteMany({})
    await Lead.deleteMany({})
    await Visit.deleteMany({})
    
    const agents = await Agent.insertMany([
      {
        name: 'Rajesh Kumar',
        email: 'rajesh@gharrpay.com',
        phone: '+919876543210',
        activeLeads: 0,
        totalLeadsAssigned: 0,
        successfulBookings: 0,
        status: 'active'
      },
      {
        name: 'Priya Sharma',
        email: 'priya@gharrpay.com',
        phone: '+919876543211',
        activeLeads: 0,
        totalLeadsAssigned: 0,
        successfulBookings: 0,
        status: 'active'
      },
      {
        name: 'Arjun Patel',
        email: 'arjun@gharrpay.com',
        phone: '+919876543212',
        activeLeads: 0,
        totalLeadsAssigned: 0,
        successfulBookings: 0,
        status: 'active'
      },
      {
        name: 'Sophia Khan',
        email: 'sophia@gharrpay.com',
        phone: '+919876543213',
        activeLeads: 0,
        totalLeadsAssigned: 0,
        successfulBookings: 0,
        status: 'active'
      },
      {
        name: 'Amit Bhattacharya',
        email: 'amit@gharrpay.com',
        phone: '+919876543214',
        activeLeads: 0,
        totalLeadsAssigned: 0,
        successfulBookings: 0,
        status: 'active'
      },
      {
        name: 'Sneha Desai',
        email: 'sneha@gharrpay.com',
        phone: '+919876543215',
        activeLeads: 0,
        totalLeadsAssigned: 0,
        successfulBookings: 0,
        status: 'active'
      },
      {
        name: 'Vikram Singh',
        email: 'vikram@gharrpay.com',
        phone: '+919876543216',
        activeLeads: 0,
        totalLeadsAssigned: 0,
        successfulBookings: 0,
        status: 'active'
      },
      {
        name: 'Ritesh Pandey',
        email: 'ritesh@gharrpay.com',
        phone: '+919876543217',
        activeLeads: 0,
        totalLeadsAssigned: 0,
        successfulBookings: 0,
        status: 'active'
      },
      {
        name: 'Meera Kadam',
        email: 'meera@gharrpay.com',
        phone: '+919876543218',
        activeLeads: 0,
        totalLeadsAssigned: 0,
        successfulBookings: 0,
        status: 'active'
      },
      {
        name: 'Rohan Mitra',
        email: 'rohan@gharrpay.com',
        phone: '+919876543219',
        activeLeads: 0,
        totalLeadsAssigned: 0,
        successfulBookings: 0,
        status: 'active'
      },
      {
        name: 'Anjana Kumar',
        email: 'anjana@gharrpay.com',
        phone: '+919876543220',
        activeLeads: 0,
        totalLeadsAssigned: 0,
        successfulBookings: 0,
        status: 'active'
      },
      {
        name: 'Nikhil Reddy',
        email: 'nikhil@gharrpay.com',
        phone: '+919876543221',
        activeLeads: 0,
        totalLeadsAssigned: 0,
        successfulBookings: 0,
        status: 'active'
      },
      {
        name: 'Divya Singh',
        email: 'divya@gharrpay.com',
        phone: '+919876543222',
        activeLeads: 0,
        totalLeadsAssigned: 0,
        successfulBookings: 0,
        status: 'active'
      }
    ])
    
    const leads = await Lead.insertMany([
      // New Leads
      {
        name: 'Aditya Singh',
        phone: '+918765432101',
        email: 'aditya.singh@example.com',
        source: 'website',
        status: 'New Lead',
        assignedAgent: agents[0]._id,
        budget: 15000,
        requirements: '1BHK, Near Metro, South Delhi'
      },
      {
        name: 'Neha Gupta',
        phone: '+918765432102',
        email: 'neha.gupta@example.com',
        source: 'whatsapp',
        status: 'New Lead',
        assignedAgent: agents[1]._id,
        budget: 12000,
        requirements: '2BHK, Gurgaon'
      },
      {
        name: 'Sakshi Desai',
        phone: '+918765432104',
        email: 'sakshi.desai@example.com',
        source: 'social',
        status: 'New Lead',
        assignedAgent: agents[0]._id,
        budget: 11000,
        requirements: '1BHK, Noida'
      },
      {
        name: 'Karan Patel',
        phone: '+918765432150',
        email: 'karan.patel@example.com',
        source: 'website',
        status: 'New Lead',
        assignedAgent: agents[3]._id,
        budget: 14000,
        requirements: '2BHK, Bangalore'
      },
      {
        name: 'Zara Khan',
        phone: '+918765432151',
        email: 'zara.khan@example.com',
        source: 'call',
        status: 'New Lead',
        assignedAgent: agents[4]._id,
        budget: 16000,
        requirements: '3BHK, Mumbai'
      },
      {
        name: 'Ravi Nath',
        phone: '+918765432152',
        email: 'ravi.nath@example.com',
        source: 'form',
        status: 'New Lead',
        assignedAgent: agents[5]._id,
        budget: 13000,
        requirements: '1BHK, Hyderabad'
      },
      {
        name: 'Ishita Mehta',
        phone: '+918765432153',
        email: 'ishita.mehta@example.com',
        source: 'whatsapp',
        status: 'New Lead',
        assignedAgent: agents[6]._id,
        budget: 18000,
        requirements: '3BHK, Pune'
      },
      {
        name: 'Aryan Sharma',
        phone: '+918765432154',
        email: 'aryan.sharma@example.com',
        source: 'social',
        status: 'New Lead',
        assignedAgent: agents[7]._id,
        budget: 12500,
        requirements: '2BHK, Jaipur'
      },
      // Contacted Leads
      {
        name: 'Rohan Verma',
        phone: '+918765432103',
        email: 'rohan.verma@example.com',
        source: 'call',
        status: 'Contacted',
        assignedAgent: agents[2]._id,
        budget: 18000,
        requirements: '3BHK, Sector 5, Faridabad'
      },
      {
        name: 'Priya Nair',
        phone: '+918765432160',
        email: 'priya.nair@example.com',
        source: 'website',
        status: 'Contacted',
        assignedAgent: agents[8]._id,
        budget: 17000,
        requirements: '2BHK, Indore'
      },
      {
        name: 'Vikram Singh',
        phone: '+918765432161',
        email: 'vikram.singh@example.com',
        source: 'form',
        status: 'Contacted',
        assignedAgent: agents[9]._id,
        budget: 15000,
        requirements: '1BHK, Chandigarh'
      },
      {
        name: 'Disha Reddy',
        phone: '+918765432162',
        email: 'disha.reddy@example.com',
        source: 'call',
        status: 'Contacted',
        assignedAgent: agents[10]._id,
        budget: 19000,
        requirements: '3BHK, Ahmedabad'
      },
      // Requirement Collected
      {
        name: 'Esha Kumar',
        phone: '+918765432170',
        email: 'esha.kumar@example.com',
        source: 'website',
        status: 'Requirement Collected',
        assignedAgent: agents[11]._id,
        budget: 14000,
        requirements: '2BHK, Lucknow'
      },
      {
        name: 'Harish Nair',
        phone: '+918765432171',
        email: 'harish.nair@example.com',
        source: 'whatsapp',
        status: 'Requirement Collected',
        assignedAgent: agents[12]._id,
        budget: 13500,
        requirements: '1BHK, Kochi'
      },
      {
        name: 'Gajendra Iyer',
        phone: '+918765432172',
        email: 'gajendra.iyer@example.com',
        source: 'social',
        status: 'Requirement Collected',
        assignedAgent: agents[0]._id,
        budget: 20000,
        requirements: '4BHK, Bangalore'
      },
      // Property Suggested
      {
        name: 'Vikram Chaturvedi',
        phone: '+918765432105',
        email: 'vikram.chaturvedi@example.com',
        source: 'form',
        status: 'Property Suggested',
        assignedAgent: agents[1]._id,
        budget: 20000,
        requirements: 'Studio, Downtown Delhi'
      },
      {
        name: 'Francesca Rossi',
        phone: '+918765432180',
        email: 'francesca.rossi@example.com',
        source: 'website',
        status: 'Property Suggested',
        assignedAgent: agents[2]._id,
        budget: 25000,
        requirements: '2BHK Luxury, Mumbai'
      },
      {
        name: 'Imran Malik',
        phone: '+918765432181',
        email: 'imran.malik@example.com',
        source: 'call',
        status: 'Property Suggested',
        assignedAgent: agents[3]._id,
        budget: 16000,
        requirements: '2BHK, Delhi NCR'
      },
      {
        name: 'Jen Martinez',
        phone: '+918765432182',
        email: 'jen.martinez@example.com',
        source: 'form',
        status: 'Property Suggested',
        assignedAgent: agents[4]._id,
        budget: 18000,
        requirements: '3BHK Villa, Gurgaon'
      },
      // Visit Scheduled
      {
        name: 'Divya Reddy',
        phone: '+918765432106',
        email: 'divya.reddy@example.com',
        source: 'website',
        status: 'Visit Scheduled',
        assignedAgent: agents[2]._id,
        budget: 13000,
        requirements: '2BHK, East Delhi'
      },
      {
        name: 'Karen Wong',
        phone: '+918765432190',
        email: 'karen.wong@example.com',
        source: 'whatsapp',
        status: 'Visit Scheduled',
        assignedAgent: agents[5]._id,
        budget: 21000,
        requirements: '3BHK, Bangalore'
      },
      {
        name: 'Lalit Singh',
        phone: '+918765432191',
        email: 'lalit.singh@example.com',
        source: 'social',
        status: 'Visit Scheduled',
        assignedAgent: agents[6]._id,
        budget: 12000,
        requirements: '1BHK, Pune'
      },
      {
        name: 'Manisha Rao',
        phone: '+918765432192',
        email: 'manisha.rao@example.com',
        source: 'form',
        status: 'Visit Scheduled',
        assignedAgent: agents[7]._id,
        budget: 14500,
        requirements: '2BHK, Hyderabad'
      },
      {
        name: 'Naveen Joshi',
        phone: '+918765432193',
        email: 'naveen.joshi@example.com',
        source: 'website',
        status: 'Visit Scheduled',
        assignedAgent: agents[8]._id,
        budget: 15000,
        requirements: '2BHK, Jaipur'
      },
      // Visit Completed
      {
        name: 'Kunal Joshi',
        phone: '+918765432107',
        email: 'kunal.joshi@example.com',
        source: 'whatsapp',
        status: 'Visit Completed',
        assignedAgent: agents[0]._id,
        budget: 16000,
        requirements: '1BHK, Dwarka'
      },
      {
        name: 'Anjali Nair',
        phone: '+918765432108',
        email: 'anjali.nair@example.com',
        source: 'call',
        status: 'Visit Completed',
        assignedAgent: agents[1]._id,
        budget: 14000,
        requirements: '2BHK, Vasant Kunj'
      },
      {
        name: 'Olivia Brown',
        phone: '+918765432200',
        email: 'olivia.brown@example.com',
        source: 'website',
        status: 'Visit Completed',
        assignedAgent: agents[9]._id,
        budget: 22000,
        requirements: '3BHK Luxury, Mumbai'
      },
      {
        name: 'Paramjit Singh',
        phone: '+918765432201',
        email: 'paramjit.singh@example.com',
        source: 'whatsapp',
        status: 'Visit Completed',
        assignedAgent: agents[10]._id,
        budget: 11000,
        requirements: '1BHK, Ludhiana'
      },
      {
        name: 'Quentin Dubois',
        phone: '+918765432202',
        email: 'quentin.dubois@example.com',
        source: 'social',
        status: 'Visit Completed',
        assignedAgent: agents[11]._id,
        budget: 19000,
        requirements: '3BHK, Bangalore'
      },
      {
        name: 'Riya Desai',
        phone: '+918765432203',
        email: 'riya.desai@example.com',
        source: 'form',
        status: 'Visit Completed',
        assignedAgent: agents[12]._id,
        budget: 13500,
        requirements: '2BHK, Pune'
      },
      // Booked
      {
        name: 'Harsh Mahajan',
        phone: '+918765432109',
        email: 'harsh.mahajan@example.com',
        source: 'social',
        status: 'Booked',
        assignedAgent: agents[2]._id,
        budget: 19000,
        requirements: '3BHK, Greater Noida'
      },
      {
        name: 'Sanjay Kumar',
        phone: '+918765432210',
        email: 'sanjay.kumar@example.com',
        source: 'website',
        status: 'Booked',
        assignedAgent: agents[0]._id,
        budget: 17000,
        requirements: '2BHK, Bangalore'
      },
      {
        name: 'Tanya Singh',
        phone: '+918765432211',
        email: 'tanya.singh@example.com',
        source: 'call',
        status: 'Booked',
        assignedAgent: agents[3]._id,
        budget: 15000,
        requirements: '2BHK, Gurgaon'
      },
      {
        name: 'Uma Nath',
        phone: '+918765432212',
        email: 'uma.nath@example.com',
        source: 'whatsapp',
        status: 'Booked',
        assignedAgent: agents[4]._id,
        budget: 21000,
        requirements: '3BHK Villa, Mumbai'
      },
      {
        name: 'Vittorio Romano',
        phone: '+918765432213',
        email: 'vittorio.romano@example.com',
        source: 'form',
        status: 'Booked',
        assignedAgent: agents[5]._id,
        budget: 20000,
        requirements: '3BHK, Delhi'
      },
      {
        name: 'Wanda Phillips',
        phone: '+918765432214',
        email: 'wanda.phillips@example.com',
        source: 'social',
        status: 'Booked',
        assignedAgent: agents[6]._id,
        budget: 18000,
        requirements: '2BHK, Hyderabad'
      },
      // Lost Leads
      {
        name: 'Pooja Saxena',
        phone: '+918765432110',
        email: 'pooja.saxena@example.com',
        source: 'form',
        status: 'Lost',
        assignedAgent: agents[0]._id,
        budget: 10000,
        requirements: 'Studio, Budget option'
      },
      {
        name: 'Xavier Thompson',
        phone: '+918765432220',
        email: 'xavier.thompson@example.com',
        source: 'website',
        status: 'Lost',
        assignedAgent: agents[7]._id,
        budget: 12000,
        requirements: '1BHK, Chandigarh'
      },
      {
        name: 'Yuki Tanaka',
        phone: '+918765432221',
        email: 'yuki.tanaka@example.com',
        source: 'call',
        status: 'Lost',
        assignedAgent: agents[8]._id,
        budget: 14000,
        requirements: '2BHK, Jaipur'
      }
    ])
    
    await Agent.findByIdAndUpdate(agents[0]._id, { activeLeads: 8, totalLeadsAssigned: 12, successfulBookings: 2 })
    await Agent.findByIdAndUpdate(agents[1]._id, { activeLeads: 7, totalLeadsAssigned: 11, successfulBookings: 2 })
    await Agent.findByIdAndUpdate(agents[2]._id, { activeLeads: 6, totalLeadsAssigned: 10, successfulBookings: 1 })
    await Agent.findByIdAndUpdate(agents[3]._id, { activeLeads: 5, totalLeadsAssigned: 8, successfulBookings: 1 })
    await Agent.findByIdAndUpdate(agents[4]._id, { activeLeads: 6, totalLeadsAssigned: 9, successfulBookings: 2 })
    await Agent.findByIdAndUpdate(agents[5]._id, { activeLeads: 5, totalLeadsAssigned: 7, successfulBookings: 1 })
    await Agent.findByIdAndUpdate(agents[6]._id, { activeLeads: 7, totalLeadsAssigned: 10, successfulBookings: 2 })
    await Agent.findByIdAndUpdate(agents[7]._id, { activeLeads: 4, totalLeadsAssigned: 6, successfulBookings: 1 })
    await Agent.findByIdAndUpdate(agents[8]._id, { activeLeads: 5, totalLeadsAssigned: 8, successfulBookings: 1 })
    await Agent.findByIdAndUpdate(agents[9]._id, { activeLeads: 6, totalLeadsAssigned: 9, successfulBookings: 2 })
    await Agent.findByIdAndUpdate(agents[10]._id, { activeLeads: 4, totalLeadsAssigned: 7, successfulBookings: 1 })
    await Agent.findByIdAndUpdate(agents[11]._id, { activeLeads: 5, totalLeadsAssigned: 8, successfulBookings: 1 })
    await Agent.findByIdAndUpdate(agents[12]._id, { activeLeads: 6, totalLeadsAssigned: 9, successfulBookings: 2 })
    
    const visits = await Visit.insertMany([
      // Scheduled visits
      {
        leadId: leads[19]._id,
        propertyName: 'Green Garden Residency',
        visitDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        status: 'Scheduled',
        notes: 'First visit scheduled'
      },
      {
        leadId: leads[23]._id,
        propertyName: 'Sky Heights Premium',
        visitDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        status: 'Scheduled',
        notes: 'Visit scheduled for weekend'
      },
      {
        leadId: leads[22]._id,
        propertyName: 'Ultra Modern Towers',
        visitDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        status: 'Scheduled',
        notes: 'Scheduled for property viewing'
      },
      // Completed visits
      {
        leadId: leads[24]._id,
        propertyName: 'Sky Heights Apartments',
        visitDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: 'Completed',
        visitOutcome: 'positive',
        notes: 'Lead interested in property',
        agentNotes: 'Client liked the location and amenities'
      },
      {
        leadId: leads[25]._id,
        propertyName: 'Luxury Living Complex',
        visitDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: 'Completed',
        visitOutcome: 'positive',
        notes: 'Positive visit outcome',
        agentNotes: 'Client ready to book'
      },
      {
        leadId: leads[26]._id,
        propertyName: 'Platinum Heights',
        visitDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'Completed',
        visitOutcome: 'positive',
        notes: 'Great match found',
        agentNotes: 'Excellent property-client match'
      },
      {
        leadId: leads[27]._id,
        propertyName: 'Crystal Gardens Apartments',
        visitDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        status: 'Completed',
        visitOutcome: 'positive',
        notes: 'Client very interested',
        agentNotes: 'Expected booking soon'
      },
      {
        leadId: leads[28]._id,
        propertyName: 'Royal Palace Towers',
        visitDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        status: 'Completed',
        visitOutcome: 'followup',
        notes: 'Need more options',
        agentNotes: 'Client wants to compare'
      },
      {
        leadId: leads[29]._id,
        propertyName: 'Elite Residency',
        visitDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        status: 'Completed',
        visitOutcome: 'positive',
        notes: 'Visit went well',
        agentNotes: 'Good follow-up opportunity'
      },
      {
        leadId: leads[30]._id,
        propertyName: 'Magnolia Homes',
        visitDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        status: 'Completed',
        visitOutcome: 'positive',
        notes: 'Excellent property',
        agentNotes: 'Already booked!'
      }
    ])
    
    console.log('Database seeded successfully')
    console.log(`Agents created: ${agents.length}`)
    console.log(`Leads created: ${leads.length}`)
    console.log(`Visits created: ${visits.length}`)
    
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error.message)
    process.exit(1)
  }
}

seedDatabase()
