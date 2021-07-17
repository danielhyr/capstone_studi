import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import * as api from '../api';

export const getConversations = (id) => async (dispatch) => {
    try {
        const { data } = await api.fetchConvos(id);
        console.log(data)
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message)
    }
}