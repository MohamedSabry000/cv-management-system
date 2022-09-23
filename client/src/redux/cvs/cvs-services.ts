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

const createCV = async (name: string, email: string) => {
  const data = await getDataFromAPI.post('cv', { name, email });
  return data;
}

const getCvs = async () => {
  const data = await getDataFromAPI.get('cv');
  return data;
}

const createSection = async (title: string, cvId: string) => {
  const data = await getDataFromAPI.post('section', { title, cvId });
  return data;
}

const getSections = async (cvId: string) => {
  const data = await getDataFromAPI.get('section/'+cvId);
  return data;
}

const cvsService = {
  login,
  register,
  forgotPassword,
  resetPassword,
  createCV,
  getCvs,
  createSection,
  getSections,
};

export default cvsService;