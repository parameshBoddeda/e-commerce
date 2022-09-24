
import { useState } from "react";
import { object, string, number, date, InferType } from 'yup';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const registerSchema = object({
    email: string().email().required(),
    Password: string().min(6).max(15).required()
})

const LogIn = () => {
    const [data, setData] = useState({
        email: '',
        Password: ''
    })
    const [error, setError] = useState({
        email: '',
        Password: ''
    })
    const navigate = useNavigate();

    const handleOnChange = (value, key) => {
        setData({ ...data, [key]: value })
    }

    const handleSubmit = () => {
        registerSchema.validate(data, { abortEarly: false }
        ).then((res) => {
            setError({})
            
axios({
    method : 'post',
    url: 'https://api.backendless.com/BFB1C5CE-4984-1444-FFC6-C5F99F8DF500/2D6508CA-D333-4FAD-A55C-94CF94272EB5/users/register',
    data:{
        email: data.email,
        Name: data.Name,
        Password: data.Password
    }
}).then((response)=>{
console.log(response);
navigate('/productFeed')

}).catch(()=>{

})

        }).catch((error) => {

            let errorObj = {};
            error.inner.map((err) => {
                return errorObj[err.path] = err.message
            })
            setError(errorObj)
        })

    }
        
    return (
        <>
            <h1>LogIn here</h1>
            <div className="form-group" style={{ display: "flex", justifyContent: "center", alignItem: "center" }}>
                <div >
                    <input type="email" className="form-control"
                        placeholder="Enter email"
                        style={{ width: 400, margin: 10 }}
                        value={data.email} onChange={(event) => {
                            handleOnChange(event.target.value, 'email')
                        }}
                    />
                     <p className="text-danger">{error['email']}</p>

                    <input type="Password" className="form-control"
                        placeholder="Enter Password"
                        style={{ width: 400, margin: 10 }}
                        value={data.Password} onChange={(event) => {
                            handleOnChange(event.target.value, 'Password')
                        }}
                    />
                     <p className="text-danger">{error['Password']}</p>

                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    <p>Don't have an account <a href='/signup'>Signup</a> here </p>
                </div>

            </div>
        </>
    )
}


export default LogIn;