import io from "socket.io-client";

export const BACKEND = "https://xanmankey.vulcan.moe";
export const socket = io("wss://xanmankey.vulcan.moe", {
  transports: ["websocket"], // Ensure WebSocket transport is used
  reconnection: true, // Enable reconnection
  reconnectionAttempts: Infinity, // Unlimited reconnection attempts
  reconnectionDelay: 1000, // Reconnect after 1 second
  reconnectionDelayMax: 5000, // Maximum delay of 5 seconds
  timeout: 20000, // Connection timeout of 20 seconds
});
