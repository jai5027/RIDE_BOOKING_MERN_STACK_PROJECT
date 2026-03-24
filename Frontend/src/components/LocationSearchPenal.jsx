import React from 'react'

const LocationSearchPenal = (props) => {
const locations = [
  "MI Road, near Panch Batti Circle, Jaipur, Rajasthan 302001, India",
  "Malviya Nagar, Sector 3, near WTP Mall, Jaipur, Rajasthan 302017, India",
  "Vaishali Nagar, near Amrapali Circle, Jaipur, Rajasthan 302021, India",
  "Mansarovar, near VT Road, Jaipur, Rajasthan 302020, India",
  "C-Scheme, near Central Park, Jaipur, Rajasthan 302001, India",
  "Bapu Nagar, near JLN Marg, Jaipur, Rajasthan 302015, India",
  "Jagatpura, near Akshay Patra Temple, Jaipur, Rajasthan 302017, India",
  "Tonk Road, near Jaipur International Airport, Jaipur, Rajasthan 302029, India",
  "Ajmer Road, near Elements Mall, Jaipur, Rajasthan 302006, India",
  "Sodala, near ESI Hospital, Jaipur, Rajasthan 302006, India",
  "Vidhyadhar Nagar, near Central Spine, Jaipur, Rajasthan 302039, India",
  "Jhotwara, near Kalwar Road, Jaipur, Rajasthan 302012, India",
  "Sitapura Industrial Area, near RIICO Circle, Jaipur, Rajasthan 302022, India",
  "Gopalpura Bypass, near Triveni Nagar, Jaipur, Rajasthan 302018, India",
  "Raja Park, near Gurudwara Road, Jaipur, Rajasthan 302004, India"
];

  return (
    <div>
      {locations.map((address) => {
        return <div onClick={() => {props.setVehiclePanelOpen(true)
                                    props.setPanelOpen(false)}}     
        key={address} className='flex border-2 p-3 border-gray-50 active:border-black rounded-xl items-center justify-start gap-4 my-2'>
        <h4 className='text-2xl bg-[#eee] rounded-full flex justify-center items-center h-10 w-10 '><i className="ri-map-pin-2-line"></i></h4>
        <h4 className='font-medium'>{address}</h4>
      </div>
      })}
    </div>
  )
}

export default LocationSearchPenal
