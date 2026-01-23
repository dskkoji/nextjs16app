import EventCard from "@/components/EventCard"
import { IEvent } from "@/database"
import { cacheLife } from 'next/cache'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL


import events from '@/lib/constants'

const EventsListPage = async () => {
  'use cache'
  cacheLife('hours')
  // const response = await fetch(`${BASE_URL}/api/events`)
  // const { events } = await response.json()

  return (
    <section>
      <div className="mt-20 space-y-7">
        <h3>Events</h3>
        <ul className="events">
          {events && events.length > 0 && events.map((event) => (
            <li key={event.title} className="list-none">
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
  </section>
  )
}

export default EventsListPage