
import "../../assets/css/login.css"
import ChangeLoginOrSignup from "./ChangeLoginOrSignup"
import OperateObj from "./operateObj";
import {useRef, useState, useEffect} from "react";
import Swal from "sweetalert2";
import {waveAnimation} from "../../jsx/FUNCTIONS";
import axios from "axios";

function Login(setVarFunc) {

    const options = {
        method: 'POST', // 设置请求方法为POST
        headers: {
            'Content-Type': 'application/json' // 设置内容类型为JSON
        },
        body: JSON.stringify({
            key1: 'value1',
            key2: 'value2'
        }) // 将要发送的数据转换为JSON字符串
    };

    const refContainer = useRef(null)
    const refInfoInputContainer = useRef(null)
    const refIp = useRef(null)
    const refLoginInputContainer = useRef(null)
    const refSignupInputContainer = useRef(null)
    const refLoginEmailInput = useRef(null)
    const refLoginPasswordInput = useRef(null)
    const refSignupEmailInput = useRef(null)
    const refSignupPasswordInput = useRef(null)
    const refSignupCaptchaInput = useRef(null)

    const [loginEmailInputValue, setLoginEmailInputValue] = useState("")
    const [loginPasswordInputValue, setLoginPasswordInputValue] = useState("")
    const [signupEmailInputValue, setSignupEmailInputValue] = useState("")
    const [signupPasswordInputValue, setSignupPasswordInputValue] = useState("")
    const [signupCaptchaInputValue, setSignupCaptchaInputValue] = useState("")
    const [formStatus, setFormStatus] = useState("login")
    const [verifyButtonText, setVerifyButtonText] = useState("登录")

    let email, password

    useEffect(() => {
        email = refSignupEmailInput.current.value
        password = refSignupPasswordInput.current.value
    }, []);

    function handleVerifyButtonTextClick(e) {
        // .fetch("http://localhost:8080")
        // 验证输入是否正确
        waveAnimation(e)

        const forgetInputAlert = (text)=> {
            Swal.fire({
                title: `是不是忘记输入${text}了`,
                icon: "warning",
                fontsize: "10px"
            })
        }
        if (formStatus === "login") {
            if (!loginEmailInputValue) {
                forgetInputAlert("邮箱")
                return
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmailInputValue)) {
                Swal.fire({
                    title: "邮箱格式错误",
                    icon: "error"
                })
                return
            }
            if (!loginPasswordInputValue) {
                forgetInputAlert("密码")
                return
            }
        } else {
            if (!signupEmailInputValue) {
                forgetInputAlert("邮箱")
                return
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmailInputValue)) {
                Swal.fire({
                    title: "邮箱格式错误",
                    icon: "error"
                })
                return
            }
            if (!signupPasswordInputValue) {
                forgetInputAlert("密码")
                return
            }
            if (!signupCaptchaInputValue) {
                forgetInputAlert("验证码")
                return
            }
        }

        function removeContainer() {
            const loginForm = document.getElementsByClassName("loginForm")[0]
            refContainer.current.style.backdropFilter = "none"
            loginForm.style.animation = "loginForm-remove ease-in-out 1s"
            refIp.current.style.animation = "ip-remove ease-in-out 1s"
            setTimeout(()=>{
                setVarFunc.setVarFunc.setLoginStatus(true)
            }, 900)
        }

        function login(loginEmailInputValue, loginPasswordInputValue) {
            axios.post("http://47.120.18.202:8888/login", {
                "user_account": loginEmailInputValue,
                "user_password": loginPasswordInputValue
            }, {"Content-Type": "application/json"})
                .then(response => {
                    const date = new Date();
                    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000)); // 设置日期为当前时间加7天
                    const expires = "expires=" + date.toUTCString();

                    document.cookie = `token=${response["data"]["token"]}; ` + expires + "; path=/";
                    console.log(document.cookie)
                    if (response["data"]["message"] === "登录成功") {
                        Swal.fire({
                            title: `登录成功\n欢迎回来 ${loginEmailInputValue}`,
                            icon: "success"
                        })
                        removeContainer()
                    } else {
                        Swal.fire({
                            title: `登录失败\n是不是密码输错了，还是没有注册`,
                            icon: "error"
                        })
                    }
                })
                .catch(error =>{
                    Swal.fire({
                        "title": error.response.data.message,
                        "icon": "error"
                    })
                })
        }

        if (formStatus === "login") {
            if (!loginEmailInputValue) {
                forgetInputAlert("邮箱")
                return
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmailInputValue)) {
                Swal.fire({
                    title: "邮箱格式错误",
                    icon: "error"
                })
                return
            }
            if (!loginPasswordInputValue) {
                forgetInputAlert("密码")
                return
            }
            // 发送登录请求
            login(loginEmailInputValue, loginPasswordInputValue)
        } else {
            if (!signupEmailInputValue) {
                forgetInputAlert("邮箱")
                return
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmailInputValue)) {
                Swal.fire({
                    title: "邮箱格式错误",
                    icon: "error"
                })
                return
            }
            if (!signupPasswordInputValue) {
                forgetInputAlert("密码")
                return
            }
            if (!signupCaptchaInputValue) {
                forgetInputAlert("验证码")
                return
            }
            axios.post("http://47.120.18.202:8888/register", {
                "user_account": signupEmailInputValue,
                "user_name": signupEmailInputValue,
                "user_password": signupPasswordInputValue,
                "user_captcha": parseInt(signupCaptchaInputValue)
            }, {"Content-Type": "application/json"})
                .then(response =>{
                    if (response["data"]["message"] === "注册成功") {
                        Swal.fire({
                            title: `注册成功\n欢迎 ${signupEmailInputValue}`,
                            icon: "success"
                        })
                        removeContainer()
                        login(signupEmailInputValue, signupPasswordInputValue)
                    } else if (response["data"]["message"] === "该账号已被注册") {
                        Swal.fire({
                            title: `注册失败\n该账号已经被注册了\n去登录想一想密码或者再注册一个呢`,
                            icon: "error"
                        })
                    } else if (response["data"]["message"] === "验证码错误") {
                        Swal.fire({
                            title: `注册失败\n是不是验证码输错了`,
                            icon: "error"
                        })
                    }
                })
                .catch(error =>{
                    Swal.fire({
                        "title": error.response.data.message,
                        "icon": "error"
                    })
                })
        }
    }


    return (
        <div ref={refContainer} className="container">
            <div className="bacground">
                <div className="tree1"></div>
                <div className="tree2"></div>
                <div className="tree3"></div>
                <div className="tree4"></div>
            </div>
            <div ref={refIp} className="ip"></div>
            <div className={"loginForm"}>
                <div className="loginContainer">

                    <ChangeLoginOrSignup setFormStatus={setFormStatus} setVerifyButtonText={setVerifyButtonText} refs={{refInfoInputContainer, refIp, refSignupInputContainer, refLoginInputContainer}}/>

                    <div className="infoInputContainer" ref={refInfoInputContainer}>
                        {/*<div className="operateObj" ref={refEmailContainer}>*/}
                        {/*    <div ref={refHint} className="hint">{this.props.hint}</div>*/}
                        {/*    <input ref={refInput} type={this.props.inputType} className="input"*/}
                        {/*           onClick={(event)=> handleInputClicked(event)}*/}
                        {/*           onBlur={()=> {*/}
                        {/*               hintMove(refInput.current)*/}
                        {/*           }}/>*/}
                        {/*</div>*/}
                        <div className="loginInputContainer infoInputContainerChildren" ref={refLoginInputContainer}>
                            <OperateObj ref={refLoginEmailInput} hint={"邮箱"} inputType={"email"} container={refContainer.current} refIp={refIp} formStatus={formStatus} setInputValue={setLoginEmailInputValue}/>
                            <OperateObj ref={refLoginPasswordInput} hint={"密码"} inputType={"password"} container={refContainer.current} refIp={refIp} formStatus={formStatus} setInputValue={setLoginPasswordInputValue}/>
                        </div>
                        <div className="signupInputContainer infoInputContainerChildren" ref={refSignupInputContainer}>
                            <OperateObj ref={refSignupEmailInput} hint={"邮箱"} inputType={"email"} container={refContainer.current} refIp={refIp} formStatus={formStatus} setInputValue={setSignupEmailInputValue}/>
                            <OperateObj ref={refSignupPasswordInput} hint={"密码"} inputType={"password"} container={refContainer.current} refIp={refIp} formStatus={formStatus} setInputValue={setSignupPasswordInputValue}/>
                            <OperateObj ref={refSignupCaptchaInput} hint={"验证"} inputType={"text"} container={refContainer.current} refIp={refIp} formStatus={formStatus} setInputValue={setSignupCaptchaInputValue} signupEmailInputValue={signupEmailInputValue}
                            email={signupEmailInputValue} password={signupPasswordInputValue}/>
                        </div>
                    </div>
                    <div className="verifyButton" onClick={(e)=>{handleVerifyButtonTextClick(e)}}>{verifyButtonText}</div>
                </div>
            </div>
        </div>
    )
}

export default Login