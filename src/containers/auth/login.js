
import './login.scss';
import { FormattedMessage } from 'react-intl';
import { fake } from '../../utils/constant';
import { Link } from 'react-router-dom';
const Login = (props) => {
    return (
        <div className="login-container">
            <div className='login-header'>
                <h4><FormattedMessage id='auth.login.header' /></h4>
            </div>
            <div className='login-body'>
                <div className='from-group mb-2'>
                    <label><FormattedMessage id='auth.login.email' /></label>
                    <input
                        className='form-control'
                        type={'email'}
                        placeholder={fake.email}
                    />
                </div>
                <div className='from-group mb-2'>
                    <label><FormattedMessage id='auth.login.password' /></label>
                    <input className='form-control' type={'password'} />
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
                    <button className=' btn btn-primary'><FormattedMessage id='auth.login.header' /></button>
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