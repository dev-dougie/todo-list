import React, { useState, useEffect } from 'react';
import Form from './Form';
import Todo from './Todo';

export default function List() {

    //Criando variável de persistência
    let persistedItems = JSON.parse(localStorage.getItem('todos')) || [];
    const [todos, setTodos] = useState(persistedItems);

    let lengthFromMyList = todos.length;
    //Muda o título da página de acordo com a quantidade de itens
    useEffect(() => {
        document.title = `${lengthFromMyList > 1 ?
            `${lengthFromMyList} itens na lista`
            : `${lengthFromMyList} item na lista`}`
    }, [todos]);

    //Persistindo os dados no localStorage sempre que houver mudança no array
    useEffect(() => {
        localStorage.setItem(`todos`, JSON.stringify(todos))
    }, [todos]);

    //CREATE
    const addTodo = todo => {
        //Verifica se o input não está vazio
        if (!todo.text) {
            alert('Por favor, preencha o campo!');
            return;
        }
        //Adiciona um novo todo à lista de todos (mantendo os anteriores através do rest operator)
        const newTodos = [todo, ...todos];

        setTodos(newTodos);
    };

    //UPDATE
    const updateTodo = (todoId, newValue) => {
        if (!newValue.text) {
            alert('Não é possível atualizar. Campo vazio!');
            return;
        }
        //Percorrendo array de todos e verificando se o todoId passado como param é igual ao id do item da lista
        setTodos(previousArr => previousArr.map(item => (item.id === todoId ? newValue : item)));
    };

    //DELETE
    const removeTodo = id => {
        //Criando um novo array com os itens que possuem id's diferentes do id passado como parâmetro
        const newArrWithRemovedItem = todos.filter(todo => todo.id !== id);

        setTodos(newArrWithRemovedItem);
    };

    //Tarefa realizada
    const completeTodo = id => {
        let finishedTodo = todos.map(todo => {
            if (todo.id === id) {
                //Cria um proprieda 'isComplete' e marca como true ou false
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(finishedTodo);
    };

    return (
        <>
            <h1>TODO LIST</h1>
            <Form onSubmit={addTodo} />
            {/*READ*/}
            <Todo
                todos={todos}
                completeTodo={completeTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
            />
        </>
    );
}

