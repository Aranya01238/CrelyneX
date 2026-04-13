import type { Metadata } from "next";
import Footer from "@/components/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  Clock,
  ArrowRight,
  CheckCircle2,
  Workflow,
  Target,
  History,
} from "lucide-react";
import Image from "next/image";
import { readEventsCoursesData } from "@/lib/events-courses";

export const metadata: Metadata = {
  title: "Events & Courses | CrelyneX",
  description:
    "Join CrelyneX events and practical courses to level up in machine learning, IoT, and modern development.",
};

export const dynamic = "force-dynamic";

const questFlow = [
  {
    quest: "Quest 01",
    title: "Pick Your Track",
    detail:
      "Choose between ML, Three.js, and web/app specializations based on your goal.",
  },
  {
    quest: "Quest 02",
    title: "Join Live Sessions",
    detail:
      "Attend guided classes with practical tasks, code walkthroughs, and support.",
  },
  {
    quest: "Quest 03",
    title: "Build & Showcase",
    detail:
      "Complete a project challenge and share your work with mentors for feedback.",
  },
  {
    quest: "Quest 04",
    title: "Get Certified",
    detail:
      "Receive a completion certificate and community visibility for your portfolio.",
  },
];

// Removed hardcoded completedCourseArchive correctly replaced by dynamic data below

export default async function EventsCoursesPage() {
  const { events, courses } = await readEventsCoursesData();
  
  const upcomingEvents = events.filter(e => !e.completed);
  const pastEvents = events.filter(e => e.completed);
  const activeCourses = courses.filter(c => !c.completed);
  const archivedCourses = courses.filter(c => c.completed);
  
  const featuredCourse = activeCourses[0];

  return (
    <div className="min-h-screen bg-transparent flex flex-col">


      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/40 py-16 sm:py-20">
          <div className="absolute inset-0 bg-linear-to-r from-secondary/10 via-accent/10 to-primary/10" />
          <div className="absolute left-8 top-8 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
          <div className="container relative mx-auto px-4">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="max-w-3xl">
                <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Events &{" "}
                  <span className="bg-linear-to-r from-secondary to-accent bg-clip-text text-transparent">
                    Courses
                  </span>
                </h1>
                <p className="text-base text-muted-foreground sm:text-lg">
                  Join our community for exclusive events, workshops, and
                  comprehensive courses. Upskill and network with tech
                  enthusiasts.
                </p>
              </div>
              <div className="relative mx-auto hidden h-52 w-full max-w-sm perspective-distant md:block">
                <div className="absolute inset-8 rounded-2xl border border-secondary/40 bg-secondary/10 transform-[rotateX(58deg)_rotateZ(-28deg)]" />
                <div className="absolute inset-0 rounded-2xl border border-border/70 bg-card/70 p-5 shadow-xl backdrop-blur transform-[translate3d(0,0,80px)]">
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Learning Grid
                  </div>
                  <div className="mt-2 text-xl font-semibold">
                    Events, Courses, Quests
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="border-b border-border/40 py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-3xl font-bold">Featured Event</h2>
              <p className="mt-2 text-muted-foreground">
                Join our latest hands-on workshop and community sessions
              </p>
            </div>

            <div className="max-w-2xl space-y-5">
              {upcomingEvents.length === 0 ? (
                <Card className="border-border/40 bg-card/50">
                  <CardContent className="pt-6 text-muted-foreground">
                    No events are available right now.
                  </CardContent>
                </Card>
              ) : null}

              {upcomingEvents.map((event) => (
                <Card
                  key={event.id}
                  className="border-secondary/40 bg-linear-to-br from-card to-card/50 backdrop-blur transition-all hover:border-secondary/70 hover:shadow-2xl hover:shadow-secondary/20"
                >
                  <CardHeader>
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-2xl">
                          {event.title}
                        </CardTitle>
                        <Badge className="mt-3 bg-secondary/20 text-secondary hover:bg-secondary/30 text-sm">
                          {event.category}
                        </Badge>
                      </div>
                      <div className="text-left sm:text-right">
                        <div className="text-3xl font-bold text-accent">
                          {event.price}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          E-Certificate
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <CardDescription className="text-base leading-relaxed">
                      {event.description}
                    </CardDescription>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 rounded-lg bg-card/50 p-3">
                        <Calendar className="h-5 w-5 text-accent shrink-0" />
                        <span className="font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg bg-card/50 p-3">
                        <Clock className="h-5 w-5 text-accent shrink-0" />
                        <span className="font-medium">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 rounded-lg bg-card/50 p-3">
                        <Users className="h-5 w-5 text-accent shrink-0" />
                        <span className="font-medium">
                          {event.attendees}+ participants
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-6">
                          Register Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                      <a
                        href="https://chat.whatsapp.com/KVzZksJWnJT0aJvm1fzK7W"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          className="w-full border-secondary/50 text-secondary hover:bg-secondary/10 font-bold py-6"
                        >
                          More Info
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Past Events Section */}
            {pastEvents.length > 0 && (
              <div className="mt-20">
                <div className="mb-10">
                  <h3 className="text-xl font-bold text-muted-foreground flex items-center gap-2">
                    <History className="h-5 w-5" /> Recent Past Events
                  </h3>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {pastEvents.map((event) => (
                    <Card key={event.id} className="border-border/40 bg-card/30 opacity-80 grayscale-[0.5] hover:grayscale-0 transition-all">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <Badge variant="outline" className="w-fit">{event.category}</Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-muted-foreground mb-3 flex items-center gap-2">
                          <Calendar className="h-3 w-3" /> {event.date}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                        <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-500">
                          <CheckCircle2 className="h-4 w-4" /> Successfully Concluded
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12">
              <h2 className="text-3xl font-bold">Courses</h2>
              <p className="mt-2 text-muted-foreground">
                The previous Machine Learning Bootcamp is completed. New cohorts
                will be announced soon.
              </p>
            </div>

            {featuredCourse && (
              <div className="grid gap-8 lg:grid-cols-2 items-center">
                {/* Bootcamp Poster */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-linear-to-r from-secondary/20 to-accent/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Image
                    src="/ml-bootcamp.png"
                    alt={featuredCourse.title}
                    width={500}
                    height={700}
                    className="relative w-full rounded-lg border border-border/40 shadow-2xl"
                  />
                </div>

                {/* Course Details */}
                <div className="space-y-6">
                  <div>
                    <Badge className="bg-secondary/20 text-secondary hover:bg-secondary/30 mb-4">
                      {featuredCourse.level}
                    </Badge>
                    <h3 className="mb-4 text-2xl font-bold sm:text-3xl">
                      {featuredCourse.title}
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      {featuredCourse.description}
                    </p>
                  </div>

                  {/* Key Info */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-border/40 bg-card/50 p-4">
                      <div className="text-sm text-muted-foreground mb-1">
                        Duration
                      </div>
                      <div className="font-semibold">
                        {featuredCourse.duration}
                      </div>
                    </div>
                    <div className="rounded-lg border border-border/40 bg-card/50 p-4">
                      <div className="text-sm text-muted-foreground mb-1">
                        Price
                      </div>
                      <div className="text-2xl font-bold text-accent">
                        {featuredCourse.price}
                      </div>
                    </div>
                    <div className="rounded-lg border border-border/40 bg-card/50 p-4 sm:col-span-2">
                      <div className="text-sm text-muted-foreground mb-2">
                        Time
                      </div>
                      <div className="font-semibold">
                        {featuredCourse.time} IST
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-accent" />
                      Available Dates
                    </h4>
                    <div className="space-y-2">
                      {featuredCourse.dates.map((date, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-2 rounded-lg bg-card/30 border border-border/20"
                        >
                          <CheckCircle2 className="h-4 w-4 text-accent" />
                          <span className="text-sm">{date}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learning Modules */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">What You'll Learn:</h4>
                    <div className="grid gap-2">
                      {featuredCourse.modules.map((module, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm"
                        >
                          <div className="h-2 w-2 rounded-full bg-accent" />
                          {module}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  {featuredCourse.certificate && (
                    <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                      <div className="flex items-center gap-2 text-accent font-semibold">
                        <CheckCircle2 className="h-5 w-5" />
                        E-Certificate Included
                      </div>
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <a
                      href={featuredCourse.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base py-6">
                        Register Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </a>
                    <a
                      href="https://chat.whatsapp.com/KVzZksJWnJT0aJvm1fzK7W"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-secondary/50 text-secondary hover:bg-secondary/10 font-bold text-base py-6"
                      >
                        Ask on WhatsApp
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Archived Courses Section */}
            {archivedCourses.length > 0 && (
              <div className="mt-16 space-y-6">
                 <h3 className="text-2xl font-bold text-zinc-400">Archived Cohorts</h3>
                 <div className="grid gap-6 md:grid-cols-2">
                   {archivedCourses.map(course => (
                     <Card key={course.id} className="border-secondary/30 bg-linear-to-br from-card to-card/60 backdrop-blur">
                       <CardHeader>
                         <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                           <div>
                             <CardTitle className="text-xl">
                               {course.title}
                             </CardTitle>
                             <CardDescription className="mt-2 text-sm italic">
                               This cohort has successfully concluded.
                             </CardDescription>
                           </div>
                           <Badge className="w-fit bg-secondary/10 text-secondary border-secondary/20">
                             Completed
                           </Badge>
                         </div>
                       </CardHeader>
                       <CardContent className="space-y-4">
                         <div className="flex items-center gap-2 rounded-lg border border-border/40 bg-card/40 p-3 text-xs text-muted-foreground font-medium">
                           <Calendar className="h-4 w-4 text-accent" />
                           Concluded: {course.duration}
                         </div>
                         <div className="grid grid-cols-2 gap-2">
                            {course.modules.slice(0, 4).map((m, i) => (
                              <div key={i} className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                <CheckCircle2 className="h-3 w-3 text-accent" />
                                {m}
                              </div>
                            ))}
                         </div>
                         <div className="pt-2">
                           <a
                             href="https://forms.gle/VEBroAEH3stdeuMv7"
                             target="_blank"
                             rel="noopener noreferrer"
                           >
                             <Button variant="outline" size="sm" className="w-full border-accent/30 text-accent hover:bg-accent/10">
                               Notify for Next Cohort
                               <ArrowRight className="ml-2 h-4 w-4" />
                             </Button>
                           </a>
                         </div>
                       </CardContent>
                     </Card>
                   ))}
                 </div>
              </div>
            )}
          </div>
        </section>

        {/* Quest Workflow */}
        <section className="border-t border-border/40 py-16 sm:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-10 max-w-2xl">
              <Badge className="mb-4 bg-secondary/20 text-secondary hover:bg-secondary/30">
                How It Works
              </Badge>
              <h2 className="text-3xl font-bold md:text-4xl">
                Quest-Based Learning Workflow
              </h2>
              <p className="mt-3 text-muted-foreground">
                Learn through structured quests so you always know what to do
                next and how to measure progress.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {questFlow.map((item) => (
                <Card
                  key={item.quest}
                  className="border-border/60 bg-linear-to-b from-card to-card/70"
                >
                  <CardHeader>
                    <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground">
                      <Workflow className="h-3.5 w-3.5" />
                      {item.quest}
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {item.detail}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-accent/30 bg-accent/10 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 font-semibold text-accent">
                    <Target className="h-5 w-5" />
                    Start Your Next Quest Today
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Join upcoming cohorts and build real work that can be added
                    to your portfolio.
                  </p>
                </div>
                <a
                  href="https://forms.gle/VEBroAEH3stdeuMv7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                    Join a Quest
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
