import axios from 'axios';
import settings from '../settings';

export default function EditFacilityDependancies(id, RESOURCE, actionType) {
    const END_POINT = `${settings.hostname}/api/`;
    
    const URL = `${END_POINT}${RESOURCE}${id}`;
    const request = axios.delete(URL);
    return {
        type: actionType,
        payload: request
    };
}