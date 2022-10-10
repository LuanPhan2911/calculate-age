
import './login.scss';
import { FormattedMessage } from 'react-intl';
import { fake } from '../../utils/constant';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import validator from 'validator';
import { handleUserLogin, handleVerifyToken } from '../../services/userServices';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../features/user/UserSlice';
import { toast } from 'react-toastify';
import axios from 'axios';
const Login = (props) => {
    const language = useSelector((state) => state.app.language);
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const [error, setError] = useState({
        email: {
            required: false,
            isEmail: false,
        },
        password: {
            required: false,
            minLength: false,
        }
    })
    const [readyValidate, setReadyValidate] = useState(false);
    const [validateSucceed, setValidateSucceed] = useState(false);

    useEffect(() => {
        setError({
            email: {
                required: false,
                isEmail: false,
            },
            password: {
                required: false,
                minLength: false,
            }
        })
    }, [user])
    useEffect(() => {
        let idTimer = setTimeout(() => {
            if (readyValidate) {
                let { email } = error;
                if (validator.isEmpty(user.email)) {
                    email['required'] = true;
                    setError({ ...error, email })
                    setValidateSucceed(false);
                } else
                    if (!validator.isEmail(user.email)) {
                        email['isEmail'] = true;
                        setError({ ...error, email });
                        setValidateSucceed(false);
                    }
                    else {
                        setValidateSucceed(true);
                    }
            }

        }, 500)
        return () => {
            clearTimeout(idTimer);
        };
    }, [user.email]);
    useEffect(() => {
        let idTimer = setTimeout(() => {
            if (readyValidate) {
                let { password } = error;
                if (validator.isEmpty(user.password)) {
                    password['required'] = true;
                    setError({ ...error, password })
                    setValidateSucceed(false);
                }
                else
                    if (!validator.isLength(user.password, 5)) {
                        password['minLength'] = true;
                        setError({ ...error, password });
                        setValidateSucceed(false);
                    }
                    else {
                        setValidateSucceed(true);
                    }
            }

        }, 500)
        return () => {
            clearTimeout(idTimer);
        };
    }, [user.password]);


    const handleLogin = async () => {
        setReadyValidate(true);
        if (validateSucceed) {
            try {
              
                // await handleVerifyToken()
                let res = await handleUserLogin({ ...user, language });
                    if (res && res.success) {
                        dispatch(login(res.data));
                        toast.success(res.message);
                        navigate(-1);
                    }
                 
                    
              
               
            } catch (error) {
                let { status, data } = error.response;

                if (status === 422) {
                    let { message } = data;
                    toast.error(message);
                }
                if (status === 400) {
                    let { errors } = data;
                    for (const key in errors) {
                        if (Object.hasOwnProperty.call(errors, key)) {
                            errors[key].forEach((item) => {
                                toast.error(item);
                            })

                        }
                    }
                }
            }

        }


    }
    const handleFillData = (event) => {
        setReadyValidate(true);
        let { name, value } = event.target;
        let userCopy = user;

        userCopy[name] = value;
        setUser({ ...userCopy });
    }
    const getErrorEmail = () => {
        let { required, isEmail } = error.email;
        return (
            <>
                {
                    required &&
                    <div className="text-danger">
                        <FormattedMessage id='validate.email.require' />
                    </div>
                }
                {
                    isEmail &&
                    <div className="text-danger">
                        <FormattedMessage id='validate.email.is-email' />
                    </div>
                }
            </>
        )

    }
    const getErrorPassword = () => {
        let { required, minLength } = error.password;
        return (
            <>
                {
                    required &&
                    <div className="text-danger">
                        <FormattedMessage id='validate.password.require' />
                    </div>
                }
                {
                    minLength &&
                    <div className="text-danger">
                        <FormattedMessage id='validate.password.min-length' />
                    </div>
                }
            </>
        )
    }
    return (
        <div className="login-container">
            <div className='login-header'>
                <h4><FormattedMessage id='auth.login.header' /></h4>
            </div>
            <div className='login-body'>
                <div className='from-group mb-1'>
                    <label><FormattedMessage id='auth.login.email' /></label>
                    <input
                        className='form-control'
                        type={'email'}
                        placeholder={fake.email}
                        value={user.email}
                        name={'email'}
                        onChange={(event) => handleFillData(event)}
                    />
                    {getErrorEmail()}

                </div>
                <div className='from-group mb-1'>
                    <label><FormattedMessage id='auth.login.password' /></label>
                    <input
                        className='form-control'
                        type={'password'}
                        value={user.password}
                        name={'password'}
                        onChange={(event) => handleFillData(event)}
                    />
                    {
                        getErrorPassword()
                    }


                </div>
                <div className='row px-3 mb-3'>
                    <div className=' form-check col-6'>
                        <input className=' form-check-input' type={'checkbox'} />
                        <label className=' form-check-label'><FormattedMessage id='auth.login.remember' /></label>
                    </div>
                    <div className='col-6 mb-3'>
                        <Link to={'/forgot-password'} className='link-success'>
                            <FormattedMessage id='auth.login.forgot-password' />
                        </Link>

                    </div>

                    <button
                        className=' btn btn-primary'
                        onClick={() => handleLogin()}
                    >
                        <FormattedMessage id='auth.login.header' />
                    </button>
                </div>



            </div>
            <div className='login-footer'>
                <div className='text-center'>
                    <FormattedMessage id='auth.login.not-member' />
                    <Link to={'/register'}>
                        <FormattedMessage id='auth.register.header' />
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Login;