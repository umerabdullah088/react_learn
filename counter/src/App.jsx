
// import './App.css'
import { useState } from "react";
function App() {
  let [counter, setCounter] = useState(10);
  function increaseVal() {
    counter = counter < 20 ? counter + 1 : 20;
    setCounter(counter)
    console.log(counter)
  }

  function decreaseVal() {
    counter = counter == 0 ? 0 : counter - 1
    setCounter(counter);
    console.log(counter);
  }
  return (
    <div>
      <p>Count {counter}</p>
      <br />
      <span>

        <button onClick={increaseVal}>UP</button>

        <br />

        <button onClick={decreaseVal}>Down</button>
      </span>
    </div>
  )
}

export default App
