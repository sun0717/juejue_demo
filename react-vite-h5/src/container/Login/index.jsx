import CustomIcon from '@/components/CustomIcon';
import React, { useCallback, useState, useRef } from 'react';
import { Cell, Checkbox, Input, Button, Toast } from 'zarm';
import Captcha from 'react-captcha-code';
import { post } from '@/utils';
import s from './style.module.less';

const Login = () => {
    const captchaRef = useRef();
    const [username, setUsername] = useState(''); // 账号
    const [password, setPassword] = useState(''); // 密码
    const [verify, setVerify] = useState(''); // 验证码
    const [captcha, setCaptcha] = useState('') // 验证码变化后存储值
    const [type, setType] = useState('login'); // 登录注册类型

    // 验证码变化，回调方法
    const handleChange = useCallback((captcha) => {
        console.log('captcha', captcha);
        setCaptcha(captcha);
    }, []);
    // 注册方法
    const onSubmit = async () => {
        if (!username) {
            Toast.show('请输入账号');
            return ;
        }
        if (!password) {
            Toast.show('请输入密码');
            return ;
        }
        try {
            // 判断是否是登陆状态
            if (type == 'login') {
                // 执行登录接口，获取token
                const { data } = await post('/api/user/login', {
                    username, 
                    password
                });
                // 将 token 写入 localStorage
                localStorage.setItem('token', data.token);
            } else {
                if (!verify) {
                    Toast.show('请输入验证码');
                    return ;
                }
                if (verify != captcha) {
                    Toast.show('验证码错误');
                    return ;
                };
                const { data } = await axios.post('/api/user/register', {
                    username, 
                    password
                });
                Toast.show('注册成功');
                // 注册成功，自动将 tab 切换到 login 状态
                setType('login');
            }
        } catch(error) {
            Toast.show('系统错误');
        }
    }
    return <div className={s.auth}>
        <div className={s.head}></div>
        <div className={s.tab}>
            <span>注册</span>
        </div>
        <div className={s.form}>
            <Cell icon={<CustomIcon type='zhanghao' />}>
                <Input
                    clearable
                    type='text'
                    placeholder='请输入账号'
                    onChange={(value) => setUsername(value)}
                />
            </Cell>
            <Cell icon={<CustomIcon type='mima' />}>
                <Input
                    clearable
                    type='password'
                    placeholder='请输入密码'
                    onChange={(value) => setPassword(value)}
                />
            </Cell>
            <Cell icon={<CustomIcon type='mima' />}>
                <Input
                    clearable
                    type='text'
                    placeholder='请输入验证码'
                    onChange={(value) => setVerify(value)}
                />
                <Captcha ref={captchaRef} charNum={4} onChange={handleChange}/>
            </Cell> : null
        </div>
        <div className={s.operation}>
            {
                type == 'register' ? <div className={s.agree}>
                    <Checkbox />
                    <label className='text-light'>阅读并同意<a>《掘掘手札条款》</a></label>
                </div> : null
            }
            <Button onClick={onSubmit} block theme="primary">{type == 'login' ? '登录' : '注册'}</Button>
        </div>
    </div>
}

export default Login;