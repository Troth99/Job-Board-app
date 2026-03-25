


export function ModalReply({isOpen, onClose}) {
    if(!isOpen) return null;
    
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose} aria-label="Затвори модала">×</button>
                <h1>test</h1>
            </div>
        </div>
    );
}

