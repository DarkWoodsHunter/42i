import {Route, Routes} from "react-router-dom"
import MainPage from './components/MainPage';
import MainEditor from "./components/Editor/mainEditor";
import MainCreator from "./components/Editor/mainCreator";

function App() {
  return (
    <div className=" bg-blue-400">
      {/* Defining what components will be shown in specific paths */ }
      <Routes>
        <Route exact path="/" element={<MainPage />}/>
        <Route path="/Edit" element={<MainEditor/>}/>
        <Route path="/create" element={<MainCreator/>}/>
      </Routes>
    </div>
  );
}

export default App;
