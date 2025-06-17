import UserData from '../plugin/user_data'
import { useState, useEffect} from 'react';
import apiInstance from '../../utils/axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'







function VendorSettings() {

    const [profileData, setProfileData] = useState([])
    const [profileImage, setProfileImage] = useState('')
    const [vendorData, setVendorDdata] = useState([])
    const [vendorimage, setVendorImage] = useState('')





    const fetchProfileData =async () => {
        await apiInstance.get(`vendor/profile-update/${UserData()?.vendor_id}/`).then((res) => {
            
            setProfileData(res.data)
            setProfileImage(res.data.image)
        })
    }

    const fetchVendorData = () => {
        apiInstance.get(`vendor/shop-update/${UserData()?.vendor_id}/`).then((res) => {
            setVendorDdata(res.data)
        })
    }






    useEffect(() => {
        fetchProfileData()
        fetchVendorData()
    }, [])


    const handleInputChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value
        })
    }


    const handleFileChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.files[0]
        })
    }

    
    const formdata = new FormData()


    const handleProfileSubmit = async (e) => {
        e.preventDefault()
        
    const res = await apiInstance.get(`vendor/profile-update/${UserData()?.vendor_id}/`)
    if(profileData.image && profileData.image !== res.data.image) {
        formdata.append("image", profileData.image)
    }

    formdata.append("full_name", profileData.full_name)
    formdata.append("about", profileData.about)

    await apiInstance.patch(`vendor/profile-update/${UserData()?.vendor_id}/`, formdata, {
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
    fetchProfileData()

    Swal.fire({
        icon : 'success',
        title: "Profile Updated",

   
    },[])
    
}

  const handleShopInputChange = (event) => {
        setVendorDdata({
            ...vendorData,
            [event.target.name]: event.target.value
        })
    }

        
  const handleShopFileChange = (event) => {
        setVendorImage({
            ...vendorimage,
            [event.target.name]: event.target.files[0]
        })
    }


    const formdata2 = new FormData()

    const handleVendorSubmit = async (e) => {
        e.preventDefault()
            
    const res = await apiInstance.get(`vendor/shop-update/${UserData()?.vendor_id}/`)
    if(vendorData.image && vendorData.image !== res.data.image) {
        formdata2.append("image", vendorData.image)
    }

    formdata2.append("name", vendorData.name)
    formdata2.append("description", vendorData.description)

    await apiInstance.patch(`vendor/shop-update/${UserData()?.vendor_id}/`, formdata2, {
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })
    fetchVendorData()

    Swal.fire({
        icon : 'success',
        title: "Profile Updated",

   
    },[])
}
   
console.log(vendorData)






  return (
    <div>
        <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left h-100">
            {/* Add Sidebar Here */}

            <div className="col-md-9 col-lg-10 main mt-4">
            <div className="container">
                <div className="main-body">
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                        Profile
                    </button>
                    </li>
                    <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                        Shop
                    </button>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                    >
                    <div className="row gutters-sm shadow p-4 rounded">
                        <div className="col-md-4 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img
                                src={profileImage}
                                style={{ width: 160, height: 160, objectFit: "cover" }}
                                alt="Admin"
                                className="rounded-circle"
                                width={150}
                                />
                                <div className="mt-3">
                                <h4 className="text-dark">{profileData.fullname}</h4>
                                <p className="text-secondary mb-1">{profileData.about}</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-8">
                        <div className="card mb-3">
                            <div className="card-body">
                            <form
                                className="form-group"
                                method="POST"
                                noValidate=""
                                encType="multipart/form-data"
                                onSubmit={handleProfileSubmit}
                            >
                                <div className="row text-dark">
                                <div className="col-lg-6 mb-2">
                                    <label htmlFor="" className="mb-2">
                                    Profile Image
                                    </label>
                                    <input
                                    type="file"
                                    className="form-control"
                                    name="image"
                                    onChange = {handleFileChange}
                                    id=""
                                   
                                    />
                                </div>
                                <div className="col-lg-6 mb-2 ">
                                    <label htmlFor="" className="mb-2">
                                    Full Name
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    
                                    id=""
                                    value ={profileData.fullname}
                                    onChange = {handleInputChange}
                                    name = "fullname"
                                    />
                                </div>
                                <div className="col-lg-6 mb-2">
                                    <label htmlFor="" className="mb-2">
                                    Email
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    
                                    id=""
                                    value = {profileData?.user?.email}
                                    onChange = {handleInputChange}
                                    name ="email"
                                    />
                                </div>
                                <div className="col-lg-6 mb-2">
                                    <label htmlFor="" className="mb-2">
                                    Phone Number
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    
                                    id=""
                                    value = {profileData?.user?.mobile}
                                    onChange = {handleInputChange}
                                    name = "mobile"
                                    />
                                </div>
                                <div className="col-lg-6 mb-2">
                                    <label htmlFor="" className="mb-2">
                                    Gender
                                    </label>
                                    <select name="gender" value = "" onChange = {handleInputChange} id="" className="form-control">
                                    <option value="">Male</option>
                                    <option value="">Female</option>
                                    </select>
                                </div>
                                <div className="col-lg-12 mb-2">
                                    <label htmlFor="" className="mb-2">
                                    About Me
                                    </label>
                                    <textarea value= {profileData?.about} name="about" id="" cols="30" rows="5" className="form-control" onChange = {handleInputChange}></textarea>
                                    {/* <input
                                    type="text"
                                    className="form-control"
                                    onChange = {handleInputChange}
                                    name = "about"
                                    id=""
                                    value=  {profileData?.about}
                                    /> */}
                                </div>
                                <div className="col-lg-6 mt-4 mb-3">
                                    <button className="btn btn-success" type="submit">
                                    Update Profile <i className="fas fa-check-circle" />{" "}
                                    </button>
                                </div>
                                </div>
                            </form>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div
                    className="tab-pane fade"
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                    >
                    <div className="row gutters-sm shadow p-4 rounded">
                        <div className="col-md-4 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img
                                src={vendorData.image}
                                style={{ width: 160, height: 160, objectFit: "cover" }}
                                alt="Admin"
                                className="rounded-circle"
                                width={150}
                                />
                                <div className="mt-3">
                                <h4 className="text-dark">{vendorData.name}</h4>
                                <p className="text-secondary mb-1">{vendorData.description}</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-8">
                        <div className="card mb-3">
                            <div className="card-body">
                            <form
                                className="form-group"
                                method="POST"
                                noValidate=""
                                encType="multipart/form-data"
                                onSubmit = {handleVendorSubmit}
                                >
                                <div className="row text-dark">
                                <div className="col-lg-12 mb-2">
                                    <label htmlFor="" className="mb-2">
                                    Shop Image
                                    </label>
                                    <input
                                    type="file"
                                    className="form-control"
                                    name="image"
                                    id=""
                                    onChange = {handleShopFileChange}
                                    />
                                </div>
                                <div className="col-lg-12 mb-2 ">
                                    <label htmlFor="" className="mb-2">
                                    Full Name
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    id=""
                                    value = {vendorData.name}
                                    onChange = {handleShopInputChange}

                                    />
                                </div>
                                <div className="col-lg-6 mb-2">
                                    <label htmlFor="" className="mb-2">
                                    Email
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    id=""
                                    value = {vendorData.email}
                                    onChange = {handleShopInputChange}
                                    />
                                </div>
                                <div className="col-lg-6 mb-2">
                                    <label htmlFor="" className="mb-2">
                                    Phone Number
                                    </label>
                                    <input
                                    type="text"
                                    className="form-control"
                                    name="mobile"
                                    id=""
                                    value = {vendorData.mobile}
                                    onChange = {handleShopInputChange}
                                    />
                                </div>
                                <div className="col-lg-12 mb-2">
                                    <label htmlFor="" className="mb-2">
                                    About Me
                                    </label>
                                    <textarea value= {vendorData?.description} name="description" id="" cols="30" rows="5" className="form-control" onChange = {handleShopInputChange}></textarea>
                                    {/* <input
                                    type="text"
                                    className="form-control"
                                    
                                    name = "description"
                                    id=""
                                    value={vendorData.description}
                                    /> */}
                                </div>
                                <div className="col-lg-6mt-4 d-flex mb-3">
                                    <button className="btn btn-success" type="submit">
                                    Update Shop <i className="fas fa-check-circle" />{" "}
                                    </button>
                                    <Link to={`/vendor/shop/${vendorData.slug}/`} className="btn btn-primary ms-2" type="submit">
                                    View Shop <i className="fas fa-shop" />{" "}
                                    </Link>
                                </div>
                                </div>
                            </form>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default VendorSettings
