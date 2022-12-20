const API_URL = 'http://localhost:3333'
export const API_ROUTES = {
  REGISTER: `${API_URL}/auth/register`,
  LOGIN: `${API_URL}/auth/login`,
  GET_USER: `${API_URL}/auth/me`,
  GET_ALL_DATA: `${API_URL}/contact/all`,
  PUT_EDIT_CONTACT: `${API_URL}/contact/edit`,
  POST_ADD_CONTACT: `${API_URL}/contact/add`,
  SEARCH_CONTACT: `${API_URL}/contact/search?name=`, 
}

export const APP_ROUTES = {
  REGISTER: '/register',
  LOGIN: '/login',
  CONTACTS: '/contacts',
}