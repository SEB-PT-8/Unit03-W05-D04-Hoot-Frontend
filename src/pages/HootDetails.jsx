import { useState, useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
// Steps
// 1. get the id from the URL using useParams()
// 2. create a function to make an axios call to get the 1 hoot with the id from step 1 and set the state
// 3. call the function we made in step 3 in the useEffect
// 4. show the state on the page


function HootDetails() {
    const [hoot, setHoot] = useState(null)

    const { id } = useParams()

    async function getOneHoot(){
        try{
            const oneHoot = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/hoots/${id}`)
            setHoot(oneHoot.data)
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
            <button>Delete</button>

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