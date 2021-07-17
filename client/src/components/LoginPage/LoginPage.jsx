import { useState } from 'react'
import './LoginPage.scss'
import { GoogleLogin } from 'react-google-login'
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux'
import Logo from '../../data/images/logo.svg'
import { Link } from "react-router-dom";
import Input from './input';
import { useHistory } from 'react-router-dom';
import { signin, signup} from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

function LoginPage() {
    const [formData, setFormData] = useState(initialState)
    const [isSignup, setisSignup] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (isSignup) {
            dispatch(signup(formData, history))
        } else {
            dispatch(signin(formData, history))

        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const SwitchMode = () => {
        setisSignup((previsSignUp) => !previsSignUp)
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } })
            history.push('/')
        } catch (error) {
            console.log(error)
        }

    }
    const googleError = () => {

        console.log("Unsucessful Request")
    }
    return (


        <div className="body">
            <div className="main">
                <p className="sign"> <img className="sign__logo" src={Logo}></img></p>

                <form className="form" onSubmit={handleSubmit}>
                    {
                        !isSignup && (
                            <>         <div className="form-inputs">
                                <input className="un " type="text" placeholder="Username"name = "email" onChange = {handleChange}/>
                                <input className="pass" type="password" placeholder="Password"
                                name ="password"
                                onChange = {handleChange}
                                />
                            </div>

                            </>
                        )
                    }

                    {
                        isSignup && (

                            <div className="signForm">
                                <Input name="firstName" label="First Name" type="text" handleChange={handleChange} />
                                <Input name="lastName" label="Last Name" type="text" handleChange={handleChange} />
                                <Input name="email" label="Email" type="Email" handleChange={handleChange} />
                                <Input name="password" label="Password" type="Password" handleChange={handleChange} />
                                <Input name="confirmPassword" label="Confirm Password" type="Password" handleChange={handleChange} />
                            </div>

                        )
                    }
                    <div className="buttons">

                        <button type="submit" className="buttons__submit" > {isSignup ? "Sign Up" : "Sign In"}</button>
                        <GoogleLogin
                            clientId="1020915174395-jitmfq2ot42sb7qnrecb2uual3tndhu8.apps.googleusercontent.com"
                            render={(renderProps) => (
                                <Button color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained">
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleError}
                            cookiePolicy="single_host_origin"
                        />
                        <Link onClick={SwitchMode} className="buttons__signup"> {isSignup ? "Already have an account?" : "Don't have an account?"}</Link>
                        <Link to="/" className="buttons__forgot">Main Page</Link>
                        <Link to="/" className="buttons__forgot">Main Page</Link>

                    </div>
                    <div>


                    </div>

                </form>

            </div>
        </div>
    )
}

export default LoginPage
