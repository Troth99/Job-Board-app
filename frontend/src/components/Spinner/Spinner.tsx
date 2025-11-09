
import "./spinner.css"

interface SpinnerProps {
    overlay: boolean
}


export default function Spinner({overlay= false}: SpinnerProps) {
    return (
          <div className={overlay ? "spinner-overlay" : ""}>
      <div className="spinner"></div>
    </div>
    )
}