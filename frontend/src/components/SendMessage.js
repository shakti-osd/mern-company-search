import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import PermPhoneMsgIcon from "@mui/icons-material/PermPhoneMsg";
import Rating from "@mui/material/Rating";
import { useAuth } from "./../context/AuthContext";
import { serviceEnquiryAPI } from "../helper/constant";
import { Alert, FormHelperText } from "@mui/material";
import { EMAIL_REGX, NAME_REGEX, PHONE_NUMBER_REGEX } from "../constants";
import { getLocalData, setLocalData } from "../utils";

export default function SendMessage({
  openLogin,
  closeSendMessageHandler,
  contactCompany,
  contactEmail,
  contactServices,
  companyId,
}) {
  const { user } = useAuth();
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sendEmailResponse, setSendEmailResponse] = useState(null);
  const [sendEmailError, setSendEmailError] = useState(null);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState({
    emailError: null,
    nameError: null,
    serviceError: null,
    messageError: null,
    phoneError: null,
  });
  const [name, setName] = useState("");

  const { emailError, nameError, serviceError, messageError, phoneError } =
    error;

  const handleChange = (e) => {
    const { value } = e.target;
    setSubject(value);
    validateSubject(value);
  };
  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    validateEmail(value);
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    setName(value);
    validateName(value);
  };

  const handleMessageChange = (e) => {
    const { value } = e.target;
    setMessage(value);
    validateMessage(value);
  };

  const handlePhoneNumber = (e) => {
    const { value } = e.target;
    setPhone(value);
    validatePhone(value);
  };

  const validateName = (value) => {
    const name = value;
    let flag = true;
    if (user.name) {
      return true;
    }
    if (!name.trim()) {
      flag = false;
      setError((prevError) => ({
        ...prevError,
        nameError: "Please fill your name",
      }));
    } else if (!NAME_REGEX.test(name)) {
      flag = false;
      setError((prevError) => ({
        ...prevError,
        nameError: "Please enter a valid name",
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        nameError: null,
      }));
    }
    return flag;
  };

  const validatePhone = (value) => {
    let flag = true;
    const phone = value;
    if (user.phone) {
      return true;
    }
    if (!phone.trim()) {
      flag = false;
      setError((prevError) => ({
        ...prevError,
        phoneError: "Please fill your phone number",
      }));
    } else if (!PHONE_NUMBER_REGEX.test(phone)) {
      flag = false;
      setError((prevError) => ({
        ...prevError,
        phoneError: "Please enter a valid phone number",
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        phoneError: null,
      }));
    }
    return flag;
  };

  const validateSubject = (value) => {
    let flag = true;
    const subject = value;
    if (!subject.trim()) {
      flag = false;
      setError((prevError) => ({
        ...prevError,
        serviceError: "Please select a service",
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        serviceError: null,
      }));
    }
    return flag;
  };

  const validateEmail = (value) => {
    let flag = true;
    const email = value;
    if (user.email) {
      return true;
    }
    if (!email.trim()) {
      flag = false;
      setError((prevError) => ({
        ...prevError,
        emailError: "Please fill your email",
      }));
    } else if (!EMAIL_REGX.test(email)) {
      flag = false;
      setError((prevError) => ({
        ...prevError,
        emailError: "Please enter a valid email",
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        emailError: null,
      }));
    }
    return flag;
  };

  const validateMessage = (value) => {
    let flag = true;
    const message = value;
    if (!message.trim()) {
      flag = false;
      setError((prevError) => ({
        ...prevError,
        messageError: "Please fill your message",
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        messageError: null,
      }));
    }
    return flag;
  };

  const validateForm = () => {
    setError({});
    const nameValidation = validateName(name);
    const emailValidation = validateEmail(email);
    const phoneValidation = validatePhone(phone);
    const subjectValidation = validateSubject(subject);
    const messageValidation = validateMessage(message);
    const hasError =
      nameValidation &&
      emailValidation &&
      phoneValidation &&
      subjectValidation &&
      messageValidation;

    if (!hasError) {
      setSendEmailResponse(null);
    }

    return hasError;
  };

  const submitHandler = async () => {
    setSendEmailResponse(null);
    setSendEmailError(null);
    let timeout;
    try {
      if (validateForm()) {
        const checkAlreadyApplied = getLocalData(companyId);
        if (checkAlreadyApplied) {
          setSendEmailError("Application already applied");
        } else {
          const reply_to = email || user.email;
          const userName = name || user.displayName;

          const data = {
            send_to: contactEmail,
            reply_to,
            service: subject,
            message,
            name: userName,
            phone,
            companyId,
            userId: user.userId,
          };

          const response = await axios.post(serviceEnquiryAPI, data);
          setSendEmailResponse(response.data);

          setLocalData(companyId, data);
          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
          setSubject("");
        }
      }
    } catch (error) {
      setSendEmailError("Error in Sending Email!");
      timeout = setTimeout(() => {
        setSendEmailError(null);
      }, 10000);
    }

    return () => {
      clearTimeout(timeout);
    };
  };

  useEffect(() => {
    if (!openLogin) {
      setSendEmailError(null);
      setSendEmailResponse(null);
    }
  }, [openLogin]);

  return (
    <Modal
      open={openLogin}
      onClose={closeSendMessageHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="from-container">
        <p id="modal-modal-title" className="signInHeader">
          <PermPhoneMsgIcon /> Send a message to.
        </p>
        <p className="sendMessageCompanyName">{contactCompany}</p>

        <p className="sendMessageRating">
          5.0
          <Rating
            style={{ margin: "0px 10px" }}
            name="read-only"
            value="5"
            readOnly
          />
          <span>51 reviews</span>
        </p>
        {sendEmailResponse && (
          <Box sx={{ marginTop: "16px", marginBottom: "16px" }}>
            <Alert severity="success">{sendEmailResponse.message}</Alert>
          </Box>
        )}
        {sendEmailError && (
          <Box sx={{ marginTop: "16px", marginBottom: "16px" }}>
            <Alert severity="error">{sendEmailError}</Alert>
          </Box>
        )}
        {/* <Divider variant="fullWidth" /> */}
        <FormControl sx={{ width: "100%" }}>
          {user.id ? (
            <TextField
              className="outlined-basic"
              label={user.displayName}
              variant="outlined"
              disabled
            />
          ) : (
            <TextField
              className="outlined-basic"
              label="Your Name"
              variant="outlined"
              value={name}
              error={!!nameError}
              helperText={nameError}
              onChange={handleNameChange}
            />
          )}
          <hr />
          {user.email ? (
            <TextField
              className="outlined-basic"
              label={user.email}
              variant="outlined"
              disabled
            />
          ) : (
            <TextField
              className="outlined-basic"
              value={email}
              onChange={handleEmailChange}
              label="Your Email"
              variant="outlined"
              error={!!emailError}
              helperText={emailError}
            />
          )}
          <hr />
          {user.phone ? (
            <TextField
              className="outlined-basic"
              label={user.phone}
              variant="outlined"
              disabled
            />
          ) : (
            <TextField
              className="outlined-basic"
              value={phone}
              onChange={handlePhoneNumber}
              label="Your Phone Number"
              variant="outlined"
              error={!!phoneError}
              helperText={phoneError}
            />
          )}

          <hr />
          <Select
            labelId="demo-multiple-name-label"
            value={subject}
            id="demo-multiple-name"
            input={<OutlinedInput label="Services" helperText={serviceError} />}
            onChange={handleChange}
            label="Service"
            error={!!serviceError}
          >
            {contactServices?.map((service) => (
              <MenuItem
                key={service.subServiceName}
                value={service.subServiceName}
              >
                {service.subServiceName}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error>{serviceError}</FormHelperText>
        </FormControl>
        {/* <p className="sendMessageSubject">Message</p> */}
        <TextField
          placeholder="Write your enquiry here"
          multiline
          rows={2}
          sx={{ width: "100%", marginTop: "16px" }}
          value={message}
          onChange={handleMessageChange}
          error={!!messageError}
          helperText={messageError}
          label="Message"
        />
        <Button
          variant="contained"
          sx={{ marginTop: "16px", padding: "15px 20px" }}
          onClick={submitHandler}
        >
          Send message
        </Button>
      </Box>
    </Modal>
  );
}
