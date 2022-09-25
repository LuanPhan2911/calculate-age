import './register.scss';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { fake } from '../../utils/constant';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validator from 'validator';
import { handleUserRegister } from '../../services/userServices';
import { register } from '../../features/user/UserSlice';
import { toast } from 'react-toastify';
import { useNavigate, } from 'react-router-dom';
const Register = (props) => {
    const language = useSelector((state) => state.app.language);
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',

    });
    const navigate = useNavigate();
    const [error, setError] = useState({
        name: {
            required: false,
        },
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

    //!validated
    useEffect(() => {
        setError({
            name: {
                required: false,
            },
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
                let { name } = error;
                if (validator.isEmpty(user.name)) {
                    name['required'] = true;
                    setError({ ...error, name })
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
    }, [user.name]);
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
    //!end validate

    const handleFillData = (event) => {
        setReadyValidate(true);
        let { name, value } = event.target;
        let userCopy = user;

        userCopy[name] = value;
        setUser({ ...userCopy });
    }


    const getErrorName = () => {
        let { required } = error.name;
        return (
            <>
                {
                    required &&
                    <div className="text-danger">
                        <FormattedMessage id='validate.name.require' />
                    </div>
                }
            </>
        )

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

    const handleRegister = async () => {
        setReadyValidate(true);
        if (validateSucceed) {
            try {
                let res = await handleUserRegister({ ...user, language })
                if (res && res.success) {
                    dispatch(register(res.data));
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
                    console.log(errors);
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

    return (
        <div className="register-container">
            <div className='register-header'>
                <h4><FormattedMessage id='auth.register.header' /></h4>
            </div>
            <div className='register-body'>
                <div className='from-group mb-2'>
                    <label><FormattedMessage id='auth.register.name' /></label>
                    <input
                        className='form-control'
                        type={'text'}
                        placeholder={fake.name}
                        value={user.name}
                        name={'name'}
                        onChange={(event) => handleFillData(event)}
                    />
                    {getErrorName()}
                </div>
                <div className='from-group mb-2'>
                    <label><FormattedMessage id='auth.register.email' /></label>
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
                <div className='from-group mb-2'>
                    <label><FormattedMessage id='auth.register.password' /></label>
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
                        <label className=' form-check-label'>
                            <FormattedMessage id='auth.register.remember' />
                        </label>
                    </div>
                    <button
                        className=' btn btn-primary'
                        onClick={() => handleRegister()}
                    >
                        <FormattedMessage id='auth.register.header' />
                    </button>
                </div>



            </div>
            <div className='register-footer'>
                <div className='text-center'
                >
                    <FormattedMessage id='auth.register.member' />
                    <Link to={'/login'}>
                        <FormattedMessage id='auth.login.header' />
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default Register;