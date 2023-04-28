import api from '@api/api';
import { toast } from 'react-toastify';



export const postAdress = async ({ adress, adress_type, verified_adress, title, image, phone_number, location, id }: 
        { adress: string, adress_type: string, verified_adress: boolean, title: string, image: string | any, phone_number: string, location: string | undefined, id: number }) => {

        try {
          const response = await api.post(`/account/${id}/add_adress/`, { adress, adress_type, verified_adress, title, image, phone_number, location }, 
          {headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,},
          })
            toast.success("Успешно отпрвлен");
            return response.data
        } catch (error) { 
          toast.error("Ошибка при отправление данных!");  
    }
}
