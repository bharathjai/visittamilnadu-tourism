// Supabase Edge Function: send-booking-confirmation
// Dispatches booking confirmation email via Resend API

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, recipientName, bookingReference, packageTitle, travelDate, totalAmount, travelersCount } = await req.json()

    if (!email || !bookingReference || !packageTitle) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const emailContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #FAF7F2; border-radius: 8px; border: 1px solid #E05A47;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #E05A47;">
          <h1 style="color: #E05A47; margin: 0; font-size: 28px;">VisitTamilNadu</h1>
          <p style="color: #1E3F20; margin: 5px 0 0 0; font-weight: bold;">Official Booking Confirmation</p>
        </div>
        
        <div style="padding: 20px 0; color: #1A2E40;">
          <h2 style="color: #1A2E40; font-size: 20px;">Vanakkam ${recipientName || 'Valued Traveler'},</h2>
          <p style="line-height: 1.6; font-size: 15px;">Your tour package booking has been successfully confirmed!</p>
          
          <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; border-left: 4px solid #D4AF37; margin: 20px 0;">
            <p style="margin: 5px 0; font-size: 14px;"><strong>Booking Reference:</strong> <span style="color: #E05A47; font-weight: bold;">${bookingReference}</span></p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Package:</strong> ${packageTitle}</p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Travel Date:</strong> ${travelDate}</p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Travelers:</strong> ${travelersCount} Guest(s)</p>
            <p style="margin: 5px 0; font-size: 14px;"><strong>Total Price:</strong> ₹${Number(totalAmount).toLocaleString('en-IN')}</p>
          </div>
          
          <p style="line-height: 1.6; font-size: 14px;">Our local travel guide team will contact you 24 hours before your departure date with driver details and meeting points.</p>
        </div>
        
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #D4AF37; color: #888888; font-size: 12px;">
          <p>© 2026 VisitTamilNadu — Tamil Nadu Tourism Development Board Partner. All rights reserved.</p>
        </div>
      </div>
    `

    // Call Resend API
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'VisitTamilNadu Bookings <bookings@visittamilnadu.org>',
        to: [email],
        subject: `Booking Confirmed [Ref: ${bookingReference}] — ${packageTitle}`,
        html: emailContent
      })
    })

    const resendData = await resendRes.json()

    return new Response(
      JSON.stringify({ success: true, resendData }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
