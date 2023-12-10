import {Component, createRef, useRef} from "react";
import {waveAnimation} from "../../jsx/FUNCTIONS";
import Swal from "sweetalert2"

import jiujiuMail from "../../assets/svg/login/jiujiu-mail.svg"
import jiujiuSignupMail from "../../assets/svg/login/jiujiu-signup.svg"
import jiujiuPassword from "../../assets/svg/login/jiujiu-password.svg"
import jiujiuSignupPassword from "../../assets/svg/login/jiujiu-signup-password.svg"
import axios from "axios";

class OperateObj extends Component {
    constructor(props) {
        super(props);
        this.refInput = createRef()
        this.refHint = createRef()
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
            <div className="operateObj">
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
                    axios.post("http://47.120.18.202:8888/register/captcha",{
                            user_account : this.props.email,
                            user_password : this.props.password,
                        }, {"Content-Type": "application/json"})
                        .then(response =>{
                            let message = response.data.message;
                            console.log(message)
                            if (message === "验证码已发送") {
                                Swal.fire({
                                    title: "有一封带着激活码的邮件发送到了你的邮箱中\n请注意查收",
                                    icon: "success"
                                })
                            } else {
                                Swal.fire({
                                    title: "该账号已经被注册了\n想一想密码或者换个邮箱注册呢",
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
                    waveAnimation(e)
                }}>获取验证码</div>}
            </div>
        )
    }
}

export default OperateObj