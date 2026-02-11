import { io } from "socket.io-client";
import { useEffect } from "react";


 function Notifications() {

useEffect(() => {
  const socket = io("http://localhost:5000");
  socket.on("connect", () => {
    console.log("Socket connected!", socket.id);
  });
  return () => socket.disconnect();
}, []);

    return (
        <h1>Notification</h1>
    )
}


export default Notifications
