import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

import Button from '@/components/Button';
import Input from '@/components/Input';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch } from '@/store';
import { setCredentials } from '@/store/reducers/auth';
import { useRegisterMutation } from '@/store/services/auth';

import styles from './Register.module.scss';
import useFormSchema from './useFormSchema';

const Register = (): JSX.Element => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const { registerSchema } = useFormSchema();
  const [register] = useRegisterMutation();
  const { t } = useTranslation('register');

  type RegisterType = z.infer<typeof registerSchema>;

  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    // formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const submitHandler = handleSubmit(async values => {
    try {
      const response = await register(values).unwrap();

      dispatch(
        setCredentials({
          user: response.user,
          token: response.token,
        }),
      );

      navigate('/');
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{t('title')}</h2>
        <p>{t('description')}</p>
      </div>
      <div className={styles.inputContainer}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input {...field} type="text" placeholder={t('name')} />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input {...field} type="email" placeholder={t('email')} />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input {...field} type="password" placeholder={t('Password')} />
          )}
        />
      </div>
      <Button onClick={submitHandler} style={{ width: '345px' }}>
        {t('register')}
      </Button>
    </div>
  );
};

export default Register;
