/**
 * Jobsite ticker — replaces the generic services marquee with a
 * dashboard-style status feed: live/scheduled/delivered obras with
 * progress + day count. Reinforces "obra-em-curso" identity.
 *
 * Pure CSS animation, no JS. Looped via duplicated track.
 */

type JobStatus = "live" | "scheduled" | "delivered";

const JOBS: Array<{
  status: JobStatus;
  id: string;
  location: string;
  meta: string;
}> = [
  { status: "live",      id: "N.º 42", location: "Cascais",   meta: "Dia 18/65 · 72%" },
  { status: "scheduled", id: "N.º 43", location: "Lisboa",    meta: "Início · 03 Jun" },
  { status: "delivered", id: "N.º 41", location: "Sintra",    meta: "Entregue · 14 Abr" },
  { status: "live",      id: "N.º 40", location: "Sintra",    meta: "Dia 22/30 · 85%" },
  { status: "scheduled", id: "N.º 44", location: "Oeiras",    meta: "Início · 18 Jun" },
  { status: "delivered", id: "N.º 39", location: "Lisboa",    meta: "Entregue · 02 Abr" },
  { status: "live",      id: "N.º 38", location: "Setúbal",   meta: "Dia 41/50 · 92%" },
  { status: "delivered", id: "N.º 37", location: "Cascais",   meta: "Entregue · 18 Mar" },
];

const STATUS_LABEL: Record<JobStatus, string> = {
  live: "Em curso",
  scheduled: "Agendada",
  delivered: "Entregue",
};

const STATUS_COLOR: Record<JobStatus, string> = {
  live: "text-bronze",
  scheduled: "text-offwhite/65",
  delivered: "text-offwhite/45",
};

const STATUS_DOT: Record<JobStatus, string> = {
  live: "bg-bronze",
  scheduled: "bg-offwhite/45",
  delivered: "bg-offwhite/25",
};

export function JobsiteTicker() {
  const looped = [...JOBS, ...JOBS];
  return (
    <div
      aria-hidden="true"
      className="relative bg-graphite text-offwhite py-4 overflow-hidden border-y border-offwhite/[0.06]"
    >
      {/* Side gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-[2] pointer-events-none bg-gradient-to-r from-graphite to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-[2] pointer-events-none bg-gradient-to-l from-graphite to-transparent" />

      {/* Section label */}
      <div className="absolute left-5 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 z-[3] hidden sm:flex items-center gap-2.5 px-3 py-1.5 bg-graphite border border-offwhite/15">
        <span className="block w-1.5 h-1.5 bg-bronze rounded-full animate-pulse" />
        <span className="font-mono text-[0.6rem] tracking-[0.22em] uppercase text-offwhite/85">
          Estaleiro · Live
        </span>
      </div>

      <div className="inline-flex items-center gap-12 whitespace-nowrap font-mono text-[0.72rem] tracking-[0.18em] uppercase marquee-scroll">
        {looped.map((job, i) => (
          <span key={i} className="inline-flex items-center gap-3">
            <span className={`inline-flex items-center gap-2 ${STATUS_COLOR[job.status]}`}>
              <span className={`block w-1.5 h-1.5 ${STATUS_DOT[job.status]} ${job.status === "live" ? "animate-pulse" : ""}`} />
              {STATUS_LABEL[job.status]}
            </span>
            <span className="text-offwhite/30">·</span>
            <span className="text-offwhite font-medium">{job.id}</span>
            <span className="text-offwhite/30">·</span>
            <span className="text-offwhite/75">{job.location}</span>
            <span className="text-offwhite/30">·</span>
            <span className="text-offwhite/55">{job.meta}</span>
            <span className="ml-4 text-bronze">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
