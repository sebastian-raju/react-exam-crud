import { BASE_URL } from "./baseUrl"
import { commonRequest } from "./commonRequest"



// getting all appointments
export const getAllAppointmentsApi = async()=> {
  return commonRequest('GET', `${BASE_URL}/appointments`, {});
}

// get single appointment
export const getSingleAppointmentsApi = async(id)=> {
  return commonRequest('GET', `${BASE_URL}/appointments/${id}`, {});
}


// creating new appointments
export const createAppointmentApi = async (data) => {
  return commonRequest('POST', `${BASE_URL}/appointments`, data);
}

// edit appointments
export const editAppointmentApi = async (id, data) => {
  return commonRequest('PATCH', `${BASE_URL}/appointments/${id}`, data);
}


// delete single appointment
export const deleteAppointmentsApi = async(id)=> {
  return commonRequest('DELETE', `${BASE_URL}/appointments/${id}`, {});
}