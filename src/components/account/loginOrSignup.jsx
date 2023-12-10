import {standardErrorMessageBox, transform} from "../../jsx/FUNCTIONS"
import React, {useEffect, useRef, useState} from "react";
import Swal from "sweetalert2"
import "../../assets/css/loginOrSignup.css"
import "../../assets/css/successAlert.css"
const axios = require("axios")

function LoginOrSignup() {

    const refEmailInput = useRef(null)
    const refPasswordInput = useRef(null)
    const refVerifyPasswordInput = useRef(null)
    const refEmailContainer = useRef(null)
    const refPasswordContainer = useRef(null)
    const refVerifyPasswordContainer = useRef(null)
    const refContainer = useRef(null)
    const refContinue = useRef(null)
    const refContinueInnerText = useRef(null)
    const refLogo = useRef(null)
    const refOperate = useRef(null)
    const refSvgEmailTop = useRef(null)
    const refSvgEmailBottom = useRef(null)
    const refBackground = useRef(null)

    const [renderPassword, setRenderPassword] = useState(false)
    const [renderVerifyPassword, setRenderVerifyPassword] = useState(false)
    const [continueInnerText, setContinueInnerText] = useState("继续")
    const [status, setStatus] = useState("inputEmail")
    const [emailTopPoints, setEmailTopPoints] = useState("")
    const [emailBottomPoints, setEmailBottomPoints] = useState("")
    const [isEmailEffectRender, setIsEmailEffectRender] = useState(false)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // 检测邮箱输入是否合法
    const port = 8080
    let inputTarget = null

    useEffect(() => {
        const updatePoints = () => {
            if (refSvgEmailTop.current) {
                const width = window.innerWidth * 0.25;
                const height = refSvgEmailTop.current.clientHeight;
                const newPoints = `0,0 ${width / 2},${height} ${width},0`;
                setEmailTopPoints(newPoints);
            }
            if (refSvgEmailBottom.current) {
                const width = window.innerWidth * 0.25;
                const height = refSvgEmailBottom.current.clientHeight;
                const newPoints = `0,${height} ${width / 2},0 ${width},${height}`;
                setEmailBottomPoints(newPoints);
            }
        };

        window.addEventListener('resize', updatePoints);
        updatePoints(); // 初始化

        return () => {
            window.removeEventListener('resize', updatePoints);
        };
    }, [isEmailEffectRender]);

    useEffect(()=>{
        if (renderPassword) {
            containerElementMerge(refPasswordContainer.current)
        }
        if (renderVerifyPassword) {
            containerElementMerge(refVerifyPasswordContainer.current)
        }
    }, [renderPassword, renderVerifyPassword])


    function containerElementMerge(element) {
        element.style.display = "flex"
        element.style.opacity = "1"
        element.style.height = "80px"
        element.style.marginBottom = "10px"
        // setTimeout(()=>{element.style.height = "100px"}, 1000)
    }

    function continueLoadingStyle() {
        refContinueInnerText.current.style.opacity = "0"
        refContinue.current.style.pointerEvents = "none"
    }

    function continueUsingStyle(text) {
        refContinueInnerText.current.style.opacity = "1"
        refContinue.current.style.pointerEvents = "auto"
        refContinueInnerText.current.style.opacity = "1"
        setContinueInnerText(text)
    }

    function waveAnimation(element, offsetX, offsetY) {
        const wave = document.createElement("span")
        element.appendChild(wave)
        wave.className = "wave"
        wave.style.left = offsetX+"px"
        wave.style.top = offsetY+"px"
        console.log(offsetX + " " + offsetY)
        setTimeout(()=>{
            wave.remove()
        }, 1000)
    }

    function hintMove(inputElement) {
        if (!inputElement.value) {
            const hintElement = inputElement.parentNode.getElementsByClassName("hint")[0]
            hintElement.classList.remove("hint-above")
            transform(hintElement, {"translate": "20px, 36px"})
        }
    }

    function login(email, password, token) {
        /**
         *
         * @type {{password, email, token}}
         * @param password
         */
        const postData = {
            "email": email,
            "password": password,
            "token": token,
        }
        axios.post(`http://localhost:${port}/account/login`, postData, {
            headers:　{
                "Content-Type": "application/json"
            }
        })
    }

    const handleContinue = (e) => {
        const continueElement = refContinue.current
        const offsetX = e.clientX - continueElement.getBoundingClientRect().left
        const offsetY = e.clientY - continueElement.getBoundingClientRect().top
        waveAnimation(refContinue.current, offsetX, offsetY)

        if (status === "inputEmail") {

            if (emailRegex.test(refEmailInput.current.value)) { // 邮箱输入正确
                continueLoadingStyle()
                verifyEmail() // 验证账号是否存在
            } else {
                standardErrorMessageBox("邮箱格式错误")
            }
        }

        if (status === "login") {
            continueLoadingStyle()
            verifyLogin()
        }
        if (status === "signup") {
            continueLoadingStyle()
            verifySignup()
        }
        console.log(status)
    }

    function verifyEmail() {
        // fetch(`https://localhost:${port}/checkIfAccountExist&email=${refEmailInput.current.value}`)
        //     .then(res => (res.json()))
        //     .then(data => {
        //         if (data["OK"]) {
        //             status = "inputPassword"
        //             setTimeout(()=>{
        //                 refContinueInnerText.current.style.opacity = "1"
        //                 setContinueInnerText("登录")
        //                 status = "login"
        //             }, 500)
        //         } else {
        //             status = "createAccount-inputPassword"
        //             setRenderPassword(true)
        //             setTimeout(()=>{
        //                 setRenderVerifyPassword(true)
        //                 setTimeout(()=>{
        //                     refContinueInnerText.current.style.opacity = "1"
        //                     setContinueInnerText("注册")
        //                     status = "signup"
        //                 }, 500)
        //             }, 500)
        //         }
        //         refContinueInnerText.current.style.opacity = "1"
        //         refContinue.current.style.pointerEvents = "auto"
        //     })

        const data = {"OK": Math.random() - 0.5 > 0 ? undefined : "OK"}
        // const data = {"OK": "OK"}
        if (data["OK"]) {
            setRenderPassword(true)
            setTimeout(() => {
                continueUsingStyle("登录")
                setStatus("login")
            }, 500)
        } else {
            setRenderPassword(true)
            setTimeout(() => {
                setRenderVerifyPassword(true)
                setTimeout(() => {
                    continueUsingStyle("注册")
                    setStatus("signup")
                }, 500)
            }, 500)
        }
    }

    function verifyLogin() {
        // const email = refEmailInput.current.value
        // const password = refPasswordInput.current.value
        // const postData = {
        //     "email": email,
        //     "password": password,
        // }
        // const config = {
        //     "header": {
        //         "Content-Type": "application/json",
        //         "authorization": "token"
        //     }
        // }
        // axios.post(`https://localhost:${port}/account/login`, postData, config)
        //     .then(res => res.data)
        //     .then(data => {
        //         if (data["OK"]) {
        //             successAlert()
        //         } else {
        //             standardErrorMessageBox("密码错误")
        //             continueUsingStyle()
        //         }
        //     })
        const data = {
            "OK": Math.random()-0.5>0 ? undefined : "OK",
            "userName": "NEKO"
        }

        if (data["OK"]) {
            successAlert(`欢迎回来\n${data["userName"]}`)
        } else {
            standardErrorMessageBox("密码错误")
            continueUsingStyle("登录")
        }
    }

    function verifySignup() {
        const password = refPasswordInput.current.value
        const rePassword = refVerifyPasswordInput.current.value
        if (password === "" || rePassword === "") {
            standardErrorMessageBox("密码不能为空")
            continueUsingStyle("注册")
            return
        }
        if (password.length <= 6) {
            standardErrorMessageBox("密码必须大于等于6位")
            continueUsingStyle("注册")
            return
        }
        if (password !== rePassword) {
            standardErrorMessageBox("两次密码输入不一样")
            continueUsingStyle("注册")
            return
        }
        // const email = refEmailInput.current.value
        // const postData = {
        //     email,
        //     password,
        // }
        // const config = {
        //     "authorization": "token",
        //     "Content-Type": "application/json"
        // }
        // axios.post(`http://localhost:8080/account/singup`, postData, config)
        //     .then(res => {
        //         if (res["OK"]) {
        //             successAlert("注册成功")
        //         } else {
        //             standardErrorMessageBox("注册失败")
        //         }
        //     })
        const data = {
            "OK": Math.random()-0.5>0 ? undefined : "OK"
        }
        if (data["OK"]) {
            setIsEmailEffectRender(true)
            refLogo.current.style.transform = `translateY(${refContainer.current.clientHeight*0.6}px)`
            refBackground.current.style.animation = "backgroundHide 1s 2s"
            setTimeout(()=>{
                refContainer.current.style.animation = "sendEmailEffectX 1.5s linear, sendEmailEffectY 1.5s ease-out, sendEmailEffectScale 2s"
                setTimeout(()=>{
                    Swal.fire("注册成功", "有一封激活邮件发送到了你的邮箱\n点击链接后激活账号", "success")
                    refContainer.current.remove()
                    refBackground.current.remove()
                }, 1500)
            }, 1000)
        } else {
            standardErrorMessageBox("注册失败")
            continueUsingStyle("注册")
        }
    }

    function successAlert(text) {
        const height = refContainer.current.clientHeight
        // refContainer.current.style.width = "10vw"
        refContainer.current.style.height = height + "px"
        refLogo.current.style.opacity = "0"
        refOperate.current.style.opacity = "0"
        refContinue.current.style.opacity = "0"
        setTimeout(()=>{
            refContainer.current.innerHTML = `
                <div class="success-checkmark">
                    <div class="check-icon">
                        <span class="icon-line line-tip"></span>
                        <span class="icon-line line-long"></span>
                        <div class="icon-circle"></div>
                        <div class="icon-fix"></div>
                    </div>
                </div>
                <div class="text">${text}</div>`
            refContainer.current.style.animation = "loginSuccessHide 1s 2s"
            refBackground.current.style.animation = "backgroundHide 1s 2s"
            setTimeout(()=>{
                refContainer.current.remove()
                refBackground.current.remove()
            }, 3000)
        }, 500)
    }

    const handleInputClicked = (e) => {
        const hintElement = e.target.parentNode.getElementsByClassName("hint")[0]
        hintElement.classList.add("hint-above")
        transform(hintElement, {"translate": "10px, -5px"})
    }

    return (
        <div className="background" ref={refBackground}>
            <div className="container" ref={refContainer}>
                <img src="../../assets/svg/login/loginForm.svg" className="loginImg" />
                {isEmailEffectRender && <div className="emailEffect">
                    <div className="emailBottom">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                             ref={refSvgEmailBottom}>
                            <polyline
                                fill="white"
                                stroke="black"
                                strokeWidth="4"
                                points={emailBottomPoints}
                            ></polyline>
                        </svg>
                    </div>
                    <div className="emailTop">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
                             ref={refSvgEmailTop}>
                            <polyline
                                fill="white"
                                stroke="black"
                                strokeWidth="4"
                                points={emailTopPoints}
                            ></polyline>
                        </svg>
                    </div>
                    <div className="emailLeftMask"></div>
                    <div className="emailRightMask"></div>
                </div>}
                <div className="logo" ref={refLogo}></div>
                <div className="operate" ref={refOperate}>
                    <div className="operateObj email" ref={refEmailContainer}>
                        <div className="emailHint hint">邮箱</div>
                        <input ref={refEmailInput} type="email" className="emailInput input"
                               onClick={(event)=> handleInputClicked(event)}
                               onBlur={()=> {
                                   hintMove(refEmailInput.current)
                               }}/>
                    </div>
                    <div className="operateObj password" ref={refPasswordContainer}>
                        <div className="passwordHint hint">密码</div>
                        <input ref={refPasswordInput} type="password" className="passwordInput input"
                               onClick={(event)=> handleInputClicked(event)}
                               onBlur={()=> {
                                   hintMove(refPasswordInput.current)
                               }}/>
                    </div>
                    <div className="verifyPassword operateObj" ref={refVerifyPasswordContainer}>
                        <div className="passwordHint hint">重新输入密码</div>
                        <input ref={refVerifyPasswordInput} type="password" className="passwordInput input"
                               onClick={(event) => handleInputClicked(event)}
                               onBlur={() => {
                                   hintMove(refVerifyPasswordInput.current)
                               }}/>
                    </div>
                </div>
                <div className="continue" onClick={(event)=> handleContinue(event)} ref={refContinue}>
                    <span className="text" ref={refContinueInnerText}>{continueInnerText}</span>
                </div>
            </div>
        </div>
    )
}

export default LoginOrSignup