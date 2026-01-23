import { NextRequest, NextResponse } from 'next/server'

import connectDB from '@/lib/mongodb'
import Event, { IEvent } from '@/database/event.model'

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    await connectDB()

    const { slug } = await params

    if (!slug || typeof slug !== 'string' || slug.trim() === '') {
      return NextResponse.json(
        { message: 'Invalid or missing slug parameter' },
        { status: 400 }
      )
    }

    const sanitalizedSlug = slug.trim().toLowerCase()

    const event = await Event.findOne({ slug: sanitalizedSlug }).lean()

    if (!event) {
      return NextResponse.json(
        { message: `Event with slug '${sanitalizedSlug}' not found` },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Event fetched successfully', event },
      { status: 200 }
    )
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching events by slug:', error)
    }

    if (error instanceof Error) {
      if (error.message.includes('MONGODB_URI')) {
        return NextResponse.json(
          { message: 'Database configuration error' },
          { status: 500 }
        )
      }

      return NextResponse.json(
        { message: 'Failed to fetch events', error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}


export async function DELETE(
  req: NextRequest,
  { params }: RouteParams 
): Promise<NextResponse> {
  try {
    await connectDB()

    const { slug } = await params

    if (!slug || typeof slug !== 'string' || slug.trim() === "") {
      return NextResponse.json(
        { messege: 'Invalid or missing parameter' }, 
        { status: 400 }
      )
    }

    const sanitalizedSlug = slug.trim().toLowerCase()

    const deletedEvent = await Event.deleteOne({ slug: sanitalizedSlug })
    if (!deletedEvent) {
      return NextResponse.json(
        { message: 'Delete Event not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { message: 'Event deleted' },
      { status: 201 }
    )
  } catch (e) {
    return NextResponse.json({ message: 'Event Deleting failed', error: e }, { status: 500 })
  }
}