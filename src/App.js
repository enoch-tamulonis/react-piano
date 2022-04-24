import logo from './logo.svg';
import './App.css';
import Piano from "./components/Piano/Piano"

function App() {
  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-500 to-gray-800 via-indigo-400 pt-20">
      <div className="max-w-[1200px] w-full mx-auto">
        <h1 className="text-5xl text-gray-50 mb-8"> Its Piano Time </h1>
        <Piano />
      </div>
    </div>
  );
}

export default App;
