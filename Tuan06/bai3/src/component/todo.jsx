import React, { useState, useCallback, useMemo } from "react";

// Component con hiển thị một Todo item
const TodoItem = React.memo(({ todo, onDelete }) => {
  console.log("Rendering TodoItem:", todo);  // Sẽ chỉ log khi props thay đổi

  return (
    <li>
      {todo.text}
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
});

// Component hiển thị tổng số Todo (dùng useMemo để tối ưu tính toán)
const TodoCount = ({ todos }) => {
  const count = useMemo(() => {
    console.log("Recalculating todo count...");
    return todos.length;
  }, [todos]);

  return <h2>Total Todos: {count}</h2>;
};

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");

  // Hàm thêm Todo (dùng useCallback để tránh tạo lại hàm trong mỗi render)
  const addTodo = useCallback(() => {
    if (newTodoText.trim()) {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now(), text: newTodoText },
      ]);
      setNewTodoText(""); // Reset input
    }
  }, [newTodoText]);

  // Hàm xóa Todo
  const deleteTodo = useCallback(
    (id) => {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    },
    [setTodos]
  );

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        placeholder="Enter a new todo"
      />
      <button onClick={addTodo}>Add Todo</button>

      <TodoCount todos={todos} /> {/* Memoize todo count */}

      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
        ))}
      </ul>
    </div>
  );
}
