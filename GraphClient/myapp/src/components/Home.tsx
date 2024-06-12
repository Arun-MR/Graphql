'use client';
import React, { useEffect } from 'react';
import axios from 'axios';
import { gql, useQuery } from '@apollo/client';



const query = gql`
	query getTodos {
		getTodos {
			id
			title
			completed
		}
	}
`;



interface CookieObject {
    [key: string]: any;
}



interface HomeProps {
    cookie: CookieObject; // Use the same CookieObject type
}

const Home: React.FC<HomeProps> = (props) => {

    const apiCheck=async ()=>{

        const response = await fetch('http://localhost:8000/graphql', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${props.cookie.value}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
          });
          
          const responseData = await response.json();
          console.log(responseData,"response data gql")
        }
  
    useEffect(()=>{
        apiCheck()
        const api= async()=>{

         const call=   await axios.get('http://localhost:8000/login',{
            headers: {
                // Add your headers here
                "cookies": `${props.cookie.value}`,
                'Content-Type': 'application/json',
              },
         })
        
        //  console.log(call,"call api get ")
         console.log(props.cookie,"props");
         
        }

        api()
    },[])
	const { data, error, loading } = useQuery(query);
console.log({error})
	if (loading) return <div>Loading...</div>;
	if (error) return <p>Error :( </p>;

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>id</th>
						<th>title</th>
						<th>completed</th>
					</tr>
				</thead>

				<tbody>
					{data.getTodos.map((todo: any) => (
						<tr key={todo.id}>
							<td>{todo.id}</td>
							<td>{todo.title}</td>
							<td>
								{todo.completed ? 'true' : 'false'}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Home;