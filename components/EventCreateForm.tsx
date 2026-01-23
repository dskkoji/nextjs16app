"use client";
import { useState } from "react";
import ImageUpload from "./ImageUpload";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventCreateForm = () => {
  const [submitted, setSubmitted] = useState(false);
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
    location: "",
  }
  const [formData, setFormData] = useState(initialData);

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
  } = formData;

  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("overview", formData.overview);
      formDataToSend.append("venue", formData.venue);
      formDataToSend.append("mode", formData.mode);
      formDataToSend.append("audience", formData.audience);
      formDataToSend.append("organizer", formData.organizer);
      formDataToSend.append("agenda", JSON.stringify(formData.agenda));
      formDataToSend.append("date", formData.date);
      formDataToSend.append("time", formData.time);
      formDataToSend.append("location", formData.location);
      formDataToSend.append("tags", JSON.stringify(formData.tags));

      // ファイルオブジェクトを追加
      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }

      const res = await fetch(`${BASE_URL}/api/events`, {
        method: "POST",
        body: formDataToSend,
      });
      setSubmitted(true);
      setFormData(initialData)
      return await res.json();
    } catch (e) {
      console.error("Failed to create event:", e);
    }
  };

  const options = [
    { value: "online", label: "online" },
    { value: "offline", label: "offline" },
    { value: "hybrid", label: "hybrid" },
  ];

  return (
    <div id="book-event">
      <form onSubmit={handleClick}>
        <div>
          <label htmlFor="title">Event Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Enter event title"
          />
          <label htmlFor="description">Description</label>
          <textarea
            value={description}
            id="description"
            name="description"
            rows={8}
            placeholder="Enter event description"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <label htmlFor="overview">Overview</label>
          <input
            type="text"
            value={overview}
            id="overview"
            name="overview"
            placeholder="Enter overview"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, overview: e.target.value }))
            }
          />
          <label htmlFor="venue">Venue</label>
          <input
            type="text"
            value={venue}
            id="venue"
            name="venue"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, venue: e.target.value }))
            }
            placeholder="Enter venue"
          />
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, date: e.target.value }))
            }
          />
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            value={time}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, time: e.target.value }))
            }
          />
          <label htmlFor="mode">Mode</label>
          <select
            name="mode"
            id="mode"
            value={mode}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, mode: e.target.value }))
            }
          >
            {options.map((op) => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>

          <label htmlFor="Audience">Audience</label>
          <input
            type="text"
            id="audience"
            name="audience"
            value={audience}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, audience: e.target.value }))
            }
            placeholder="Enter audience"
          />
          <label htmlFor="agenda">Agenda</label>
          <textarea
            rows={10}
            id="agenda"
            name="agenda"
            value={agenda}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, agenda: e.target.value }))
            }
          />
          <label htmlFor="tags">Tags</label>
          <input
            id="tags"
            name="tags"
            value={tags}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, tags: e.target.value }))
            }
          />
          <label>Organizer</label>
          <input
            id="organizer"
            name="organizer"
            value={organizer}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, organizer: e.target.value }))
            }
            placeholder="Enter organizer"
          />
          <label htmlFor="image">Image</label>
          <ImageUpload
            image={image}
            onImageChange={(file) =>
              setFormData((prev) => ({ ...prev, image: file }))
            }
          />
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, location: e.target.value }))
            }
            placeholder="Enter location"
          />
          <button type="submit" className="button-submit mt-4">
            {submitted ? "Created Event Successfully!" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventCreateForm;
