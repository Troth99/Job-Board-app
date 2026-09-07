import { Trans } from "@lingui/react/macro";
import "./ServerWakeBanner.css";

export default function ServerWakeBanner() {
  return (
    <div className="server-wake-banner" role="status">
      <Trans>Waking up the server, this can take up to a minute. Some actions may be slow until then.</Trans>
    </div>
  );
}
