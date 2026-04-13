import type { Metadata } from "next";
import Footer from "@/components/footer";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Lightbulb, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About | CrelyneX",
  description:
    "Meet the CrelyneX team and discover our mission, values, and innovation journey.",
};

const team = [
  {
    name: "Aranya Rath",
    role: "Founder",
    bio: "Leading CrelyneX vision, strategy, and innovation initiatives.",
    icon: "👨‍💼",
  },
  {
    name: "Swarnabha Ray",
    role: "Co-Founder",
    bio: "Driving product direction and community growth at CrelyneX.",
    icon: "👨‍💼",
  },
  {
    name: "Snehasis Das",
    role: "Co-Founder",
    bio: "Building operations and partnerships for long-term impact.",
    icon: "👩‍💼",
  },
  {
    name: "Amullyajit Nandi",
    role: "Core Team - Manager",
    bio: "Managing execution, coordination, and team workflows.",
    icon: "🧭",
  },
  {
    name: "Pushan Seth",
    role: "Core Team - Technical Lead",
    bio: "Leading technical planning and implementation quality.",
    icon: "👨‍💻",
  },
  {
    name: "Arunabha Dey",
    role: "Core Team - Technical Lead",
    bio: "Supporting architecture decisions and engineering delivery.",
    icon: "👨‍💻",
  },
  {
    name: "Priyanshu Mitra",
    role: "Core Team - Graphics Lead",
    bio: "Crafting visual identity and design assets for CrelyneX.",
    icon: "🎨",
  },
  {
    name: "Sahitya Pan",
    role: "Core Team - Social Media & Partnerships Lead",
    bio: "Handling brand communication and external collaborations.",
    icon: "📣",
  },
  {
    name: "Debjit Paul",
    role: "Core Team - Social Media  & Partnership Co-Lead",
    bio: "Managing social channels and partnership initiatives.",
    icon: "🤝",
  },
];

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We believe in pushing boundaries and exploring cutting-edge technologies.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Building a supportive ecosystem for developers and innovators to thrive.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "Committed to delivering high-quality projects and education.",
  },
  {
    icon: Zap,
    title: "Empowerment",
    description:
      "Enabling individuals to learn, grow, and achieve their potential.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col relative text-zinc-200">
      {/* Global Background Grid & Glows */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#dc262608_1px,transparent_1px),linear-gradient(to_bottom,#dc262608_1px,transparent_1px)] bg-size-[32px_32px]" />
      <div className="pointer-events-none fixed top-0 right-0 h-125 w-125 rounded-full bg-red-900/10 blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 left-0 h-125 w-125 rounded-full bg-red-950/10 blur-[120px]" />



      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/5 py-16 sm:py-24">
          <div className="container relative mx-auto px-4 sm:px-6">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="max-w-2xl space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-red-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(220,38,38,1)]" />
                  Our Mission
                </div>
                <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                  About{" "}
                  <span className="bg-linear-to-r from-red-400 via-red-600 to-red-800 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(220,38,38,0.4)]">
                    CrelyneX
                  </span>
                </h1>
                <p className="text-lg text-zinc-400 leading-relaxed max-w-lg font-light">
                  CrelyneX is a community-driven platform dedicated to
                  innovation in IoT, web development, and advanced technologies.
                  We turn ideas into reality.
                </p>
              </div>

              {/* Upgraded CSS 3D Glass Panel */}
              <div className="relative mx-auto hidden h-64 w-full max-w-sm perspective-distant md:block">
                {/* Glowing red under-layer */}
                <div className="absolute inset-8 rounded-2xl border border-red-500/40 bg-red-500/10 shadow-[0_0_30px_rgba(220,38,38,0.3)] transform-[rotateX(62deg)_rotateZ(-32deg)] transition-transform duration-700 hover:transform-[rotateX(55deg)_rotateZ(-25deg)]" />
                {/* Smoked glass top layer */}
                <div className="absolute inset-0 flex flex-col justify-end rounded-2xl border border-white/10 bg-black/60 p-6 shadow-2xl backdrop-blur-xl transform-[translate3d(0,0,70px)]">
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500 mb-2">
                    // Architecture Layer
                  </div>
                  <div className="text-2xl font-black text-white">
                    People <span className="text-red-600">+</span> Purpose{" "}
                    <span className="text-red-600">+</span> Product
                  </div>
                  <div className="mt-4 h-1 w-12 bg-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="relative border-b border-white/5 py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
                  The Genesis
                </h2>
                <div className="space-y-4 text-zinc-400 leading-relaxed font-light">
                  <p>
                    CrelyneX was founded with a mission to bridge the gap
                    between education and industry. We recognized a need for a
                    community where developers, IoT enthusiasts, and innovators
                    could learn, collaborate, and create together.
                  </p>
                  <p>
                    What started as a small group of passionate developers has
                    grown into a vibrant community of over 250+ members. We've
                    hosted numerous events, launched successful projects, and
                    impacted thousands of lives through our education
                    initiatives.
                  </p>
                  <p className="border-l-2 border-red-600 pl-4 text-zinc-300 font-medium">
                    Today, CrelyneX stands as a beacon for tech innovation,
                    offering world-class training, consulting services, and a
                    platform for turning ideas into reality.
                  </p>
                </div>
              </div>

              {/* Abstract Story Visual */}
              <div className="hidden md:flex relative justify-center items-center">
                <div className="absolute h-64 w-64 rounded-full border border-red-500/20 bg-red-900/10 blur-xl animate-pulse" />
                <div className="relative h-48 w-48 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_0_40px_rgba(220,38,38,0.15)] flex items-center justify-center rotate-3 hover:rotate-0 transition-all duration-500">
                  <Image
                    src="/logo.png"
                    alt="CrelyneX Icon"
                    width={80}
                    height={80}
                    className="opacity-80 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section - High Impact Numbers */}
        <section className="border-b border-white/5 py-16 bg-black/40">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
              {[
                { value: "1000+", label: "Community Members" },
                { value: "50+", label: "Projects Completed" },
                { value: "30+", label: "Events Hosted" },
                { value: "5000+", label: "Students Trained" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="group rounded-2xl border border-white/5 bg-white/1 p-8 text-center backdrop-blur-sm transition-all hover:bg-white/3 hover:border-red-500/30"
                >
                  <div className="text-4xl font-black bg-linear-to-br from-white to-zinc-500 bg-clip-text text-transparent group-hover:from-red-400 group-hover:to-red-700 transition-all duration-500 drop-shadow-sm">
                    {stat.value}
                  </div>
                  <div className="mt-3 text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="border-b border-white/5 py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Core Directives
              </h2>
              <p className="mt-4 text-zinc-400">
                The foundational protocols that drive our community and our
                products.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card
                    key={index}
                    className="group border-white/5 bg-white/2 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-red-500/30 hover:bg-black/60 hover:shadow-[0_10px_30px_-10px_rgba(220,38,38,0.3)]"
                  >
                    <CardHeader>
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-black/50 transition-colors group-hover:border-red-500/50 group-hover:bg-red-500/10">
                        <Icon className="h-6 w-6 text-zinc-400 group-hover:text-red-500 group-hover:drop-shadow-[0_0_10px_rgba(220,38,38,0.8)] transition-all" />
                      </div>
                      <CardTitle className="text-xl text-white tracking-wide">
                        {value.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-zinc-400 font-light leading-relaxed">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-white sm:text-4xl">
                  The Architects
                </h2>
                <p className="mt-4 text-zinc-400 max-w-xl">
                  Meet the engineers, designers, and visionaries building the
                  future of CrelyneX.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="group relative overflow-hidden border-white/5 bg-white/2 backdrop-blur text-center transition-all duration-300 hover:border-red-500/30 hover:bg-black/40 hover:shadow-[0_0_40px_-15px_rgba(220,38,38,0.4)]"
                >
                  {/* Subtle top red highlight on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-red-600 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <CardHeader className="pt-8">
                    {/* Glassy Avatar Ring */}
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-black/50 text-3xl shadow-inner transition-all duration-300 group-hover:border-red-500/40 group-hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]">
                      <span className="group-hover:scale-110 transition-transform">
                        {member.icon}
                      </span>
                    </div>
                    <CardTitle className="text-lg text-white">
                      {member.name}
                    </CardTitle>
                    <Badge className="mt-3 mx-auto max-w-[180px] bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 px-3 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold whitespace-normal text-center">
                      {member.role}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-zinc-400 text-sm leading-relaxed">
                      {member.bio}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
