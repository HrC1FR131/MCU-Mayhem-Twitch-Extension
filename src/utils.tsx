import io from "socket.io-client";

import { createContext } from "react";

export let username: string;
export const BACKEND = "https://xanmankey.vulcan.moe";
export const socket = io("wss://xanmankey.vulcan.moe", {
  transports: ["websocket"], // Ensure WebSocket transport is used
  reconnection: true, // Enable reconnection
  reconnectionAttempts: Infinity, // Unlimited reconnection attempts
  reconnectionDelay: 1000, // Reconnect after 1 second
  reconnectionDelayMax: 5000, // Maximum delay of 5 seconds
  timeout: 20000, // Connection timeout of 20 seconds
  // autoConnect: false, // disable autoConnect on import
});

export const SocketContext = createContext(socket);

import { ReactNode } from "react";

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
