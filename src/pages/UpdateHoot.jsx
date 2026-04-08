import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router"

function UpdateHoot() {

    const [formData, setFormData] = useState({
        title: '',
        text: '',
        category:''
    })

    const { id } = useParams()

    async function getHoot(){
        const foundHoot = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/hoots/${id}`)

        setFormData(foundHoot.data)

    }

    useEffect(()=>{
        getHoot()
    },[])

        function handleChange(event){
        setFormData({...formData, [event.target.name]:event.target.value})
    }

    async function handleSubmit(event){
        event.preventDefault()
        try{
        const token = localStorage.getItem('token')
        const createdHoot = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/hoots/${id}`,formData,{headers:{Authorization:`Bearer ${token}`}})
        navigate(`/hoots/${createdHoot.data._id}`)

        }
        catch(err){
            console.log(err)
        }

    }
  return (
    <div>
        <h1>Update Hoot</h1>


        <form onSubmit={handleSubmit}>

            <label htmlFor="title">Title:</label>
            <input value={formData.title} onChange={handleChange} name='title' type="text" />

            <label htmlFor="text">Text:</label>
            <input value={formData.text} onChange={handleChange} name='text' type="text" />

            <label htmlFor="category"></label>
            <select value={formData.category} onChange={handleChange} name="category" id="category">
                <option value="News">-------</option>
                <option value="News">News</option>
                <option value="Sports">Sports</option>
                <option value="Games">Games</option>
                <option value="Movies">Movies</option>
                <option value="Music">Music</option>
                <option value="Television">Television</option>
            </select>
            <button>Update Hoot</button>
        </form>
    </div>
  )
}

export default UpdateHoot