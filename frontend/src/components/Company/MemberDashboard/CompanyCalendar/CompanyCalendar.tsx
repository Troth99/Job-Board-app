import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventInput, DatesSetArg } from "@fullcalendar/core";

import "./CompanyCalendar.css";
import { useState } from "react";
import { useParams } from "react-router";
import useJobs from "../../../../hooks/jobs/useJobsAPI";

type CompanyCalendarProps = {
  compact?: boolean;
};

//to add click handler for the event to show new modal
//to add - click on event to see details in a modal
//to add - ability to add events (interviews, deadlines) from the calendar view and not only from the job details page
//to add plugin interaction to be able to click on event and see details in a modal, also to add events from the
export default function CompanyCalendar({
  compact = false,
}: CompanyCalendarProps) {
  const [events, setEvents] = useState<EventInput[]>([]);
  const { companyId } = useParams();
  const { getCalendarEventsForJobs } = useJobs();

  const handleDateRangeChange = async (arg: DatesSetArg) => {
    if (!companyId) {
      return;
    }
    const data = await getCalendarEventsForJobs(
      companyId,
      new Date(arg.startStr).toISOString(),
      new Date(arg.endStr).toISOString(),
    );
    setEvents(data);
  };

  return (
    <div className={`company-calendar-container${compact ? " compact" : ""}`}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        datesSet={handleDateRangeChange}
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
  );
}
