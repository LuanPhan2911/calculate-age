import './register.scss';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { fake } from '../../utils/constant';
const Register = (props) => {
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
                    />
                </div>
                <div className='from-group mb-2'>
                    <label><FormattedMessage id='auth.register.email' /></label>
                    <input
                        className='form-control'
                        type={'email'}
                        placeholder={fake.email}
                    />

                </div>
                <div className='from-group mb-2'>
                    <label><FormattedMessage id='auth.register.password' /></label>
                    <input className='form-control' type={'password'} />
                </div>
                <div className='row px-3 mb-3'>
                    <div className=' form-check col-6'>
                        <input className=' form-check-input' type={'checkbox'} />
                        <label className=' form-check-label'>
                            <FormattedMessage id='auth.register.remember' />
                        </label>
                    </div>
                    <button className=' btn btn-primary'>
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