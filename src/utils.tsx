import io from "socket.io-client";

export const BACKEND = "https://xanmankey.vulcan.moe";
export const socket = io(BACKEND);
