import axios from 'axios';
import { config } from '../config/config';

export const sendImageForFiltering = async (imageUrl: string): Promise<any> => {
    const { image_filter_api_url, image_filter_api_key } = config.dev;
    try {
        const { data: { token } } = await axios.post(image_filter_api_url+'/auth', {api_key:image_filter_api_key});
        if (!token) return {status:false, data:'something went wrong'}
        
        const response = await axios.get(
            image_filter_api_url+'/filteredImage', 
            {
               headers: {
                   'Authorization': `Basic ${token}`,
                   'ImageUrl': imageUrl
               },
            }
        )

        if (response.status === 200) return {status: true,data: response.data}
    } catch (error) {
        return {
            status: false,
            message: "something went wrong"
        }
    }
}