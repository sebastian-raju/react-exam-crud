import React, { useEffect, useState } from 'react'
import { deleteAppointmentsApi, editAppointmentApi, getSingleAppointmentsApi } from '../services/allApi';


function AppointmentCard({appointment, index, getAppointments}) {

  const {id, name, reason, date} = appointment;
  const [singleAppointment, setSingleAppointment] = useState({});
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    var today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementsByName("date")[0];
    if (dateInput) {
      dateInput.setAttribute('min', today);
    }
  }, [isActive]); 


  // getting single appointment data
  const getSingleAppointment = async () => {
    const response = await getSingleAppointmentsApi(id);
    if(response.status>=200 && response.status<300){
      setSingleAppointment(response?.data);
      setIsActive(prev => prev = true)
    }
  }

  // changing appointment data 
  const editInputData = (e) => {
    const {name, value} = e.target;
    setSingleAppointment({
      ...singleAppointment, [name]:value
    })
  }

  // editing the existing appointment
  const editAppointment = async() =>{
    const {name, reason, date} = singleAppointment;
    if(name === "" || reason === "" || date === ""){
      return alert("please fill all the fields");
    }
    const response = await editAppointmentApi(id, singleAppointment);
    if(response.status>=200 && response.status<300){
      alert('appointment edited successfully');
      setIsActive(prev => prev = false);
      getAppointments();
    }
    else{
      alert('appointment updation failed');
    }
  }


  // delete single appointment 
  const deleteAppointment = async () => {
    const response = await deleteAppointmentsApi(id);
    if(response.status>=200 && response.status<300){
      getAppointments();
    }
  }
  


  return (
    <>
      <div className="grid grid-cols-12 items-center bg-slate-50 px-4 py-2">
          <div className="col-span-1">{index + 1}</div>
          <div className="col-span-3">{name}</div>
          <div className="col-span-4">{reason}</div>
          <div className="col-span-2">{date}</div>
          <div className="col-span-2 flex gap-3">
            <div className='flex-1 bg-red-800 text-white py-3 rounded-lg flex justify-center cursor-pointer'  onClick={()=>{
              getSingleAppointment();
            }
          }>Edit</div>
            <div className='flex-1 bg-slate-700 text-white py-3 rounded-lg flex justify-center cursor-pointer' onClick={deleteAppointment}>Delete</div>
          </div>
        </div>


        {/* edit-modal */}
      {isActive && <div className="add-modal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 rounded-lg bg-white shadow-2xl flex flex-col gap-4">
        <input type="text" name="name" id="" value={singleAppointment?.name} placeholder='Patient name...' className='w-[400px] py-3 rounded-lg border-2 px-3 outline-none' onChange={(e)=>{editInputData(e)}} />
        <input type="text" name="reason" id="" value={singleAppointment?.reason} placeholder='Reason..' className='w-[400px] py-3 rounded-lg border-2 px-3 outline-none' onChange={(e)=>{editInputData(e)}}/>
        <input type="date" name="date" id="" value={singleAppointment?.date} placeholder='Select a date' className='w-[400px] py-3 rounded-lg border-2 px-3 outline-none cursor-pointer' onChange={(e)=>{editInputData(e)}} />
        <div className="button-container flex gap-3">
          <button className='flex-1 bg-red-800 text-white rounded-lg py-3' onClick={editAppointment}>Edit</button>
          <button className='flex-1 bg-slate-100 text-black rounded-lg py-3' onClick={()=>{setIsActive(prev => prev = false)}}>Cancel</button>
        </div>
      </div>}
    </>
  )
}

export default AppointmentCard
