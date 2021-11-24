import './App.css';
import React, {useState, useEffect} from 'react';
import Clock from 'react-live-clock';


function useTodoList(){
  const [todoList, setTodoList] = useState([
    {content:"react",done:false},
    {content:"react로 todolist만들기",done:true},
    {content:"커피마시기",done:false},
  ])

  function addTodo(content){
    if (! todoList.every((todo => todo.content !== content))){ // 중복인 친구가 있으면
      alert("똑같은 할 일을 추가할 수 없습니다.")
      return;
    }

    setTodoList(old => [...old,{content, done:false}])
  }

  function checkTodo(targetContent){
    setTodoList(oldTodos=> oldTodos.map((todo) => todo.content === targetContent ? { ...todo, done: !todo.done } : todo))
  }

  function deleteTodo(targetContent){
    setTodoList(oldTodos =>oldTodos.filter((todo) =>todo.content !== targetContent))
  }

  return {
    todoList,
    addTodo,
    checkTodo,
    deleteTodo
  }  
}

const App = () =>{
  const {
    todoList,
    addTodo,
    checkTodo,
    deleteTodo
  } = useTodoList();
  
  const [todoInput, setTodoInput] = useState("");   

  function handleChange(e){
    setTodoInput(e.target.value);
  }
  
  function handleSubmit(e){
    e.preventDefault();
    addTodo(todoInput);
    setTodoInput(old => '')
  }
  
  const [selected, setSelected] = useState('all');

  function handleSelect(e){
    setSelected(e.target.value);
  }

  const [filteredList, setFilteredList] = useState(todoList);

  useEffect(()=>{
    if(selected === 'all'){
      setFilteredList(todoList);
    } else if(selected ==='done'){
      setFilteredList(todoList.filter(todo =>todo.done ===true));
    } else if(selected ==='active'){
      setFilteredList(todoList.filter(todo =>todo.done ===false));
    }
  }, [selected, todoList])

  return (
    <div className="todo">
      <div className="top">
        <Clock format ={'YYYY - MM - DD '} ticking={true} timszone={'US/Pacific'} className="time"/>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <label>
          <h2>to do list</h2>
          <input text ="text" name ="newTodo" onChange={handleChange} className="input" value ={todoInput}></input>
        </label>
        <button type ="submit">➕</button>
        
      </form>
      <div className="list">
        {filteredList.map((todo, i) =>(
          <li key={todo.content}>
            <input type="checkbox" checked={todo.done} onClick={(e)=> checkTodo(todo.content)}/>
            {todo.content}
            <button onClick={(e)=>deleteTodo(todo.content)}>x</button>
          </li>
        ))}
      </div>

      <select className="w150" onChange={handleSelect} >
        <option value="all" >전체</option>
        <option value="active">진행 중</option>
        <option value="done">완료</option>
      </select>
    </div>
    
  );
};

export default App;