import { useEffect, useState } from "react";
import "./App.css";
import CancelIcon from "@material-ui/icons/Cancel";
import { IconButton } from "@material-ui/core";

function App() {
  const [todo, setTodo] = useState("");
  const [todos] = useState([]);
  const [status, setStatus] = useState(false);
  const [statusCancel, setStatusCancel] = useState(false);
  const [statusAdd, setStatusAdd] = useState(false);

  useEffect(() => {
    if (status) {
      setStatus(false);
    }
  }, [status]);

  useEffect(() => {
    if (statusAdd) {
      const todosCollection = document.getElementsByClassName(
        "app__container-bottom-todos"
      );

      todosCollection[todos.length - 1].classList.add("anim2");
      setStatusAdd(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusAdd]);

  const addTodo = (e) => {
    e.preventDefault();

    if (todo) {
      if (todos.findIndex((e) => e.name === todo) === -1) {
        todos.push({ id: Date.now(), name: todo });
        setStatusAdd(true);

        setTodo("");
      }
    }
  };

  const removeTodo = (id) => {
    if (!status) {
      todos.filter((item, index) => {
        const todosCollection = document.getElementsByClassName(
          "app__container-bottom-todos"
        );

        if (item.id === id) {
          todosCollection[index].classList.remove("anim2");
          todosCollection[index].classList.add("anim1");
          setStatusCancel(true);

          setTimeout(() => {
            todos.splice(index, 1);
            setStatus(true);
            setStatusCancel(false);
          }, 2000);
        }

        return null;
      });
    }
  };

  return (
    <div className="app">
      <div className="app__container">
        <form onSubmit={addTodo} className="app__container-top">
          <input
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            type="text"
            placeholder="Wpisz zadanie..."
          />
          <button disabled={!todo} type="submit">
            dodaj
          </button>
        </form>

        <div className="app__container-bottom">
          {todos.map((todo, index) => (
            <div key={todo.id} className="app__container-bottom-todos">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "default",
                  marginTop: "5px",
                }}
              >
                <h4>{index + 1})</h4>
                <h5 style={{ marginLeft: "6px", width: "200px" }}>
                  {todo.name}
                </h5>
              </div>

              <IconButton
                disabled={statusCancel}
                onClick={() => removeTodo(todo.id)}
                size="small"
              >
                <CancelIcon
                  style={{ color: `${!statusCancel ? "orange" : "gray"}` }}
                />
              </IconButton>
            </div>
          ))}

          {todos.length > 0 && (
            <div className="app__container-bottom--divider" />
          )}
        </div>
      </div>

      <div className="divBox" />
    </div>
  );
}

export default App;
