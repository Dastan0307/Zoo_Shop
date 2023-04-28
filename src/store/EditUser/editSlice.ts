import axios from 'axios';
import api from '@api/api';
import { setCredentials } from '@store/features/auth/authSlice';


// export const changeName = async({ first_name, last_name, id }: { first_name: string, last_name: string, id: number }) => {
//   try {
//     // const dispatch = useTypedDispatch()
//     const response = await api.patch(`/account/${id}/`, { first_name, last_name }, {headers: {
//       Authorization: `Bearer ${localStorage.getItem('access_token')}`,},});
//       // dispatch(setCredentials(response.data))
//   } catch (error) {
//     console.log(error);     
//   }
// }

// const dispatch = useTypedDispatch()

export const changeName = async ({ first_name, last_name, id }: { first_name: string, last_name: string, id: number }) => {
        try {
          const response = await api.patch(`/account/${id}/`, { first_name, last_name }, 
          {headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,},
          })
            setCredentials(response.data)
        } catch (error) {
          console.log(error);     
    }
}
  


export const changeDesc = async ({ about_user, id }: { about_user: string, id: number }) => {
    try {
        const response = await api.patch(`/account${id}/`, { about_user },
        {headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,},
        })
        setCredentials(response.data)
    } catch (error) {
        console.log(error);
    }
}



export const changePassword = async ({ old_password, new_password, new_password_confirm }: { old_password: string, new_password: string, new_password_confirm: string }) => {
    try {
      const data = new FormData();
      data.append(old_password, 'old_password');
      data.append(new_password, 'new_password');
      data.append(new_password_confirm, 'new_password_confirm');

      const response = await api.post(`/change_password/`, data, 
      {headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,},
      })
      setCredentials(response.data)

    } catch (error) {
      console.log(error);      
    }
}
