import React, { useState } from 'react';
import Form from './Form';
import { FaRegTrashAlt } from 'react-icons/fa';
import { TiPencil } from 'react-icons/ti';

/*
  Capturando props que realizam as tarefas de: 
  1) Completar task
  2) Remover task da lista
  3) Atualizar valor da task
*/
export default function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  //Criando estados que armazenam os valores editados
  const [edit, setEdit] = useState({ id: null, value: '' });

  //Submetendo novo valor do todo
  const submitUpdate = newValue => {
    //Atualizando
    updateTodo(edit.id, newValue);

    setEdit({
      id: null,
      value: ''
    });
  };

  //Verificando se existe id para edição
  //Se houver, renderiza o componente 'Form'
  if (edit.id) {
    return <Form edit={edit} onSubmit={submitUpdate} />
  }

  //Percorrendo array de todos que vem como prop deste componente
  //Criando elementos visuais (div) para mostrar valores na view
  return todos.map((todo, index) => (
    <div
      //Mudando classe de acordo com o status 'isComplete'
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>
      <div className='icons'>
        <FaRegTrashAlt
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <TiPencil
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

