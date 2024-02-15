import React from 'react'
import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import google from './Photos/google.svg'
import facebook from './Photos/facebook.svg'
import home1 from './Photos/r1.png'
import Header from './Header'
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { GoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';
import { FacebookLoginButton } from 'react-social-login-buttons'
import { LoginSocialFacebook } from 'reactjs-social-login'
import { jwtDecode } from 'jwt-decode'
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { gapi } from 'gapi-script'
import { GoogleLogin } from 'react-google-login';
// import { GoogleButton } from 'react-google-button';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';

const Login = () => {

  const clientId = "138299167650-a1pn1fi0blve2k8qdubas90eu9onha8a.apps.googleusercontent.com"
  const [pagename, setPagename] = useState("");
  const navigate = useNavigate("");
  const [errorList, setError] = useState([]);
  const [errormessage, setFaildMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      navigate('/');
    }
    setPagename('Login');
  }, [navigate]);

  useEffect(() => {
     gapi.load("client:auth2",()=>{
        gapi.auth2.init({clientId:clientId})
     })
  },[])

  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [googlename, setName] = useState("");
  const [googlemail, setGoogleEmail] = useState("");
  const [googleId, setGoogleid] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailfillerror, setFillEmail] = useState("");
  const [passwordfillerror, setPasswordEmail] = useState("");
  const [loginbutstate, setLoginstate] = useState(false);
  const [roleuser, setRole] = useState("");
  async function signIn() {

    try {
      setErrorMessage("");
      if (email === '') {
        setFillEmail("Please Enter your Email")
        return;
      }
      else if (password === '') {
        setPasswordEmail("Please Enter your Password")
        return;
      }

      setLoginstate(true)
      setErrorMessage("");
      let item = { email, password };
      console.warn(item);

      //Using Axios

      const result = await axios.post("http://localhost:8000/api/Login", item);

      if (result.data.status === 200) {
        const respones = result.data
        const role = result.data.role
        setRole(role)
        console.warn('result', respones);
        localStorage.setItem('access_token', JSON.stringify(result.data.token));
        handleSubsequentRequests();
      }

      else {
        const errorResponse = result.data
        const errorMessage = errorResponse.error || "An else error occurred.";
        console.error(errorMessage);
        setLoginstate(false);
        setErrorMessage(errorMessage);
      }

    } catch (error) {
      console.error("An error occurred:", error);
      const errorMessage = "An catch error occurred. Please try again.";
      setLoginstate(false);
      setErrorMessage(errorMessage); // Set the error message in state
    }

  }
  async function handleSubsequentRequests() {

    const token = JSON.parse(localStorage.getItem('access_token'));

    await axios.get('http://localhost:8000/api/getUserData', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        localStorage.setItem("user-info", JSON.stringify(response.data.userlogin));
        if (response.data.role === 0) {
          navigate("/");
        }
        else if (response.data.role === 1) {
          navigate("/Listing");
        }
      })
      .catch(error => {
        console.error('Subsequent request error')
        setLoginstate(false);
      });
  };


  async function handleGoogleLogin(gobname, gobemail, gobid) {

    const goname = gobname;
    const goemail = gobemail;
    const goid = gobid;

    // console.log(goname)
    // console.log(goemail)
    // console.log(goid)

    try {
      // const userdata = new FormData();
      // userdata.append('name',goname)
      // userdata.append('email',goemail)
      // userdata.append('id',goid)
      let userdata = { goname, goemail, goid }

      const response = await axios.post('http://localhost:8000/api/GoogleLogin', userdata)

      if (response.data.status === 200) {
        console.error('result', JSON.stringify(response.data.result));
        localStorage.setItem("access_token", JSON.stringify(response.data.token));//store the result to the local storge of the browser using key "user-info"  JSON.stringfy(item) used when we javascript object or value  serializes it into a JSON-formatted string.
        handleSubsequentRequests()
      }
      else {
        console.error('else error')
        const errorList = response.data.validate_err;
        setError(errorList);
        setFaildMessage("Error occurd please try later");
        console.error("else error")
        console.error(errorList)
      }

    } catch (error) {
      console.error(error);
      console.log('catch error')
    }
  };

  async function handleFacebookLogin(fabname, fabemail, fabid) {

    const faname = fabname;
    const faemail = fabemail;
    const faid = fabid;


    console.log(faname)
    console.log(faemail)
    console.log(faid)

    try {
      const userdata = new FormData();
      userdata.append('faname', faname)
      userdata.append('faemail', faemail)
      userdata.append('faid', faid)
      // let userdata = { faname, faemail, faid }
      const response = await axios.post('http://localhost:8000/api/FacebookLogin', userdata)

      if (response.data.status === 200) {
        console.error('result', JSON.stringify(response.data.result));
        localStorage.setItem("access_token", JSON.stringify(response.data.token));//store the result to the local storge of the browser using key "user-info"  JSON.stringfy(item) used when we javascript object or value  serializes it into a JSON-formatted string.
        handleSubsequentRequests()
      }
      else {
        const errorList = response.data.validate_err;
        setError(errorList);
        setFaildMessage("Error occurd please try later");
        console.error("else error")
        console.error(errorList)
      }

    }
    catch (error) {
      console.error('catch error')
      setFaildMessage("Error occurd please try later!");
      console.error(error)
    }
  }

  async function Googleresponsehandler (response) {
    
    const goname = response.profileObj.name
    const goemail = response.profileObj.email
    const goid = response.profileObj.googleId
    const accessToken = response.accessToken;

    console.log(accessToken);
    console.log(goname);
    console.log(goemail);
    console.log(goid);

    try {
      
      let userdata = { accessToken,goname,goemail,goid}

      const response = await axios.post('http://localhost:8000/api/GoogleLogin', userdata)

      if (response.data.status === 200) {
        console.error('result', JSON.stringify(response.data.result));
        localStorage.setItem("access_token", JSON.stringify(response.data.token));//store the result to the local storge of the browser using key "user-info"  JSON.stringfy(item) used when we javascript object or value  serializes it into a JSON-formatted string.
        handleSubsequentRequests()
      }
      else {
        console.error(response.data.error)
        const errorList = response.data.validate_err;
        setError(errorList);
        setFaildMessage("Error occurd please try later");
        console.error("else error")
        console.error(errorList)
      }

    } catch (error) {
      console.error(error);
      console.log('catch error')
    }
  }

  const componentClicked = (data) => {
    console.Console.log(data)
  }

  return (
    <div>
      <>
        <Helmet>
          <title>{pagename}</title>
        </Helmet>
        <Header />
        <div className="flex sm:items-center justify-center min-h-screen bg-gray-100 ">
          <div
            className="relative flex flex-col m-6 mt-20 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
            {/* -- left side -- */}
            <div className="flex flex-col justify-start p-8 md:p-14  ">
              <span className="mb-3 text-4xl font-bold font-sans text-black ">Login to Gojo</span>
              <span className="font-light text-gray-400 mb-4">
                Please enter your details
              </span>
              <div className="py-2">
                <span class="mb-2 text-md">Email</span>
                <input
                  type="text"
                  className={`w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 ${emailfillerror || errorMessage ? 'border-red-500' : 'border-gray-300'}`}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                />
                {emailfillerror && <div className="mb-2 error-message text-red-500">{emailfillerror}</div>}
              </div>
              <div class="py-4">
                <span className="mb-2 text-md">Password</span>
                <input
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  id="pass"
                  className={`w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 ${passwordfillerror || errorMessage ? 'border-red-500' : 'border-gray-300'}`}
                />
                {passwordfillerror && <div className="mb-2 error-message text-red-500">
                  {passwordfillerror}
                </div>
                }
                {errorMessage && <div className="mb-2 mt-5 error-message text-red-500">{errorMessage}</div>}
              </div>
              <div className="flex justify-between w-full py-2">
                <div className="mr-24">
                  <input type="checkbox" name="ch" id="ch" class="mr-2" />
                  <span className="text-md">Remember for 30 days</span>
                </div>
                <a href="#" className="font-bold text-md cursor-pointer hover:underline">Forgot password</a>
              </div>

              <button
                className={`w-full bg-black text-white font-semibold border border-black ${loginbutstate ? 'opacity-50 cursor-not-allowed' : 'transform hover:scale-105 transition easy-in-out duration-500 hover:bg-white hover:text-black hover:border hover:border-gray-300 active:bg-gray-100'} text-md p-2 rounded-lg mb-6`}
                id="signbtn"
                onClick={signIn}
                disabled={loginbutstate}
              >
                {loginbutstate ? 'Signing in...' : 'Sign in'}
              </button>

              {/* 
              <button
                className="w-full border border-gray-300 text-md  font-semibold text-black p-2 rounded-lg mb-4 hover:bg-black hover:text-white hover:border hover:border-black active:bg-black/75 active:border active:border-black/50"
               >
                <img src={google} alt="img" className="w-6 h-6 inline mr-2 " />
                Continue with Google
              </button> */}

              {/* <GoogleOAuthProvider clientId="138299167650-a1pn1fi0blve2k8qdubas90eu9onha8a.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    const detail = jwtDecode(credentialResponse.credential);
                    console.log(detail);
                    const goname = detail.name;
                    const goemail = detail.email;
                    const goid = detail.sub;
                    handleGoogleLogin(goname, goemail, goid);
                  }}
                  onError={() => {
                    onFailure('Login Failed');
                  }}
                  // buttonText="Sign in with Google"
                  cookiePolicy="single_host_origin"
                // isSignedIn =""
                />
              </GoogleOAuthProvider> */}

              <GoogleLogin
                clientId={clientId}
                buttonText="Sign up with Google"
                onSuccess={Googleresponsehandler}
                onFailure={Googleresponsehandler}
                cookiePolicy={'single_host_origin'}
                render={(renderProps) => (

                  <button
                    className="w-full shadow-sm border border-gray-300 text-md font-semibold text-black p-3 rounded-lg mb-4 hover:bg-gray-200  hover:border hover:border-gray-200 active:bg-black/75 active:border active:border-black/50 flex items-center transform hover:scale-105 easy-out duration-500"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}>
                    <img src={google} alt="Google logo" className="w-6 h-6 inline mr-2" />
                    <span className='font-semibold text-xl font-sans'>Log in with Google</span>
                  </button>

                )}
              />

              <div className="">
                <LoginSocialFacebook
                  appId="880056103505609"//identify the app
                  onResolve={(response) => {
                    console.log(response.data)
                    const faname = response.data.name;
                    const faemail = response.data.email;
                    const faid = response.data.id;
                    handleFacebookLogin(faname, faemail, faid)
                  }}
                  onReject={(error) => {
                    console.log(error)
                  }}>
                  <FacebookLoginButton
                    className="w-full border border-gray-300 text-md transition  transform hover:scale-105 easy-out duration-500 font-semibold text-black p-2 rounded-lg mb-2 hover:bg-black hover:text-white hover:border hover:border-black active:bg-black/75 active:border active:border-black/50" />
                </LoginSocialFacebook>
              </div>
              {errormessage && (
                <div className="text-red-600">{errormessage}</div>
              )}

              <div className="text-center text-gray-500 mt-1">
                Dont'have an account?
                <Link to="/Register" className="font-bold text-black cursor-pointer hover:underline">Register</Link>
              </div>
            </div>
            {/* right side */}
            <div class="relative">
              <img
                src={home1}
                alt="img"
                class="w-[450px] h-full hidden rounded-r-2xl md:block object-cover"
              />
              {/* -- text on image  -- */}
              <div
                className="absolute hidden bottom-[75px] right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
                <span className="text-white text-xl"
                >Renting Made Simple<br />Find Your Home Sweet Home.
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  )
}
export default Login
