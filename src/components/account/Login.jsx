
import "../../assets/css/login.css"
import ChangeLoginOrSignup from "./ChangeLoginOrSignup"
import OperateObj from "./operateObj";
import {useRef, useState} from "react";
import Swal from "sweetalert2";
import {waveAnimation} from "../../jsx/FUNCTIONS";

function Login(setVarFunc) {

    const refContainer = useRef(null)
    const refInfoInputContainer = useRef(null)
    const refIp = useRef(null)
    const refLoginInputContainer = useRef(null)
    const refSignupInputContainer = useRef(null)

    const [loginEmailInputValue, setLoginEmailInputValue] = useState("")
    const [loginPasswordInputValue, setLoginPasswordInputValue] = useState("")
    const [signupEmailInputValue, setSignupEmailInputValue] = useState("")
    const [signupPasswordInputValue, setSignupPasswordInputValue] = useState("")
    const [signupCaptchaInputValue, setSignupCaptchaInputValue] = useState("")
    const [formStatus, setFormStatus] = useState("login")
    const [verifyButtonText, setVerifyButtonText] = useState("登录")

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

        if (formStatus === "login") {
            // 发送登录请求
            const data = {"OK": Math.random()-0.5 <0 ? "OK": undefined}
            if (data["OK"]) {
                Swal.fire({
                    title: `登录成功\n欢迎回来${data["userName"]}`,
                    icon: "success"
                })
                removeContainer()
            } else {
                Swal.fire({
                    title: `登录失败\n是不是密码输错了，还是没有注册`,
                    icon: "error"
                })
            }
        } else {
            // 发送登录请求
            const data = {"OK": Math.random()-0.5 <0 ? "OK": undefined}
            if (data["OK"]) {
                Swal.fire({
                    title: `注册成功\n欢迎 ${data["userName"]}`,
                    icon: "success"
                })
                removeContainer()
            } else {
                Swal.fire({
                    title: `注册失败\n是不是验证码输错了`,
                    icon: "error"
                })
            }
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
                            <OperateObj hint={"邮箱"} inputType={"email"} container={refContainer.current} refIp={refIp} formStatus={formStatus} setInputValue={setLoginEmailInputValue}/>
                            <OperateObj hint={"密码"} inputType={"password"} container={refContainer.current} refIp={refIp} formStatus={formStatus} setInputValue={setLoginPasswordInputValue}/>
                        </div>
                        <div className="signupInputContainer infoInputContainerChildren" ref={refSignupInputContainer}>
                            <OperateObj hint={"邮箱"} inputType={"email"} container={refContainer.current} refIp={refIp} formStatus={formStatus} setInputValue={setSignupEmailInputValue}/>
                            <OperateObj hint={"密码"} inputType={"password"} container={refContainer.current} refIp={refIp} formStatus={formStatus} setInputValue={setSignupPasswordInputValue}/>
                            <OperateObj hint={"验证"} inputType={"text"} container={refContainer.current} refIp={refIp} formStatus={formStatus} setInputValue={setSignupCaptchaInputValue} signupEmailInputValue={signupEmailInputValue}/>
                        </div>
                    </div>
                    <div className="verifyButton" onClick={(e)=>{handleVerifyButtonTextClick(e)}}>{verifyButtonText}</div>
                </div>
            </div>
        </div>
    )
}

export default Login