import axios from 'axios';

export default function fetchResources() {
    const END_POINT = 'http://192.168.2.252:3000/api/';
    const RESOURCE = 'FacilityResources?filter[where][facility_id]=23';
    
    const URL = `${END_POINT}${RESOURCE}`;
    const request = axios.get(URL);
    // Promise.all([requestFacilityDetails]).then(values =>{
    //    const FacilityId = values[0].id;
    //    const END_POINT = 'http://192.168.2.252:3000/api/';
    //    const RESOURCE = 'FacilityResources?filter[where]facility_id='+FacilityId;
       
    //    const URL = `${END_POINT}${RESOURCE}`;       
    //    const request = axios.get(URL);

       
       
    // });
    return {
        type: 'FETCH_RESOURCE',
        payload: request
    };
    
}
