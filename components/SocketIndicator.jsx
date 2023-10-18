import { useSocket } from "@context/SocketContext";

const SocketIndicator = () => {
  const { isConnected } = useSocket();

  return (
    <div
      title="online-status"
      className={`w-2 aspect-square rounded-full ${
        isConnected ? "bg-green-500" : "bg-yellow-500"
      } absolute top-2 left-2 z-20`}
    ></div>
  );
};

export default SocketIndicator;
