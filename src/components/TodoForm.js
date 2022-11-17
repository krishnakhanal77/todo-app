import React, { useEffect, useRef, useState } from "react";

const TodoForm = ({ onSubmit, edit, error }) => {
  const [todoTitle, setTodoTitle] = useState("");
  const [disable, setDisable] = useState(true);

  const handleSubmi = (e) => {
    e.preventDefault();
    // console.log(input);
    onSubmit({
      id: Math.floor(Math.random() * 1000),
      text: todoTitle,
    });

    setTodoTitle("");
  };
  useEffect(() => {
    if (edit) {
      setTodoTitle(edit.value);
    }
  }, [edit]);
  const handleChange = (e) => {
    setTodoTitle(e.target.value);
    setDisable(false);
    //console.log(e);
  };
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <form className="" onSubmit={handleSubmi}>
      <div className="m-4 flex w-80">
        <input
          className="shadow mr-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-black focus:shadow-outline"
          value={todoTitle}
          onChange={handleChange}
          type="text"
          placeholder="Add Activities"
          // required
          ref={inputRef}
        />

        <button
          className={`${
            disable ? "bg-gray-200" : "bg-blue-500 hover:bg-blue-700"
          }   text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
          type="submit"
          disabled={disable}
        >
          {edit ? "Update" : "Add"}
        </button>
      </div>
      <span className="text-red-400 italic text-sm">{error}</span>
    </form>
  );
};

export default TodoForm;
