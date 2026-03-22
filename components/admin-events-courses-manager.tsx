"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  attendees: number;
  location: string;
  description: string;
  category: string;
  price: string;
  registrationLink: string;
};

type CourseItem = {
  id: string;
  title: string;
  price: string;
  duration: string;
  level: string;
  students: number;
  description: string;
  modules: string[];
  featured: boolean;
  dates: string[];
  time: string;
  certificate: boolean;
  registrationLink: string;
};

type EventsCoursesResponse = {
  events: EventItem[];
  courses: CourseItem[];
};

const initialEventForm = {
  title: "",
  date: "",
  time: "",
  attendees: "",
  location: "",
  description: "",
  category: "",
  price: "",
  registrationLink: "",
};

const initialCourseForm = {
  title: "",
  price: "",
  duration: "",
  level: "",
  students: "",
  description: "",
  modulesText: "",
  datesText: "",
  time: "",
  registrationLink: "",
};

export default function AdminEventsCoursesManager() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [eventForm, setEventForm] = useState(initialEventForm);
  const [courseForm, setCourseForm] = useState(initialCourseForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
  const [isSubmittingCourse, setIsSubmittingCourse] = useState(false);
  const [message, setMessage] = useState("");

  const loadData = async () => {
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/events-courses", {
        cache: "no-store",
      });

      const data = (await response.json()) as
        | EventsCoursesResponse
        | { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Failed to load events and courses.");
      }

      setEvents(data.events || []);
      setCourses(data.courses || []);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to load events and courses.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const addEvent = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingEvent(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/events-courses/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: eventForm.title,
          date: eventForm.date,
          time: eventForm.time,
          attendees: Number(eventForm.attendees || 0),
          location: eventForm.location,
          description: eventForm.description,
          category: eventForm.category,
          price: eventForm.price,
          registrationLink: eventForm.registrationLink,
        }),
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Failed to add event.");
      }

      setEventForm(initialEventForm);
      setMessage("Event added successfully.");
      await loadData();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to add event.",
      );
    } finally {
      setIsSubmittingEvent(false);
    }
  };

  const addCourse = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingCourse(true);
    setMessage("");

    try {
      const modules = courseForm.modulesText
        .split("\n")
        .map((value) => value.trim())
        .filter(Boolean);
      const dates = courseForm.datesText
        .split("\n")
        .map((value) => value.trim())
        .filter(Boolean);

      const response = await fetch("/api/admin/events-courses/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: courseForm.title,
          price: courseForm.price,
          duration: courseForm.duration,
          level: courseForm.level,
          students: Number(courseForm.students || 0),
          description: courseForm.description,
          modules,
          featured: true,
          dates,
          time: courseForm.time,
          certificate: true,
          registrationLink: courseForm.registrationLink,
        }),
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Failed to add course.");
      }

      setCourseForm(initialCourseForm);
      setMessage("Course added successfully.");
      await loadData();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to add course.",
      );
    } finally {
      setIsSubmittingCourse(false);
    }
  };

  const removeEvent = async (id: string) => {
    try {
      const response = await fetch("/api/admin/events-courses/events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Failed to remove event.");
      }

      setMessage("Event removed.");
      await loadData();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to remove event.",
      );
    }
  };

  const removeCourse = async (id: string) => {
    try {
      const response = await fetch("/api/admin/events-courses/courses", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "Failed to remove course.");
      }

      setMessage("Course removed.");
      await loadData();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Failed to remove course.",
      );
    }
  };

  return (
    <section className="mt-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Manage Events & Courses</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add or remove items here, and the Events & Courses page updates
          automatically.
        </p>
        {message ? <p className="mt-2 text-sm text-accent">{message}</p> : null}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-border/60 bg-background/60">
          <CardHeader>
            <CardTitle>Add Event</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" onSubmit={addEvent}>
              <Input
                placeholder="Title"
                value={eventForm.title}
                onChange={(e) =>
                  setEventForm((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
              <Input
                placeholder="Date (e.g. April 10, 2026)"
                value={eventForm.date}
                onChange={(e) =>
                  setEventForm((prev) => ({ ...prev, date: e.target.value }))
                }
                required
              />
              <Input
                placeholder="Time"
                value={eventForm.time}
                onChange={(e) =>
                  setEventForm((prev) => ({ ...prev, time: e.target.value }))
                }
                required
              />
              <Input
                type="number"
                min="0"
                placeholder="Attendees"
                value={eventForm.attendees}
                onChange={(e) =>
                  setEventForm((prev) => ({
                    ...prev,
                    attendees: e.target.value,
                  }))
                }
                required
              />
              <Input
                placeholder="Location"
                value={eventForm.location}
                onChange={(e) =>
                  setEventForm((prev) => ({
                    ...prev,
                    location: e.target.value,
                  }))
                }
                required
              />
              <Input
                placeholder="Category"
                value={eventForm.category}
                onChange={(e) =>
                  setEventForm((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                required
              />
              <Input
                placeholder="Price (e.g. ₹249)"
                value={eventForm.price}
                onChange={(e) =>
                  setEventForm((prev) => ({ ...prev, price: e.target.value }))
                }
                required
              />
              <Input
                type="url"
                placeholder="Registration Link"
                value={eventForm.registrationLink}
                onChange={(e) =>
                  setEventForm((prev) => ({
                    ...prev,
                    registrationLink: e.target.value,
                  }))
                }
                required
              />
              <Textarea
                placeholder="Description"
                value={eventForm.description}
                onChange={(e) =>
                  setEventForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                required
              />
              <Button
                type="submit"
                disabled={isSubmittingEvent}
                className="w-full"
              >
                {isSubmittingEvent ? "Adding Event..." : "Add Event"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-background/60">
          <CardHeader>
            <CardTitle>Add Course</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" onSubmit={addCourse}>
              <Input
                placeholder="Title"
                value={courseForm.title}
                onChange={(e) =>
                  setCourseForm((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
              <Input
                placeholder="Price"
                value={courseForm.price}
                onChange={(e) =>
                  setCourseForm((prev) => ({ ...prev, price: e.target.value }))
                }
                required
              />
              <Input
                placeholder="Duration"
                value={courseForm.duration}
                onChange={(e) =>
                  setCourseForm((prev) => ({
                    ...prev,
                    duration: e.target.value,
                  }))
                }
                required
              />
              <Input
                placeholder="Level"
                value={courseForm.level}
                onChange={(e) =>
                  setCourseForm((prev) => ({ ...prev, level: e.target.value }))
                }
                required
              />
              <Input
                type="number"
                min="0"
                placeholder="Students"
                value={courseForm.students}
                onChange={(e) =>
                  setCourseForm((prev) => ({
                    ...prev,
                    students: e.target.value,
                  }))
                }
                required
              />
              <Input
                placeholder="Time"
                value={courseForm.time}
                onChange={(e) =>
                  setCourseForm((prev) => ({ ...prev, time: e.target.value }))
                }
                required
              />
              <Input
                type="url"
                placeholder="Registration Link"
                value={courseForm.registrationLink}
                onChange={(e) =>
                  setCourseForm((prev) => ({
                    ...prev,
                    registrationLink: e.target.value,
                  }))
                }
                required
              />
              <Textarea
                placeholder="Description"
                value={courseForm.description}
                onChange={(e) =>
                  setCourseForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                required
              />
              <Textarea
                placeholder="Modules (one per line)"
                value={courseForm.modulesText}
                onChange={(e) =>
                  setCourseForm((prev) => ({
                    ...prev,
                    modulesText: e.target.value,
                  }))
                }
                required
              />
              <Textarea
                placeholder="Dates (one per line)"
                value={courseForm.datesText}
                onChange={(e) =>
                  setCourseForm((prev) => ({
                    ...prev,
                    datesText: e.target.value,
                  }))
                }
                required
              />
              <Button
                type="submit"
                disabled={isSubmittingCourse}
                className="w-full"
              >
                {isSubmittingCourse ? "Adding Course..." : "Add Course"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="border-border/60 bg-background/60">
          <CardHeader>
            <CardTitle>Current Events ({events.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : null}
            {!isLoading && events.length === 0 ? (
              <p className="text-sm text-muted-foreground">No events found.</p>
            ) : null}
            {events.map((event) => (
              <div
                key={event.id}
                className="rounded-md border border-border/60 bg-card/50 p-3"
              >
                <p className="font-semibold">{event.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {event.date} | {event.time}
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  className="mt-3"
                  type="button"
                  onClick={() => void removeEvent(event.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-background/60">
          <CardHeader>
            <CardTitle>Current Courses ({courses.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading...</p>
            ) : null}
            {!isLoading && courses.length === 0 ? (
              <p className="text-sm text-muted-foreground">No courses found.</p>
            ) : null}
            {courses.map((course) => (
              <div
                key={course.id}
                className="rounded-md border border-border/60 bg-card/50 p-3"
              >
                <p className="font-semibold">{course.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {course.duration} | {course.price}
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  className="mt-3"
                  type="button"
                  onClick={() => void removeCourse(course.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
