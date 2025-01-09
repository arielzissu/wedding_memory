import axios from 'axios';

export const request = async ({ url, uri, method, ...rest }: any) => {
  try {
    const response = await axios({
      method: method || 'GET',
      url: url || `${process.env.REACT_APP_PROXY_URL}/api${uri}`,
      ...rest
    });

    return response.data;
  } catch (error) {
    console.error('Error in request:', error);
    throw error;
  }
};
