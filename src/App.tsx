import "./App.css";
import Canvas from "./components/canvas/Canvas";
import Elementbar from "./components/elementbar/Elementbar";

const App = () => {

  return (
    <div className="container">
      <Elementbar />
      <Canvas />
    </div>
  )
}

export default App;