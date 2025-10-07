import { getPayload } from 'payload'
import { NextRequest, NextResponse } from 'next/server'
import config from '@/payload.config'

export async function POST(request: NextRequest) {
  const payload = await getPayload({ config })
  const body = await request.json()

  try {
    const { serviceType, formData } = body

    if (!serviceType || !formData) {
      throw new Error('Missing service type or form data.')
    }

    // Map frontend data to the new backend structure
    const newSubmission = await payload.create({
      collection: 'selfReferralForm',
      data: {
        serviceType: serviceType,
        status: 'new',
        submitter: {
          prefix: formData.prefix,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: {
            street: formData.streetAddress,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
          },
          contactPreferences: {
            preferredMethod: formData.preferredContact,
            canLeaveVoicemail: formData.canLeaveVoicemail === 'Yes',
            canText: formData.canText === 'Yes',
          },
        },
        whatBringsYou: formData.whatBringsYou,
        isCourtOrdered: formData.isCourtOrdered === 'Yes',
        howDidYouHear: formData.howDidYouHear,
        deadline: formData.deadline,
        // A simple array for the first "other party"
        otherParties: [
          {
            firstName: formData.otherPartyFirstName,
            lastName: formData.otherPartyLastName,
            phone: formData.otherPartyPhone,
            email: formData.otherPartyEmail,
          },
        ],
        accessibilityNeeds: formData.accessibilityNeeds,
        anythingElse: formData.anythingElse,
      },
    })

    return NextResponse.json({ success: true, submissionId: newSubmission.id })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred.'
    console.error('Error submitting form:', message, error)
    return NextResponse.json({ success: false, message }, { status: 400 })
  }
}
