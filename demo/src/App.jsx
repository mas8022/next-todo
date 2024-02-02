import Navbar from "./components/Navbar";
import context from "./context";
import { useEffect, useState } from "react";
import Home from "./pages/Home/Home";

function App() {
  const [them, setThem] = useState(() => {
    const localThem = JSON.parse(localStorage.getItem("them"));
    return localThem ? localThem : "sun";
  });
  const [user, setUser] = useState({});
  const [todo, setTodo] = useState("");
  const [todoColor, setTodoColor] = useState("#ff0000");
  const [percentProgres, setPercentProgress] = useState(() => {
    const localPercentProgres = JSON.parse(
      localStorage.getItem("percentProgres")
    );
    return localPercentProgres ? localPercentProgres : 0;
  });
  const [allTodo, setAllTodo] = useState(() => {
    const localAllTodo = JSON.parse(localStorage.getItem("allTodo"));
    return localAllTodo ? localAllTodo : [];
  });

  useEffect(() => {
    localStorage.setItem("percentProgres", JSON.stringify(percentProgres));
  }, [percentProgres]);

  useEffect(() => {
    localStorage.setItem("allTodo", JSON.stringify(allTodo));
  }, [allTodo]);

  useEffect(() => {
    localStorage.setItem("them", JSON.stringify(them));
  }, [them]);

  useEffect(() => {
    calPercentProgressHandler();
  }, [allTodo.length]);

  const calPercentProgressHandler = () => {
    if (allTodo.length) {
      let todoComplete = allTodo.filter((todo) => todo.complete === true);
      let percentProcess = Math.ceil(
        (todoComplete.length / allTodo.length) * 100
      );
      setPercentProgress(percentProcess);
    }
  };

  return (
    <context.Provider
      value={{
        user,
        setUser,
        them,
        setThem,
        todo,
        setTodo,
        todoColor,
        setTodoColor,
        calPercentProgressHandler,
        percentProgres,
        setPercentProgress: setPercentProgress,
        allTodo,
        setAllTodo,
      }}
    >
      <div className="App">
        <Navbar />
        <Home />
      </div>
    </context.Provider>
  );
}

export default App;
