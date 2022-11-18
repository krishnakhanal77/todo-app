import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { TiEdit } from "react-icons/ti";
import { RiCloseCircleLine } from "react-icons/ri";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });
  const [error, setError] = useState("");
  const addTodo = (todo) => {
    if (!todo.text) {
      return setError("Todo title is required!!");
    }
    const newTodos = [todo, ...todos];
    setError("");
    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removedArr = todos.filter((todo) => todo.id !== id);
    setTodos(removedArr);
  };

  const completeTodo = (i) => {
    const newTodos = todos.map((todo) => ({
      ...todo,
      isCompleted: todo.id === i ? !todo.isCompleted : todo.isCompleted,
    }));
    setTodos(newTodos);
  };

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: value,
    });
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center justify-center h-screen">
        <div className="bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-center font-serif font-semibold text-2xl">
            List your Tasks
          </h2>
          {edit.id ? (
            <TodoForm edit={edit} onSubmit={submitUpdate} />
          ) : (
            <TodoForm error={error} onSubmit={addTodo} />
          )}

          {todos?.map((item) => {
            return (
              <div
                key={item.id}
                className="flex justify-between border-b-2 py-2  "
              >
                <div className="flex">
                  <input
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded mt-1"
                    onClick={() => completeTodo(item.id)}
                    type="checkbox"
                  />
                  <p
                    className={`ml-3 cursor-pointer ${
                      item.isCompleted === true ? "line-through" : ""
                    }`}
                  >
                    {item.text}
                  </p>
                </div>

                <div className="flex cursor-pointer">
                  <RiCloseCircleLine
                    onClick={() => removeTodo(item.id)}
                    className="text-red-500 font-semibold text-2xl mr-4"
                  />

                  <TiEdit
                    onClick={() => setEdit({ id: item.id, value: item.text })}
                    className="text-green-500 font-semibold text-2xl mr-2"
                  />
                </div>
              </div>
            );
          })}
          {todos.length < 1 && (
            <p className="text-center text-gray-500">
              No tasks found, Please add!!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
