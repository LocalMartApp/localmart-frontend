  // const handleFileChange = async (e) => {
  //   const selectedFiles = Array.from(e.target.files);
  //   const validFiles = selectedFiles.filter(file =>
  //     file.type === 'image/jpeg' || file.type === 'image/png'
  //   );

  //   if (validFiles.length < selectedFiles.length) {
  //     alert('Only JPEG and PNG files are allowed!');
  //   }

  // 
  //   const base64Photos = await Promise.all(
  //     validFiles.map(file => fileToBase64(file))
  //   );

  //   setBusinessPhotos((prevPhotos) => [...prevPhotos, ...base64Photos]);
  // };


    // const busCateOptions = [
  //   { value: 'Hospitals', label: 'Hospitals' },
  //   { value: 'Home Decors', label: 'Home Decors' },
  //   { value: 'Packers & Movers', label: 'Packers & Movers' },
  //   { value: 'Car Rental', label: 'Car Rental' },
  //   { value: 'Restaurants', label: 'Restaurants' },
  // ]


      // if (validFiles.length < selectedFiles.length) {
    //   alert('Only JPEG and PNG files under 2MB are allowed!');
    // }

    //   const businessAddValues = {
//     userName: '',
//     businessName: '',
//     businessState: '',
//     businessCity: '',
//     businessTitle: '',
//     businessCategory: '',
//     mobileNumber: '',
//     workingHours: '',
//     servicesOffer: '',
//     email: '',
//     socialMedia: '',
//     completeAddress: '',
//     landmark: '',
//     pincode: '',
//     yearlyTurnOver: '',
//     noOfEmployees: '',
//     yearOfEstablishment: '',
//     websiteAddress: '',
//     GSTNumber: '',
//     itemName: '',
//     itemType: '',
//     itemPrice: ''
// }

  // const stateOptions = [
  //   { value: 'Andhrapradesh', label: 'Andhrapradesh' },
  //   { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
  //   { value: 'Delhi', label: 'Delhi' },
  //   { value: 'Banglore', label: 'Banglore' },
  // ]

  // const cityOptions = [
  //   { value: 'Rajahmundry', label: 'Rajahmundry' },
  //   { value: 'Kakinada', label: 'Kakinada' },
  //   { value: 'Bheemavaram', label: 'Bheemavaram' },
  //   { value: 'Banglore', label: 'Banglore' },
  //   { value: 'Palakollu', label: 'Palakollu' },
  //   { value: 'Amalapuram', label: 'Amalapuram' },
  //   { value: 'Samalkot', label: 'Samalkot' },
  //   { value: 'Peddapuram', label: 'Peddapuram' },
  //   { value: 'Pithapuram', label: 'Pithapuram' },
  //   { value: 'Vizag', label: 'Vizag' },
  //   { value: 'Vizayawada', label: 'Vizayawada' },
  //   { value: 'Tuni', label: 'Tuni' },
  // ]

  // const amenities = [
  //   { value: 'Free Wifi', label: 'Free Wifi' },
  //   { value: 'Parking', label: 'Parking' },
  //   { value: 'Music', label: 'Music' },
  //   { value: 'Air Condition', label: 'Air Condition' },
  //   { value: 'Entertainement', label: 'Entertainement' },
  // ]


//   <div className="single-form-section-business business-basic-details overflow-hidden rounded-[15px] bg-white hidden">
//   <div className="basic-details-heading py-[15px] px-6 border-b border-black border-opacity-20">
//     <h4 className='text-lg font-medium text-Secondary'>Items and info</h4>
//   </div>
//   <div className="inner-fields-grid-outer-main p-6 ">
//       <div className="gray-bg-block-inner-fields-section bg-ProfileScreensBg grid grid-cols-12 gap-5 p-5 rounded-[15px]">
//         <div className="form-inputsec relative col-span-4">
//           <div className="label-section mb-1">
//             <p className='text-BusinessFormLabel'>Item Name*</p>
//           </div>
//           <Field type="text" name="itemName" placeholder='Enter Item Name' onChange={(e) => setFieldValue('itemName' , e.target.value)}
//               className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black  ${errors.itemName && touched.itemName ? 'border-red-500 border-opacity-100 bg-red-500 bg-opacity-10 placeholder:text-red-500 text-red-500' : 'text-Black border-LoginFormBorder placeholder:text-Black'}`} 
//           />                                
//         </div>
//         <div className="form-inputsec relative col-span-4">
//           <div className="label-section mb-1">
//             <p className='text-BusinessFormLabel'>Item Type*</p>
//           </div>
//           <Select options={foodItemTypes} 
//               placeholder='Select Item Type'
//               styles={{
//                   control: (baseStyles, state) => ({
//                     ...baseStyles,
//                     borderRadius: 10,
//                     paddingLeft: 8,
//                     paddingTop: 4,
//                     paddingBottom: 4,
//                     borderWidth: 1,
//                     outlineWidth: 0,
//                     borderColor: '#B3B3B3',
//                     fontSize: 16,
//                     minWidth: '100%',
//                     height: 50,
//                     boxShadow: state.isFocused ? 'none' : 'none',
//                   }),
//                 }}
//                 value={foodItemTypes.find(option => option.value === values.itemType)} 
//                 onChange={(option) => setFieldValue('itemType', option ? option.value : '')}
//             />                                                           
//         </div>
//         <div className="form-inputsec relative col-span-4">
//           <div className="label-section mb-1">
//             <p className='text-BusinessFormLabel'>Item Price*</p>
//           </div>
//           <Field type="number" name="itemPrice" placeholder='Enter Item Price Per Person*' onChange={(e) => setFieldValue('itemPrice' , e.target.value)}
//               className={`outline-none border focus:border-Secondary focus:bg-LightBlue duration-300 px-5 py-3 rounded-lg bg-white w-full text-Black border-LoginFormBorder placeholder:text-Black`} 
//           />                                
//         </div>
//         <div className="items-add-btn-sec col-span-2">
//           <button type="button" disabled={!values.itemName || !values.itemPrice || !values.itemType } className='py-3 px-6 rounded-lg bg-Secondary text-white font-semibold w-full disabled:bg-opacity-40' onClick={() => addFoodItem(values)}>Add Item</button>
//         </div>
//       </div>
//       <div className={`items-cards-looped-sec-business-form grid grid-cols-12 gap-4 ${foodItemsArray.length == 0 ? 'mt-0' : 'mt-5'}`}>
//           {foodItemsArray.map((items , index) => {
//             return (
//               <div className="single-food-item-searched bg-AddressCard rounded-[15px] p-5 relative col-span-3" key={index}>
//                 <div className="top-veg-nonveg-part flex items-center gap-x-2">
//                     <img src={items.itemType == 'Veg' ? VegIcon : NonVegIcon} className='w-[14px] h-[14px]' alt="" />
//                     <p className='text-Black'>{items.itemName}</p>
//                 </div>  
//                 <div className="bottom-price-section mt-3">
//                   <h4 className='text-Black font-medium'>₹{items.itemPrice} / <span className='text-sm opacity-50'>person</span></h4>
//                 </div>
//                 <button type="button" onClick={() => removeFoodItem(index)} className='w-6 h-6 bg-white rounded-full flex items-center justify-center absolute top-2 right-2'><i className="ri-close-large-fill text-red-500"></i></button>
//               </div>
//             )
//           })}
//       </div>
//   </div>
// </div>


