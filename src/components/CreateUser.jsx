import React, { useState } from "react";
import CustomInput from "./common/input/CustomInput";
import CustomButton from "./common/button/CustomButton";
import { setUser } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import CustomLoader from "./common/Loader/CustonLoader";
import { useNavigate } from "react-router-dom";


export default function CreateUser() {
  const user = useSelector((state) => state.user?.currentUser);
  const [fullName, setFullName] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setUser(fullName));
    setisLoading(true);
    setTimeout(() => {
      setisLoading(false);
    
      navigate('/menupage')
    }, 1500);
  };

  const continueOrderingClick = () =>{
    navigate('/menupage')
  }

  return (
    <>
      {isLoading && <CustomLoader />}
      {user ? (
        <CustomButton onClick={continueOrderingClick}>Continue ordering <h1>{user}</h1></CustomButton>
      ) : (
        <div>
          <CustomInput
            id="name"
            name="name"
            placeholder="Your full name"
            variant="search-name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          {fullName ? (
            <CustomButton onClick={handleClick}>Start ordering</CustomButton>
          ) : (
            " "
          )}
        </div>
      )}
    </>
  );
}
