import CompanyCalendar from "./CompanyCalendar";
import "./CalendarModal.css";
import { Container } from "../../../Container/Container";



export function CalendarModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return (
      <Container>
        {isOpen && (
        <div className="calendar-modal-backdrop" role="dialog" aria-modal="true" aria-label="Company calendar">
          <div className="calendar-modal">
            <div className="calendar-modal-header">
              <h2>Company calendar</h2>
              <button
                type="button"
                className="calendar-modal-close"
                aria-label="Close calendar modal"
                onClick={onClose}
              >
                ×
              </button>
            </div>
            <div className="calendar-modal-body">
              <CompanyCalendar />
            </div>
          </div>
        </div>
      )}
      </Container>
      
    );
}