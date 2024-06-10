import React, { useEffect, useState } from 'react'
import AppointmentCard from '../components/AppointmentCard'
import { createAppointmentApi, getAllAppointmentsApi } from '../services/allApi';

function Home() {

  const [isActive, setIsActive] = useState(false);
  const [addInput, setAddInput] = useState({
    name:"",
    reason:"",
    date:""
  })
  const [appointmentList, setAppointmentList] = useState([]);

    // getting all appointments
    const getAppointments = async() => {
      const response = await getAllAppointmentsApi();
      if(response.status>=200 && response.status<300){
        const filteredList = response?.data.sort((a,b)=> new Date(a.date) - new Date(b.date));
        setAppointmentList(filteredList);
      }
    }
  
    useEffect(()=>{
      getAppointments();
    },[])

  // restricting past dates
  useEffect(() => {
    var today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementsByName("date")[0];
    if (dateInput) {
      dateInput.setAttribute('min', today);
    }
  }, [isActive]); 


  // getting add-modal input
  const getInputfromModal = (e) =>{
    const {name, value} = e.target;
    setAddInput({
      ...addInput, [name]:value
    })
  } 

  // creating new appointment
  const createAppointment = async() => {
    const {name, reason, date} = addInput
    if(name === "" || reason === "" || date === ""){
      return alert("please fill all the fields");
    }
    const response = await createAppointmentApi(addInput);
    if(response.status >=200 && response.status<300){
      alert("new appointment created");
      setIsActive(prev => prev = false)
            setAddInput({
              name:"",
              reason:"",
              date:""
            })
            getAppointments();
    }
    else{
      alert('appointment creation failed')
    }
  }


  return (
    <>
      <div className='px-9 mt-6 flex justify-between items-center'>
        <div className='text-[22px] font-semibold'>Appointment Details</div>
        <button className='py-3 px-4 font-semibold bg-green-700 text-white text-[15px] rounded-lg' onClick={()=>{setIsActive(prev => prev = true)}}>Add Appointments</button>
      </div>
      <div className='px-9 mt-[40px]'>
        <div className="grid grid-cols-12 items-center bg-slate-100 px-4 py-2">
          <div className="col-span-1">No</div>
          <div className="col-span-3">Name</div>
          <div className="col-span-4">Reason</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Action</div>
        </div>

        {
          appointmentList.length>0 ? 
          (appointmentList.map((appointment, index) => <AppointmentCard key={appointment.id} appointment={appointment} index={index} getAppointments={getAppointments}/>))
          :
          (<div>Loading....</div>)
        }
        
       

      </div>


      {/* add-modal */}
      {isActive && <div className="add-modal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 rounded-lg bg-white shadow-2xl flex flex-col gap-4">
        <input type="text" name="name" id="" placeholder='Patient name...' className='w-[400px] py-3 rounded-lg border-2 px-3 outline-none' onChange={(e)=>{getInputfromModal(e)}}/>
        <input type="text" name="reason" id="" placeholder='Reason..' className='w-[400px] py-3 rounded-lg border-2 px-3 outline-none' onChange={(e)=>{getInputfromModal(e)}} />
        <input type="date" name="date" id="" placeholder='Select a date' className='w-[400px] py-3 rounded-lg border-2 px-3 cursor-pointer outline-none' onChange={(e)=>{getInputfromModal(e)}} />
        <div className="button-container flex gap-3">
          <button className='flex-1 bg-green-800 text-white rounded-lg py-3' onClick={createAppointment}>Add</button>
          <button className='flex-1 bg-slate-100 text-black rounded-lg py-3' onClick={()=>{
            setIsActive(prev => prev = false)
            setAddInput({
              name:"",
              reason:"",
              date:""
            })}
            }>Cancel</button>
        </div>
      </div>}

    </>
  )
}

export default Home
