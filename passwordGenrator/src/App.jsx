import ListSites from "./ListSites";
import { useState, useEffect, useRef } from "react"
function App() {

  const [password, setPassword] = useState("");
  const [web, setWeb] = useState("");
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [chars, setChars] = useState(false);
  const inputRef = useRef(null);
  const [sites, setSites] = useState([
    {
      website: "amazon",
      password: password
    }
  ]);
  const passwordGenrator = () => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numbers) str += "0123456789";
    if (chars) str += "!~#$%^&*()_+{}[]><.,?"

    for (let i = 0; i < length; i++) {
      let index = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(index);

    }

    setPassword(pass);

  }


  useEffect(() => {
    passwordGenrator();

  }, [length, numbers, chars])



  const handleCopy = () => {

    window.navigator.clipboard.writeText(password)
    inputRef.current?.select();


  }
  const handleAdd = () => {
    setSites([...sites,
    {
      website: web,
      password: password
    }]);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-8 rounded-xl shadow-lg">

        <input
          type="text"
          value={web}
          onChange={(e) => setWeb(e.target.value)}
          ref={inputRef}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg
               bg-gray-50 text-gray-900
               focus:outline-none focus:ring-2 focus:ring-blue-500 mr-6"

        />
        <input
          type="text"
          value={password}
          readOnly
          ref={inputRef}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-l-lg
               bg-gray-50 text-gray-900
               focus:outline-none focus:ring-2 focus:ring-blue-500"

        />
        <button
          onClick={handleAdd}
          className="mt-4 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Save
        </button>
        <button

          className="px-5 py-2.5 bg-blue-600 text-white font-medium
               rounded-r-lg hover:bg-blue-700
               transition-colors"
          onClick={handleCopy} >
          Copy
        </button>
        <div className="flex items-center gap-4">
          <label className="font-medium">Length:{length}</label>

          <input
            type="range"
            min={5}
            max={20}
            className="w-48 cursor-pointer accent-blue-600"
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-6 mt-4">

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              onChange={() => setNumbers((prev) => !prev)}
              type="checkbox"
              className="h-4 w-4 accent-blue-600"
            />
            <span>Numbers</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              onChange={() => setChars((prev) => !prev)}
              type="checkbox"
              className="h-4 w-4 accent-blue-600"
            />
            <span>Characters</span>
          </label>

        </div>

      </div>
      <ListSites sites={sites} />
    </div>


  )
}

export default App