import { useState, useEffect } from "react";

const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ".split("");
const middleIndex = Math.floor(alphabet.length / 2);

export default function BinaryLetterPicker() {
  const [visibleAlphabet, setVisibleAlphabet] = useState(alphabet);
  const [pointerIndex, setPointerIndex] = useState(middleIndex);
  const [history, setHistory] = useState([alphabet]);
  const [text, setText] = useState("");

  const handleKeyPress = (event) => {
    if (event.key === "a" && pointerIndex > 0) {
      const newAlphabet = visibleAlphabet.slice(0, pointerIndex);
      setVisibleAlphabet(newAlphabet);
      setPointerIndex(Math.floor(newAlphabet.length / 2));
      setHistory([...history, newAlphabet]);
    } else if (event.key === "b" && pointerIndex < visibleAlphabet.length - 1) {
      const newAlphabet = visibleAlphabet.slice(pointerIndex + 1);
      setVisibleAlphabet(newAlphabet);
      setPointerIndex(Math.floor(newAlphabet.length / 2));
      setHistory([...history, newAlphabet]);
    } else if (event.key === "c") {
      setText(text + visibleAlphabet[pointerIndex]);
      resetSelection();
    }
  };

  const resetSelection = () => {
    setVisibleAlphabet(alphabet);
    setPointerIndex(middleIndex);
    setHistory([alphabet]);
  };

  const undoSelection = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setVisibleAlphabet(newHistory[newHistory.length - 1]);
      setPointerIndex(Math.floor(newHistory[newHistory.length - 1].length / 2));
      setHistory(newHistory);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="container">

      <div className="alphabet-wrapper">
        <div className="alphabet top">
          {visibleAlphabet.slice(0, pointerIndex).map((letter) => (
            <span key={letter} className="letter">{letter}</span>
          ))}
        </div>

        <div className="alphabet center">
          <span className="letter selected">{visibleAlphabet[pointerIndex]}</span>
        </div>

        <div className="alphabet bottom">
          {visibleAlphabet.slice(pointerIndex + 1).map((letter) => (
            <span key={letter} className="letter">{letter}</span>
          ))}
        </div>
      </div>

      <input type="text" value={text} readOnly className="text-input" />

      <div className="buttons">
        <button onClick={() => setText(text.slice(0, -1))}>Стереть букву</button>
        <button onClick={() => setText("")}>Очистить текст</button>
        <button onClick={resetSelection}>Перезапуск</button>
        <button onClick={undoSelection}>Шаг назад</button>
      </div>
    </div>
  );
}
