import { useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router'
// Steps
// 1. get the id from the URL using useParams()
// 2. create a function to make an axios call to get the 1 hoot with the id from step 1 and set the state
// 3. call the function we made in step 3 in the useEffect
// 4. show the state on the page


function HootDetails({ user }) {
    const [hoot, setHoot] = useState(null)

    const { id } = useParams()
    const navigate = useNavigate()

    async function getOneHoot(){
        try{
            const oneHoot = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/hoots/${id}`)
            setHoot(oneHoot.data)
        }
        catch(err){
            console.log(err)
        }
    }

    async function deleteHoot(){
        try{
            const token = localStorage.getItem('token')
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/hoots/${id}`,{headers:{Authorization: `Bearer ${token}`}})
            navigate('/hoots')
        }
        catch(err){
            console.log(err)

        }
    }

    useEffect(()=>{
        getOneHoot()
    },[])

  return (
    <div>
        <h1>Hoot Details</h1>

        { hoot ? 
        (<>
            <h2>{hoot.title}</h2>
            <p>{hoot.text}</p>
            <p>By: <b>{hoot.author.username}</b></p>
            {user?._id === hoot.author._id ? (
                <button onClick={deleteHoot}>Delete</button>
                ) : <></>}
            

            <h3>Comments:</h3>
            {hoot.comments.map((oneComment)=>
            <div key={oneComment._id}>
                <p>{oneComment.text}</p>
                <p>By: {oneComment.author.username}</p>
            </div>
            )}
        </>) 
        : 
        (<>
            <p>Loading...</p>
        </>)
        }
    </div>
  )
}

export default HootDetails