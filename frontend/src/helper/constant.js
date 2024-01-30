export const serviceList = [
  {
    serviceName: "Development",
    subService: "minivan",
  },
  {
    serviceName: "Design & Production",
    subService: [
      {
        subServiceName: "Mobile App Development",
      },
      {
        subServiceName: "Software Development",
      },
      {
        subServiceName: "Web Development",
      },
    ],
  },
  {
    serviceName: "Advertising",
    subService: [
      {
        subServiceName: "Mobile App Development",
      },
      {
        subServiceName: "Software Development",
      },
      {
        subServiceName: "Web Development",
      },
    ],
  },
  {
    serviceName: "Business Services",
    subService: [
      {
        subServiceName: "Mobile App Development",
      },
      {
        subServiceName: "Software Development",
      },
      {
        subServiceName: "Web Development",
      },
    ],
  },
  {
    serviceName: "IT Services",
    subService: [
      {
        subServiceName: "Mobile App Development",
      },
      {
        subServiceName: "Software Development",
      },
      {
        subServiceName: "Web Development",
      },
    ],
  },
  {
    serviceName: "purple",
    subService: [
      {
        subServiceName: "Mobile App Development",
      },
      {
        subServiceName: "Software Development",
      },
      {
        subServiceName: "Web Development",
      },
    ],
  },
];

export const subServiceAPI = "http://localhost:5555/service/listSubServices";
export const locationAPI = "http://localhost:5555/location/getCity";
export const countryAPI = "http://localhost:5555/location/getCountry";
export const getServicesAPI = "http://localhost:5555/service/listServices";
export const companyProfilesAPI = "http://localhost:5555/profile";
export const serviceEnquiryAPI = "http://localhost:5555/user/sendemail";
export const locationListItem = [
  { name: "Delhi, India" },
  { label: "Noida, India" },
  { label: "Ghaziabad, India" },
  { label: "Gurugram, India" },
];

export const servicesListItem = [
  { label: "Web Development" },
  { label: "App Development" },
];

export const defaultPageSize = 5;
