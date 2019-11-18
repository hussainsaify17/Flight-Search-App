import { API_URL } from '../Constants';

export function GetFlightData(){
    return fetch(API_URL).then(res => {
        if(res.ok){
            return res.json()
        }
        else{
            throw new Error('Failed to fetch flight info');
        }
    })
}