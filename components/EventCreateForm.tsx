'use client'
import { useState } from 'react'
import ImageUpload from './ImageUpload'

const EventCreateForm = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [overview, setOverview] = useState("")
  const [venue, setVenue] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [mode, setMode] = useState("")
  const [audience, setAudience] = useState("")
  const [agenda, setAgenda] = useState([])
  const [organizer, setOrganizer] = useState("")
  const [tags, setTags] = useState([])
  const [image, setImage] = useState("")
  const [location, setLocation] = useState("")

  const [submitted,setSubmitted] = useState(false)

  const options = [
    { value: 'online', label: 'online'},
    { value: 'offline', label: 'offline'},
    { value: 'hybrid', label: 'hybrid'},
  ]

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  try {
    console.log(e.target.dispatchEvent)
    setSubmitted(true)
  } catch (error) {
    console.error(error)
  }
}
  return (
    <div id="book-event">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">
            Event Title
          </label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            name="title"
            placeholder="Enter event title"
          />
          <label htmlFor="description">
            Description
          </label>
          <textarea 
            value={description}
            id="description"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            rows={8}
            placeholder="Enter event description"
          />
          <label htmlFor="overview">
            Overview
          </label>
          <input 
            type="text"
            value={overview}
            id="overview"
            name="overview"
            onChange={(e) => setOverview(e.target.value)}
            placeholder="Enter overview"
          />
          <label htmlFor="venue">
            Venue
          </label>
          <input 
            type="text"
            value={venue}
            id="venue"
            name="venue"
            onChange={(e) => setVenue(e.target.value)}
            placeholder="Enter venue"
          />
          <label htmlFor="date">
            Date
          </label>
          <input 
            type="date" 
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            />
          <label htmlFor="time">
            Time
          </label>
          <input 
            type="time" 
            id="time"
            name="time"
            value={time}
            onChange={(e) => setDate(e.target.value)}
            />
            <label htmlFor="mode">
              Mode
            </label>
              <select 
                name="mode" 
                id="mode" 
                value={mode} 
                onChange={e => setMode(e.target.value)}
              >
               {options.map((op) => (
                <option key={op.value} value={op.value}>
                  {op.label}
                </option>
               ))}
               </select>
              <label htmlFor="image">
                Image 
              </label>
                <ImageUpload image={image} />
              <label htmlFor="location">
                Location
              </label>
              <input 
                type="text"
                id="location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
              />
              <label htmlFor="Audience">
                Audience
              </label>
              <input 
                type="text"
                id="audience"
                name="audience"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="Enter audience"
                />
          <button type="submit" className="button-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default EventCreateForm