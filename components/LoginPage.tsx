import { FC, ReactElement, useState, useEffect, useRef} from 'react'
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { signup, useAuth, logout, login} from '../firebase'
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import * as Yup from 'yup';
import Link from 'next/link';

 const LoginPage: FC = (): ReactElement => {

  const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  let form: any;
  form = useRef()

  const router = useRouter();

  const [ loading, setLoading ] = useState<boolean>(false)
  const currentUser = useAuth()

  async function handleSignup(email: string, password: string) {
    setLoading(true)

      signup(email, password)
      .then(res => {
        Cookies.set("loggedin", "true");
        setLoading(false)
        router.push('/dashboard')
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
      

      
  }

  async function handleLogin(email: string, password: string) {
    setLoading(true)

      login(email, password)
      .then(res => {
        Cookies.set("loggedin", "true");
        setLoading(false)
        router.push('/dashboard')
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })

      
  }

  async function handleLogout(){
    logout()
      .then(res => {
        Cookies.remove("loggedin")
        router.push('/')
      })
      .catch(err => console.log(err))

      setLoading(false)
  }

    return (
    <div className='login-container'>

        <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>

        <Formik
          initialValues={{
            password: '',
            email: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values) => {

            handleLogin(values.email, values.password)
            values.password = '',
            values.email = ''
            
          }}
        >
          {({values, errors, touched, handleSubmit, handleChange}) => (
             <form ref={form} onSubmit={handleSubmit} className='formik-form'>
              <h1>Login</h1>

                <TextField sx={{"& .MuiOutlinedInput-root": {
                              "& > fieldset": { borderColor: "black" },
                        },     "& .MuiOutlinedInput-root.Mui-focused": {
                          "& > fieldset": {
                        borderColor: "white"
                          }},"& .MuiOutlinedInput-root:hover": {
                            "& > fieldset": {
                              borderColor: "white"
                            }
                          }
                          }}  id="email" name='email' label="Email" variant="outlined" onChange={handleChange} margin='normal' style={{width: '400px'}} fullWidth/>
                          {errors.email && touched.email ? (
                            <div style={{color: 'red'}}>{errors.email}</div>
                          ) : null}

                <TextField sx={{"& .MuiOutlinedInput-root": {
                              "& > fieldset": { borderColor: "black" },
                        },     "& .MuiOutlinedInput-root.Mui-focused": {
                          "& > fieldset": {
                        borderColor: "white"
                          }},"& .MuiOutlinedInput-root:hover": {
                            "& > fieldset": {
                              borderColor: "white"
                            }
                          }
                          }}  id="password" type='password' name='password' label="Password" variant="outlined" onChange={handleChange} style={{width: '400px'}} margin='normal'/>
                          {errors.password && touched.password ? (
                            <div style={{color: 'red'}}>{errors.password}</div>
                          ) : null}
              
               <button className="form-submit button" type="submit" style={{marginTop: '10px'}}>Login</button>
               <Link href='/register'><button className='button' style={{marginTop: '10px'}}>Sign Up!</button></Link>
             </form>
           )}
        </Formik>
    </div>
    )
}

export default LoginPage