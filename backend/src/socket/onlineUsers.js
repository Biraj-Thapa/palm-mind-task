const onlineMap = new Map(); 

export const addConnection = (socketId, userId) => {
  onlineMap.set(socketId, userId.toString());
};

export const removeConnection = (socketId) => {
  onlineMap.delete(socketId);
};

export const getOnlineCount = () => {
  const uniqueUsers = new Set(Array.from(onlineMap.values()));
  return uniqueUsers.size;
};

export const getAllConnections = () => {
  return Array.from(onlineMap.entries());
};
