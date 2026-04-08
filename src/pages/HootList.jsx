import { useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router'
// Steps:
// 1. Create a state to hold the pets values
// 2. Create a function that makes an axios GET call to API and set the state to the response
// 3. Call the function inside the useEffect()
// 4. map through all the values (hoots)

function HootList() {
    const [hoots, setHoots] = useState([]) // 1. Create a state to hold the pets values

    async function getAllHoots(){// 2. Create a function that makes an axios GET call to API and set the state to the response
        try{
            const allHoots = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/hoots`)
            setHoots(allHoots.data)

        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{ // 3. Call the function inside the useEffect()
        getAllHoots()
    },[])
    
    
  return (
    <div>
        <h1>All Hoots</h1>

        {hoots.map((oneHoot)=> // 4. map through all the values (hoots)
        <div key={oneHoot._id}>
            <p>{oneHoot.title}</p>
            <p>by:<b>{oneHoot.author.username}</b></p>
            <Link to={`/hoots/${oneHoot._id}`}>See Details</Link>
        </div>
        )}

        {hoots.length===0 && <h2>No Hoots Available</h2>}

    </div>
  )
}

export default HootList