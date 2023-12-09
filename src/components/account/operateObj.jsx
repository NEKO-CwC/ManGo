import {Component, createRef, useRef} from "react";
import {waveAnimation} from "../../jsx/FUNCTIONS";
import Swal from "sweetalert2"

import jiujiuMail from "../../assets/svg/login/jiujiu-mail.svg"
import jiujiuSignupMail from "../../assets/svg/login/jiujiu-signup.svg"
import jiujiuPassword from "../../assets/svg/login/jiujiu-password.svg"
import jiujiuSignupPassword from "../../assets/svg/login/jiujiu-signup-password.svg"

class OperateObj extends Component {
    constructor(props) {
        super(props);
        this.refInput = createRef()
        this.refHint = createRef()
        this.refEmailContainer = createRef()
    }

    handleGetCaptchaClick() {

    }

    handleInputClicked(e) {
        const hintElement = this.refHint.current
        hintElement.className = "hint hint-above"
        // document.getElementsByClassName("container")[0].style.transform = "translateY(-50px)"
        if (this.props.inputType === "password") {
            if (this.props.formStatus === "login") {
                this.props.refIp.current.style.background = `url(${jiujiuPassword})`
            } else {
                this.props.refIp.current.style.background = `url(${jiujiuSignupPassword})`
            }
        } else {
            if (this.props.formStatus === "login") {
                this.props.refIp.current.style.background = `url(${jiujiuMail})`
            } else {
                this.props.refIp.current.style.background = `url(${jiujiuSignupMail})`
            }
        }
    }

    hintMove(inputElement) {
        const hintElement = this.refHint.current
        hintElement.className = inputElement.value ? "hint hint-above" : "hint hint-inside"
        // document.getElementsByClassName("container")[0].style.transform = "translateY(0px)"
    }

    render() {
        return(
            <div className="operateObj" ref={this.refEmailContainer}>
                <div ref={this.refHint} className="hint hint-inside">{this.props.hint}</div>
                <input ref={this.refInput} type={this.props.inputType} className={this.props.inputType==="text"? "input captcha" : "input"}
                       onClick={(event)=> this.handleInputClicked(event)}
                       onBlur={()=> {
                           this.hintMove(this.refInput.current)
                       }} onChange={(event) => {
                           this.props.setInputValue(event.target.value)
                }}/>
                {this.props.inputType==="text" && <div className="getCaptcha" onClick={(e)=>{
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.props.signupEmailInputValue)) {
                        Swal.fire({
                            title: "邮箱格式错误",
                            icon: "error"
                        })
                        return
                    }

                    Swal.fire({
                        title: "有一封带着激活码的邮件发送到了你的邮箱中\n请注意查收",
                        icon: "success"
                    })
                    waveAnimation(e)
                }}>获取验证码</div>}
            </div>
        )
    }
}

export default OperateObj