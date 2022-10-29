import axios from 'axios';
import requestConfig from "../../../../config/requestConfig";

export function getPlans(params)
{
    const request = axios.get(requestConfig.baseUrl+"/admin/plans/", {params});
    return (dispatch) =>
        request.then((response) => {
            dispatch({
                type   : "GET_PLANS",
                payload: response.data,
            })
        }
        );
}