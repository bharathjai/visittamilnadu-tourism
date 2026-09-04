import jsPDF from 'jspdf'

export function generateBookingPDF(booking) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  const primaryColor = [30, 77, 43]  // #1E4D2B Nilgiri Emerald Green
  const darkColor = [10, 35, 18]     // #0A2312 Deep Forest Night
  const goldColor = [212, 175, 55]   // #D4AF37 Royal Gold

  // HEADER BANNER
  doc.setFillColor(...primaryColor)
  doc.rect(0, 0, 210, 30, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.text('VisitTamilNadu', 15, 18)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('Official Tour Booking E-Ticket', 195, 18, { align: 'right' })

  // BOOKING REFERENCE BADGE
  doc.setFillColor(250, 247, 242)
  doc.rect(15, 38, 180, 22, 'F')
  doc.setDrawColor(...goldColor)
  doc.setLineWidth(0.5)
  doc.rect(15, 38, 180, 22, 'S')

  doc.setTextColor(...darkColor)
  doc.setFontSize(11)
  doc.text('BOOKING REFERENCE', 22, 47)
  doc.setFontSize(16)
  doc.setTextColor(...primaryColor)
  doc.setFont('helvetica', 'bold')
  doc.text(booking.booking_reference || 'TN-100293', 22, 55)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 100, 100)
  doc.text(`Issued: ${booking.created_at || new Date().toISOString().split('T')[0]}`, 185, 51, { align: 'right' })
  doc.text(`Status: ${booking.status?.toUpperCase() || 'CONFIRMED'}`, 185, 56, { align: 'right' })

  // PACKAGE DETAILS SECTION
  doc.setLineWidth(0.3)
  doc.setDrawColor(220, 220, 220)
  doc.line(15, 68, 195, 68)

  doc.setTextColor(...darkColor)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('PACKAGE DETAILS', 15, 76)

  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text(booking.package_title || booking.title || 'Tamil Nadu Tour Package', 15, 84)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(80, 80, 80)
  doc.text(`Destination: ${booking.location || 'Tamil Nadu'}`, 15, 91)
  doc.text(`Travel Date: ${booking.travel_date || 'N/A'}`, 15, 97)

  const travelersText = typeof booking.travelers === 'object' 
    ? `${booking.travelers?.adults || 1} Adult(s), ${booking.travelers?.children || 0} Child(ren)`
    : `${booking.travelers_count || 1} Traveler(s)`
  doc.text(`Travelers: ${travelersText}`, 15, 103)

  // TRAVELER DETAILS
  doc.line(15, 110, 195, 110)
  doc.setTextColor(...darkColor)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('PRIMARY PASSENGER INFO', 15, 118)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(80, 80, 80)
  doc.text(`Guest Name: ${booking.user_name || 'Primary Traveler'}`, 15, 126)
  doc.text(`Contact Email: ${booking.user_email || 'N/A'}`, 15, 132)
  doc.text(`Contact Phone: ${booking.user_phone || '+91 98765 43210'}`, 15, 138)

  // PRICE SUMMARY TABLE
  doc.setFillColor(245, 245, 245)
  doc.rect(15, 148, 180, 30, 'F')

  doc.setTextColor(...darkColor)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('PAYMENT SUMMARY (BOOKING CONFIRMATION ONLY)', 20, 156)

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('Package Subtotal:', 20, 163)
  doc.text(`₹${Number(booking.total_price || 0).toLocaleString('en-IN')}`, 185, 163, { align: 'right' })

  doc.text('Taxes & Fees (Included):', 20, 169)
  doc.text('₹0.00', 185, 169, { align: 'right' })

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.setTextColor(...primaryColor)
  doc.text('Total Amount Paid:', 20, 175)
  doc.text(`₹${Number(booking.total_price || 0).toLocaleString('en-IN')}`, 185, 175, { align: 'right' })

  // IMPORTANT INSTRUCTIONS
  doc.setTextColor(...darkColor)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('IMPORTANT TRAVEL INFORMATION', 15, 190)

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 100, 100)
  const instructions = [
    '1. Please present this e-ticket along with a valid government ID (Aadhaar / Passport / Voter ID) upon arrival.',
    '2. Our official Tamil Nadu local coordinator will call your registered contact number 24 hours prior to departure.',
    '3. For temple visits (Madurai / Rameswaram / Tanjore), please ensure traditional modest dress code.',
    '4. For hill station tours (Ooty / Kodaikanal), carry warm clothing as temperatures can drop significantly at night.'
  ]

  let yPos = 197
  instructions.forEach(ins => {
    doc.text(ins, 15, yPos)
    yPos += 6
  })

  // FOOTER
  doc.setDrawColor(...goldColor)
  doc.line(15, 270, 195, 270)
  doc.setFontSize(8)
  doc.setTextColor(120, 120, 120)
  doc.text('VisitTamilNadu — Official Partner of Tamil Nadu Tourism Development Corporation', 105, 276, { align: 'center' })
  doc.text('Need help? Email support@visittamilnadu.org | Call Helpline: +91 (044) 2538 0000', 105, 281, { align: 'center' })

  // Save the generated PDF
  doc.save(`VisitTN_ETicket_${booking.booking_reference || 'Ref'}.pdf`)
}
