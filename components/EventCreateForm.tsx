'use client'
import { useState } from 'react'
import ImageUpload from './ImageUpload'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventCreateForm = () => {
  const [submitted, setSubmitted] = useState(false)
  const initialData = {
    title: "",
    description: "",
    overview: "",
    venue: "",
    date: "",
    time: "",
    mode: "",
    audience: "",
    organizer: "",
    agenda: "",
    tags: "",
    image: "" as string | File,
    location: ""
  }
  const [formData, setFormData] = useState(initialData)

  const {
    title,
    description,
    overview,
    venue,
    date,
    time,
    mode,
    audience,
    agenda,
    tags,
    organizer,
    image,
    location,
  } = formData

  const handleClick = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const formDataToSend = new FormData()
      formDataToSend.append("title", title)
      formDataToSend.append("description", description)
      formDataToSend.append("overview", overview)
      formDataToSend.append("venue", venue)
      formDataToSend.append("mode", mode)
      formDataToSend.append("audience",audience)
      formDataToSend.append("organizer", organizer)
      formDataToSend.append("agenda", JSON.stringify(agenda))
      formDataToSend.append("date", date)
      formDataToSend.append("time", time)
      formDataToSend.append("location", location)
      formDataToSend.append("tags", JSON.stringify(tags))

      if (formData.image instanceof File) {
        formDataToSend.append("image", image)
      }

      const res = await fetch(`${BASE_URL}/api/events`, {
        method: "POST",
        body: formDataToSend
      })
      
      if (res.status !== 201) {
        alert(`Something wrong: ${res.statusText}` )
      } else {
        setSubmitted(true)
        setFormData(initialData)
        return await res.json()
      }
    } catch (e) {
      console.error("Failed to create event:", e)
    }
  }

  const options = [
    { value: "online", label: "online" },
    { value: "offline", label: "offline" },
    { value: "hybrid", label: "hybrid" },
  ]

  return (
    <div id="book-event">
      <form onSubmit={handleClick}>
        <div>
          <label htmlFor="title">
            Title
          </label>
          <input 
            type="text"
            id="title"
            name="title"
            value={title}
            placeholder="Enter Title"
            onChange={(e) => setFormData((prev) => ({...prev, title: e.target.value }))}
          />
          <label htmlFor="description">
            Description
          </label>
          <textarea 
            id="description"
            name="description"
            value={description}
            placeholder="Enter Description"
            onChange={(e) => setFormData((prev) => ({...prev, description: e.target.value }))}
            rows={8}
          />
          <label htmlFor="overview">
            Overview
          </label>
          <input 
            type="text"
            id="overview"
            name="overview"
            value={overview}
            placeholder="Enter overview"
            onChange={(e) => setFormData((prev) => ({...prev, overview: e.target.value }))}
          />
          <label htmlFor="venue">
            Venue
          </label>
          <input 
            type="text"
            id="venue"
            name="venue"
            value={venue}
            placeholder="Enter venue"
            onChange={(e) => setFormData((prev) => ({...prev, venue: e.target.value }))}
          />
          <label htmlFor="date">
            Date
          </label>
          <input 
            type="date"
            id="date"
            name="date"
            value={date}
            placeholder="Enter date"
            onChange={(e) => setFormData((prev) => ({...prev, date: e.target.value }))}
          />
          <label htmlFor="time">
            Time
          </label>
          <input 
            type="time"
            id="time"
            name="time"
            value={time}
            placeholder="Enter time"
            onChange={(e) => setFormData((prev) => ({...prev, time: e.target.value }))}
          />
          <label htmlFor="mode">
            Mode
          </label>
          <select 
            id="mode"
            name="mode"
            value={mode}
            onChange={(e) => setFormData((prev) => ({...prev, mode: e.target.value }))}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <label htmlFor="audience">
            Audience
          </label>
          <input 
            type="text"
            id="audience"
            name="audience"
            value={audience}
            placeholder="Enter audience"
            onChange={(e) => setFormData((prev) => ({...prev, audience: e.target.value }))}
          />
          <label htmlFor="agenda">
            agenda
          </label>
          <textarea 
            id="agenda"
            name="agenda"
            value={agenda}
            placeholder="Enter agenda"
            onChange={(e) => setFormData((prev) => ({...prev, agenda: e.target.value }))}
            rows={10}
          />
          <label htmlFor="tags">
            Tags
          </label>
          <input 
            type="text"
            id="tags"
            name="tags"
            value={tags}
            placeholder="Enter tags"
            onChange={(e) => setFormData((prev) => ({...prev, tags: e.target.value }))}
          />
          <label htmlFor="organizer">
            Organizer
          </label>
          <input 
            type="text" 
            id="organizer"
            name="organizer"
            value={organizer}
            onChange={(e) => setFormData((prev) => ({ ...prev, organizer: e.target.value }))}  
            placeholder="Enter organizer"
          />
          <label htmlFor="image">
            Image
          </label>
          <ImageUpload 
            image={image}
            onImageChange={(file) =>
              setFormData((prev) => ({ ...prev, image: file }))
            }
          />
          <label htmlFor="location">
            location
          </label>
          <input 
            type="text" 
            id="location"
            name="location"
            value={location}
            onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}  
            placeholder="Enter organizer"
          />
          <button type="submit" className="button-submit mt-4">
            {submitted ?  "Created Event Successfully!" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EventCreateForm