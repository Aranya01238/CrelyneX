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
  completed: false,
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
  completed: false,
};

export default function AdminEventsCoursesManager() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [eventForm, setEventForm] = useState(initialEventForm);
  const [courseForm, setCourseForm] = useState(initialCourseForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingEvent, setIsSubmittingEvent] = useState(false);
  const [isSubmittingCourse, setIsSubmittingCourse] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
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
        throw new Error((data as any).error || "Failed to load events and courses.");
      }

      const vData = data as EventsCoursesResponse;
      setEvents(vData.events || []);
      setCourses(vData.courses || []);
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

  const handleEventSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingEvent(true);
    setMessage("");

    try {
      const isEditing = Boolean(editingEventId);
      const url = "/api/admin/events-courses/events";
      const method = isEditing ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingEventId,
          title: eventForm.title,
          date: eventForm.date,
          time: eventForm.time,
          attendees: Number(eventForm.attendees || 0),
          location: eventForm.location,
          description: eventForm.description,
          category: eventForm.category,
          price: eventForm.price,
          registrationLink: eventForm.registrationLink,
          completed: eventForm.completed,
        }),
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || `Failed to ${isEditing ? "update" : "add"} event.`);
      }

      setEventForm(initialEventForm);
      setEditingEventId(null);
      setMessage(`Event ${isEditing ? "updated" : "added"} successfully.`);
      await loadData();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Submission failed.",
      );
    } finally {
      setIsSubmittingEvent(false);
    }
  };

  const handleCourseSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingCourse(true);
    setMessage("");

    try {
      const isEditing = Boolean(editingCourseId);
      const url = "/api/admin/events-courses/courses";
      const method = isEditing ? "PATCH" : "POST";

      const modules = courseForm.modulesText
        .split("\n")
        .map((value) => value.trim())
        .filter(Boolean);
      const dates = courseForm.datesText
        .split("\n")
        .map((value) => value.trim())
        .filter(Boolean);

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingCourseId,
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
          completed: courseForm.completed,
        }),
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || `Failed to ${isEditing ? "update" : "add"} course.`);
      }

      setCourseForm(initialCourseForm);
      setEditingCourseId(null);
      setMessage(`Course ${isEditing ? "updated" : "added"} successfully.`);
      await loadData();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Submission failed.",
      );
    } finally {
      setIsSubmittingCourse(false);
    }
  };

  const startEditingEvent = (item: EventItem) => {
    setEditingEventId(item.id);
    setEventForm({
      title: item.title,
      date: item.date,
      time: item.time,
      attendees: String(item.attendees),
      location: item.location,
      description: item.description,
      category: item.category,
      price: item.price,
      registrationLink: item.registrationLink,
      completed: item.completed,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const startEditingCourse = (item: CourseItem) => {
    setEditingCourseId(item.id);
    setCourseForm({
      title: item.title,
      price: item.price,
      duration: item.duration,
      level: item.level,
      students: String(item.students),
      description: item.description,
      modulesText: item.modules.join("\n"),
      datesText: item.dates.join("\n"),
      time: item.time,
      registrationLink: item.registrationLink,
      completed: item.completed,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleEventCompletion = async (event: EventItem) => {
    try {
      const response = await fetch("/api/admin/events-courses/events", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: event.id, completed: !event.completed }),
      });
      if (!response.ok) throw new Error("Toggle failed");
      await loadData();
    } catch (error) {
       setMessage("Failed to toggle status");
    }
  };

  const toggleCourseCompletion = async (course: CourseItem) => {
    try {
      const response = await fetch("/api/admin/events-courses/courses", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: course.id, completed: !course.completed }),
      });
      if (!response.ok) throw new Error("Toggle failed");
      await loadData();
    } catch (error) {
       setMessage("Failed to toggle status");
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
            <form className="space-y-3" onSubmit={handleEventSubmit}>
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
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={eventForm.completed}
                  onChange={(e) =>
                    setEventForm((prev) => ({ ...prev, completed: e.target.checked }))
                  }
                />
                Mark as Completed
              </label>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={isSubmittingEvent}
                  className="flex-1"
                >
                  {isSubmittingEvent 
                    ? (editingEventId ? "Updating..." : "Adding...") 
                    : (editingEventId ? "Update Event" : "Add Event")}
                </Button>
                {editingEventId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingEventId(null);
                      setEventForm(initialEventForm);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-background/60">
          <CardHeader>
            <CardTitle>Add Course</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" onSubmit={handleCourseSubmit}>
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
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={courseForm.completed}
                  onChange={(e) =>
                    setCourseForm((prev) => ({ ...prev, completed: e.target.checked }))
                  }
                />
                Mark as Completed
              </label>
              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={isSubmittingCourse}
                  className="flex-1"
                >
                  {isSubmittingCourse 
                    ? (editingCourseId ? "Updating..." : "Adding...") 
                    : (editingCourseId ? "Update Course" : "Add Course")}
                </Button>
                {editingCourseId && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingCourseId(null);
                      setCourseForm(initialCourseForm);
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
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
                <p className="font-semibold flex items-center gap-2">
                  {event.title}
                  {event.completed && (
                    <span className="text-[10px] bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 rounded-full uppercase font-black">
                      Completed
                    </span>
                  )}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {event.date} | {event.time}
                </p>
                <div className="mt-3 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => startEditingEvent(event)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant={event.completed ? "secondary" : "outline"}
                    size="sm"
                    type="button"
                    onClick={() => void toggleEventCompletion(event)}
                  >
                    {event.completed ? "Mark Active" : "Mark Completed"}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    type="button"
                    onClick={() => void removeEvent(event.id)}
                  >
                    Remove
                  </Button>
                </div>
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
                <p className="font-semibold flex items-center gap-2">
                  {course.title}
                  {course.completed && (
                    <span className="text-[10px] bg-green-500/10 text-green-500 border border-green-500/20 px-2 py-0.5 rounded-full uppercase font-black">
                      Completed
                    </span>
                  )}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {course.duration} | {course.price}
                </p>
                <div className="mt-3 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => startEditingCourse(course)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant={course.completed ? "secondary" : "outline"}
                    size="sm"
                    type="button"
                    onClick={() => void toggleCourseCompletion(course)}
                  >
                    {course.completed ? "Mark Active" : "Mark Completed"}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    type="button"
                    onClick={() => void removeCourse(course.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
