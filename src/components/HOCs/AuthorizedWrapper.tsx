import useAuth from '@/hooks/useAuth';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type AuthorizedWrapperProps = {
  children?: React.ReactNode;
};

const AuthorizedWrapper = ({
  children,
}: AuthorizedWrapperProps): JSX.Element => {
  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/register');
    }
  }, [navigate, user]);

  return children as JSX.Element;
};

export default AuthorizedWrapper;
