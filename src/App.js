// import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import DynamicComponent from "./DynamicComponent";

function App() {
  const [index, setIndex] = useState(0);
  const list = [
    { name: "gameStyle", js: "ac485c9b-5a7d-c4ee-9a72-9b826ae53759" },
    { name: "chinaStyle", js: "41fed384-e0c3-be9a-23d6-95ca493b0c00" },
    { name: "RankingGameStyle", js: "1f557672-a90d-d318-d843-274b6466a3f5" },
  ];

  return (
    <div className="App">
      <div className="left">
        {list.map((item, index) => (
          <button onClick={()=>{
            setIndex(index)
          }}>{item.name}</button>
        ))}
      </div>
      <div className="right">
        {/* <DynamicComponent name="Button">Click Me</DynamicComponent> */}
        <DynamicComponent name={list[index].js} />
      </div>
      {/* <DynamicComponent name="Text">Click Me</DynamicComponent> */}
    </div>
  );
}

export default App;
