import getDataFromAPI from '../../utils/getDataFromAPI';

const login = async (email: string, password: string) => {
  const data = await getDataFromAPI.post('login', { email, password });
  return data;
}

const register = async (name: string, email: string, password: string) => {
  const data = await getDataFromAPI.post('signup', { name, email, password });
  return data;
}

const forgotPassword = async (email: string) => {
  const data = await getDataFromAPI.post('reset-password', { email });
  return data;
}

const resetPassword = async (id: string, token: string, password: string) => {
  const data = await getDataFromAPI.post(`reset-password-confirm/${id}/${token}`, { password });
  return data;
}

const cvsService = {
  login,
  register,
  forgotPassword,
  resetPassword
};

export default cvsService;