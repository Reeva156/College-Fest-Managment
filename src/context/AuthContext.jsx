import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMe, logout as reduxLogout, loginUser, registerUser, checkAdminSetup } from '../store/authSlice';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const { user, token, loading, hasAdmin, checkingSetup } = useSelector((state) => state.auth);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  useEffect(() => {
    dispatch(checkAdminSetup());
    if (token) {
      dispatch(fetchMe());
    }
  }, [dispatch, token]);

  const login = async (credentials) => {
    const res = await dispatch(loginUser(credentials));
    if (res.error) {
      showToast(res.payload || 'Login failed', 'error');
      throw new Error(res.payload);
    }
    showToast(`Welcome back, ${res.payload.user.name}!`);
    return res.payload.user;
  };

  const register = async (userData) => {
    const res = await dispatch(registerUser(userData));
    if (res.error) {
      showToast(res.payload || 'Registration failed', 'error');
      throw new Error(res.payload);
    }
    showToast('Registration successful! Welcome to PULSE 2026.');
    return res.payload.user;
  };

  const logout = () => {
    dispatch(reduxLogout());
    showToast('Signed out successfully.', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        hasAdmin,
        checkingSetup,
        login,
        register,
        logout,
        toast,
        showToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
