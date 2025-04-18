import React, { useState } from "react";
import "./index.css";

const codeLines = {
  1: 'for(int i = 0; i < items.length; i++) {',
  2: '  System.out.println("items[i]: " + items[i] + ", index: " + i);',
  3: '}'
};

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [items, setItems] = useState([]);
  const [activeLine, setActiveLine] = useState(null);
  const [animatedIndex, setAnimatedIndex] = useState(-1);
  const [updatedCode, setUpdatedCode] = useState(codeLines);  // Store updated code with index

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    const newItems = userInput.split(" ").filter(item => item !== "");
    setItems(newItems);
    setUserInput("");
    setActiveLine(null);
    setAnimatedIndex(-1);
    setUpdatedCode(codeLines); // Reset the code when submitting new input
  };

  const simulateLoop = async () => {
    for (let i = 0; i < items.length; i++) {
      // Highlight the first line and show index in code
      setActiveLine(1);
      setUpdatedCode(prev => ({
        ...prev,
        1: `for(int i = ${i}; i < ${items.length}; i++) {`  // Update the code to reflect the current index
      }));
      await new Promise(res => setTimeout(res, 800));

      // Highlight the second line and show the index dynamically in the console print code
      setActiveLine(2);
      setUpdatedCode(prev => ({
        ...prev,
        2: `  System.out.println("items[i]: " + items[i] + ", index: " + ${i});`
      }));
      setAnimatedIndex(i);
      await new Promise(res => setTimeout(res, 800));
    }

    // After the loop is complete, reset everything
    setActiveLine(null);
    setUpdatedCode(codeLines); // Reset code after loop
    setItems([]); // Clear the items array
    setUserInput(""); // Clear user input
    setAnimatedIndex(-1); // Reset the animated index
  };

  return (
    <div className="main-container">
      <div className="input-section">
        <input
          type="text"
          placeholder="Type words separated by space"
          value={userInput}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={simulateLoop}>Animate</button>
      </div>

      <div className="code-section">
        {Object.entries(updatedCode).map(([lineNumber, code]) => (
          <pre
            key={lineNumber}
            className={`code-line ${activeLine == lineNumber ? "highlight" : ""}`}
          >
            <span className="line-number">{lineNumber}</span> {code}
          </pre>
        ))}
      </div>

      <div className="boxes">
        {items.map((item, index) => (
          <div
            key={item + index}
            className={`box ${animatedIndex === index ? "box-animate" : ""}`}
          >
            {item}:{index}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
