import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const api = 'https://enactusanimals.com/';
// const headers = {
//     headers: { 'Content-Type': 'multipart/form-data' }
// };


export const changeDesc = createAsyncThunk(
  'desc/changeDesc',
  async ({ about_user, id }: { about_user: string, id: number }) => {
    try {
        const response = await axios.patch(`${api}${id}/`, { about_user });
        return response.data;
    } catch (error) {
        console.log(error);
        
    }
  }
);


export const changeName = createAsyncThunk(
    'name/changeName',
    async ({ first_name, last_name, id }: { first_name: string, last_name: string, id: number }) => {
      try {
        const response = await axios.patch(`${api}${id}/`, { first_name, last_name });
        return response.data;
      } catch (error) {
        console.log(error);
        
      }
    }
  );

  export const changePassword = createAsyncThunk(
    'password/changePassword',
    async ({ old_password, new_password, new_password_confirm }: { old_password: string, new_password: string, new_password_confirm: string }) => {
      try {
        const data = new FormData();
        data.append(old_password, 'old_password');
        data.append(new_password, 'new_password');
        data.append(new_password_confirm, 'new_password_confirm');

        const response = await axios.post(`${api}change_password/`, data);
        return response.data;
      } catch (error) {
        console.log(error);      
      }
    }
  );