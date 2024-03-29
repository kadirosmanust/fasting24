import { useTypedSelector } from '@/store';
import { selectCurrentUser } from '@/store/reducers/auth';

const useAuth = () => {
  const user = useTypedSelector(selectCurrentUser);

  return { user };
};

export default useAuth;
