import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '@/api/auth.api';
import { useAuthStore } from '@/store/authStore';
import { useAlert } from './useAlert';
import type { LoginProps } from '@/pages/Login';
import type { SignupProps } from '@/pages/Signup';
import type { ResetPasswordProps } from '@/pages/ResetPassword';

export const useAuth = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const { isLoggedIn, storeLogin, storeLogout } = useAuthStore();

  const [resetRequested, setResetRequested] = useState(false);

  const userLogin = (data: LoginProps) => {
    authAPI.login(data).then(
      (res) => {
        // 상태 변화
        storeLogin(res.token);

        showAlert('로그인에 성공했습니다.');
        navigate('/');
      },
      (error) => {
        showAlert('로그인이 실패했습니다.');
      }
    );
  };

  const userSignup = (data: SignupProps) => {
    authAPI.signup(data).then(() => {
      showAlert('회원가입이 완료되었습니다.');
      navigate('/login');
    });
  };

  const userResetPassword = (data: ResetPasswordProps) => {
    authAPI.resetPassword(data).then(() => {
      showAlert('비밀번호가 초기화되었습니다.');
      navigate('/login');
    });
  };

  const userResetRequest = (data: ResetPasswordProps) => {
    authAPI
      .resetRequest({ email: data.email })
      .then(() => setResetRequested(true));
  };

  return {
    userLogin,
    userSignup,
    userResetPassword,
    userResetRequest,
    resetRequested,
    isLoggedIn,
    storeLogout,
  };
};
