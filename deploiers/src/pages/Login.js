import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // React Router에서 useNavigate 훅을 임포트


function Login() {
    const [formData, setFormData] = useState({
        uid: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState(''); // 로그인 실패 메시지를 저장할 상태
    const navigate = useNavigate(); // 네비게이션 함수 사용
    const [csrfToken, setCsrfToken] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/listener/login/', formData);
            localStorage.setItem('token', response.data.token);
            navigate('/');  // 로그인 성공 시 홈 페이지로 리디렉션
        } catch (error) {
            console.error('Login error:', error.response);
            setErrorMessage('Login failed: ' + (error.response?.data?.detail || 'Unexpected error')); // 오류 메시지 설정
        }
    };

    const handleEmailCheck = () => {
        navigate('/emailinput');  // '/emailcheck'로 이동
    };
    
    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* 오류 메시지 표시 */}
            <div>
                <label>id</label>
                <input
                    type="uid"
                    name="uid"
                    value={formData.uid}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">Login</button>
            <hr/>
            <button type="button" onClick={handleEmailCheck}>
                ChangePassword
            </button>
            <hr/>
            <button type="button" onClick={handleSignUp}>
                SignUp
            </button>
        </form>
    );
}

export default Login;
