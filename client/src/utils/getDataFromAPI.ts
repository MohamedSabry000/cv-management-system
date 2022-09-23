import axios from 'axios';
import React from 'react';

export const BASE_URL = 'http://localhost:5000/api/v1';

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem('token')
  }
});
