import "./App.css";
import Canvas from "./components/canvas/Canvas";
import ControlPanel from "./components/controlpanel/ControlPanel";
import Elementbar from "./components/elementbar/Elementbar";

const App = () => {

  return (
    <div className="container">
      <Elementbar />
      <Canvas />
      <ControlPanel />
    </div>
  )
}

export default App;