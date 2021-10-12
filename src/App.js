import './App.css';
import React, {useState} from 'react';
import Clock from 'react-live-clock';


const App = () =>{
  const [todos, setTodo] = useState([
    {list:"react",done:false},
    {list:"react로 todolist만들기",done:true},
    {list:"커피마시기",done:false},
  ])
  const [todoinput, setTodoInput] = useState("");
     

  function listChange(e){
  setTodoInput(e.target.value);
   
}

function listSubmit(e){
 e.preventDefault();
 setTodo(old => [...old,{list:todoinput, done:false}])
 setTodoInput(old => '')
}

function check(index){
  setTodo(oldTodos=>{

   const newTodos = [...oldTodos];
   newTodos[index] = {...newTodos[index], done: !newTodos[index].done};

   return newTodos;
   

})

}
return(

  <div className="todo">
    <div className="top">
      <Clock format ={'YYYY - MM - DD'}ticking={true} timszone={'US/Pacific'} className="time"/>
    </div>
    <form onSubmit ={listSubmit} className="form">
      <label>
        <h2>to do list</h2>
        <input text ="text" name ="newTodo" onChange={listChange} className="input" value ={todoinput}></input>
      </label>
      <button type ="submit">➕</button>
      
    </form>
    <div className="list">
      {todos.map((todos, i) =><li ><input type="checkbox" checked={todos.done} onClick={(e)=> check(i)}/>{todos.list}</li>)}
    </div>
    
  </div>
  
);
};

export default App;