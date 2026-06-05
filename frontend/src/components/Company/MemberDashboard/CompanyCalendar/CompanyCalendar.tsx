import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventInput } from "@fullcalendar/core";


import "./CompanyCalendar.css";

// Sample events data - replace with your actual events
const events: EventInput[] = [
  { id: "1", title: "Interview", date: "2026-06-10" },
  { id: "2", title: "Deadline", date: "2026-06-15" },
];

type CompanyCalendarProps = {
    compact?: boolean;
};

export default function CompanyCalendar({ compact = false }: CompanyCalendarProps) {

return (
        <div className={`company-calendar-container${compact ? " compact" : ""}`}>
 <FullCalendar
  plugins={[dayGridPlugin]}
  initialView="dayGridMonth"
  events={events}
  headerToolbar={{
    left: "title",
    center: "",
    right: compact ? "prev,next" : "today prev,next",
  }}
  height={compact ? "auto" : 480}
  fixedWeekCount={false}
  showNonCurrentDates={true}
  dayMaxEventRows={compact ? 1 : 2}
/>
    </div>

)



}