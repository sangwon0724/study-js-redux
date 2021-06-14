import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

//action
const addToDo = text => {
  return {
    type: ADD_TODO,
    text
  };
};

//action
const deleteToDo = id => {
  return {
    type: DELETE_TODO,
    id
  };
};

//reducer
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      const newToDoObj = { text: action.text, id: Date.now() };
      return [newToDoObj, ...state];
    case DELETE_TODO:
      const cleaned = state.filter(toDo => toDo.id !== action.id);
      return cleaned; //redux는 값을 삭제하는 것이 아닌 수정하는 작업을 한다.
    default:
      return state;
  }
};

//createStore
const store = createStore(reducer);

//subscribe
store.subscribe(() => console.log(store.getState()));

//dispatch
const dispatchAddToDo = text => {
  store.dispatch(addToDo(text)); //Todo list 추가
};

//dispatch
const dispatchDeleteToDo = e => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id)); //Todo list 삭제
};

//event function
const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

//subscribe
store.subscribe(paintToDos);

//event function
const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispatchAddToDo(toDo); //dispatch 함수 실행
};

form.addEventListener("submit", onSubmit);














/*import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();*/
