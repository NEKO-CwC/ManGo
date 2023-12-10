import {useRef} from "react";
import jiujiuMail from "../../assets/svg/login/jiujiu-mail.svg"
import jiujiuSignupMail from "../../assets/svg/login/jiujiu-signup.svg"

function ChangeLoginOrSignup(props) {

    const refSlider = useRef(null)
    const refLoginText= useRef(null)
    const refSignupText = useRef(null)

    function handleLoginTextClick() {
        props.setFormStatus("login")
        refSlider.current.style.transform = "translateX(0)"
        props.refs.refIp.current.style.animation = "moveToLogin cubic-bezier(0.42, 0, 0, 0.99) 1s"
        props.refs.refIp.current.style.background = `url(${jiujiuMail})`
        setTimeout(()=>{
            props.refs.refIp.current.className = "ip ip-login"
        }, 900)
        props.setVerifyButtonText("登录")
        props.refs.refInfoInputContainer.current.style.transform = "translateX(0)"
        props.refs.refLoginInputContainer.current.style.opacity = "1"
        props.refs.refLoginInputContainer.current.style.pointerEvents = "auto"
        props.refs.refSignupInputContainer.current.style.opacity = "0"
        props.refs.refSignupInputContainer.current.style.pointerEvents = "none"
    }

    function handleSignupTextClick() {
        props.setFormStatus("signup")
        refSlider.current.style.transform = "translateX(105px)"
        props.refs.refIp.current.style.animation = "moveToSignup cubic-bezier(0.42, 0, 0, 0.99) 1s"
        props.refs.refIp.current.style.background = `url(${jiujiuSignupMail})`
        setTimeout(()=>{
            props.refs.refIp.current.className = "ip ip-signup"
        }, 900)
        props.setVerifyButtonText("注册")
        props.refs.refInfoInputContainer.current.style.transform = "translateX(-50%)"
        props.refs.refLoginInputContainer.current.style.opacity = "0"
        props.refs.refLoginInputContainer.current.style.pointerEvents = "none"
        props.refs.refSignupInputContainer.current.style.opacity = "1"
        props.refs.refSignupInputContainer.current.style.pointerEvents = "auto"
    }

    return (
        <div className="changeLoginOrSignup">
            <div className="textContainer">
                <div className="loginText text" ref={refLoginText} onClick={handleLoginTextClick}>登录</div>
                <div className="signupText text" onClick={handleSignupTextClick} >注册</div>
            </div>
            <div className="sliderContainer">
                <div className="slider" ref={refSlider}></div>
            </div>
        </div>
    )
}

export default ChangeLoginOrSignup