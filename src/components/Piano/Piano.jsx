import React from 'react';
import { useEffect, useState } from "react"
import WaveVisual  from "../WaveVisual"
const Piano = () => {
  const notes = [
    { key: "A", frequency: 110.00	},
    { key: "B", frequency: 123.47	},
    { key: "C", frequency: 130.81	},
    { key: "D", frequency: 146.83	},
    { key: "E", frequency: 164.81	},
    { key: "F", frequency: 174.61 },
    { key: "G", frequency: 196.00	},
  ]
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  let playingOscillators = []
  const [oscillatorType, setOscillatorType] = useState("sine")

  useEffect(() => {
    document.addEventListener("keydown", playNoteForKey)
    return () => {
      document.removeEventListener("keydown", playNoteForKey)
    }
  }, [oscillatorType])

  const playNoteForKey = (e) => {
    let matchingKey = notes.find(note => note.key.toLowerCase() == e.key)
    if (matchingKey) {
      onKeyPress(matchingKey)
    }
  }

  const onKeyPress = ({ key, frequency }) => {
    playingOscillators.forEach(osc => stopOscillator(osc))
    const oscillator = audioCtx.createOscillator();
    oscillator.type = oscillatorType;
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime); // value in hertz
    oscillator.connect(audioCtx.destination);
    oscillator.start(audioCtx.currentTime);
    playingOscillators.push(oscillator)
    setTimeout(() => stopOscillator(oscillator), 1000);
  }

  const stopOscillator = (oscillator) => {
    delete playingOscillators[oscillator]
    oscillator.stop(audioCtx.currentTime);
  }

  const updateOscillatorType = (e) => {
    setOscillatorType(e.target.value)
  }

  return (
    <>
      <div className="w-full bg-gray-700 h-[40vh] grid grid-cols-7">
        { notes.map((note, idx) => <Key key={idx} note={note} onKeyPress={onKeyPress} />) }
      </div>
      <div className="h-96 w-full bg-gray-700 p-4">
        <div className="w-full grid grid-cols-3 gap-4">
          <select className="p-2 bg-gray-500 text-gray-50 rounded-sm focus:outline-0 focus:ring-2 focus:ring-indigo-400" value={oscillatorType} onChange={updateOscillatorType}>
            { ["sine", "square", "sawtooth", "triangle"].map((type, idx) => {
              return <option value={type} key={idx}> { type } </option>
            })}
          </select>
          <WaveVisual type={oscillatorType} />
        </div>
      </div>
    </>
  )
}

const Key = ({ note, onKeyPress }) => {

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col items-center pt-8 border-r-2 border-gray-500 hover:bg-gray-300" onMouseDown={() => onKeyPress(note)}>
      { note.key }
    </div>
  )
}

export default Piano
