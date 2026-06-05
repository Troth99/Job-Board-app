import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventInput } from "@fullcalendar/core";
import "@fullcalendar/core/index.css";
import "@fullcalendar/daygrid/index.css";
import "./CompanyCalendar.css";


export function CompanyCalendar() {

return (
    <div className="company-calendar-container">
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={[] as EventInput[]} // You can replace this with your actual events data
        />
    </div>
    
)



}