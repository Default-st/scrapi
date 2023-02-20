import "./App.css";
import Container from "./container/Container";
import { socket, SocketContext } from "./context/socket";
function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Container />
    </SocketContext.Provider>
  );
}

export default App;
