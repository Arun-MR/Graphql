// import Home from '@/components/Home';
// import Cookie from '@/components/Cookie';
// import React from 'react';

// const HomePage = () => {
// 	return <Cookie />;
// };

// export default HomePage;



'use client'
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { ADD_TODO, FETCH_TODOS, TODO_ADDED } from '../graphQl/services';
import { useState } from 'react';


function App() {
  const {data ,loading,error} = useQuery(FETCH_TODOS);
  const [addTodo] = useMutation(ADD_TODO);
  // const {data:Subscriptiondata} = useSubscription(TODO_ADDED);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');

  const handleAddTodo = async()=>{
    await addTodo({
      variables:{
        title,completed:false
      }
    })
  }

  if(error) return

  if(loading) return <h1>Loading...</h1>

  const todos =data.getTodos;

  return (
    <div>
      <h1>Todoss</h1>
      {/* <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add Todo</button> */}
      <ul>
        {todos?.map((todo:any) => (
          <li key={todo.id}>
            {todo.title} - {todo.completed ? 'Completed' : 'Not completed'} (User: {todo.user.name})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App