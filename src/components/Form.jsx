import React, { useState } from 'react';

export default function Form(props) {

  //Estado que conterá o valor do input
  const [FormInput, setFormInput] = useState(props.edit ? props.edit.value : '');

  //Mudando valor do estado
  const handleChange = e => {
    setFormInput(e.target.value);
  };

  const handleSubmit = e => {
    //Prevenindo o recarregamento da página
    e.preventDefault();
    //Cria um object contendo id (aleatório) e text do input
    props.onSubmit({
      id: Math.floor(Math.random() * 100),
      text: FormInput
    });
    //Limpando o input
    setFormInput('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Atualizar item'
            value={FormInput}
            onChange={handleChange}
            name='text-todo'
            className='todo-input edit'
          />
          <button 
          onClick={handleSubmit} 
          className='todo-button edit'>✔️</button>
        </>
      ) : (
          <>
            <input
              placeholder='Adicione um item'
              value={FormInput}
              onChange={handleChange}
              name='text-todo'
              className='todo-input'
            />
            <button 
            onClick={handleSubmit} 
            className='todo-button'>Adicionar</button>
          </>
        )}
    </form>
  );
}
