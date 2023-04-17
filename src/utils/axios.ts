// THIRD-PARTY
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYTk2MmZlZjY2ZWEwMDc0NzMzY2FiM2FiZGQwZDhlZjk1ZGY2ZDRiMTBhZjZhMTE4ZTYxNzgwNjE5NzI5MmIyMjg2NmU4ZGViOWNmZjc1NTgiLCJpYXQiOjE2NDkyMjc0OTIuMjcyMDIsIm5iZiI6MTY0OTIyNzQ5Mi4yNzIwMjQsImV4cCI6MTY4MDc2MzQ5Mi4yNjk4MzIsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.ciWSxwr8ADrhrRu0fpxrJWN_pJeTUuN-QHjznHUxn3e-Efs4tyvHMbvdKSJNmqPIyZbvNEcI8b5h1Q-bmyJCvvg47LZkemp6QidfO1L-KLDIcCbka3yz20L94QWddRwKF20s88clr_Pj5zRV6-tkBFnimfQ_R_tUzuS4PsGOIBLOnr7O8az-_cVDAD34LcRUf_q_3ugAq9xpVnnWBuNGKeuIUISkgGcDf2jry39kOpBtDL8Jsg-kLNIlklJEXNLtVFxDOtR9jLJWtrNC33QkZb6kUfFdoD_W-wSIsooiQaYHdFGoDS9UhIpWXOwHixtBmyCpnFKjafh8096UIKmYbmxSNkbyc7mU0qaAUGkRqOzVTxFq_fXgNA_Sr1ePplYj4Zc2Ej8S3hOzCPuYFUdE1qhghPiq0xPAmCbE2oQvklfyWM4RrICvdbD1y-KQ3S9tGAyDxM2cc-zbPBL9QbUQ4VyTPcTtHzKIvrTDNL0STPL244DS48b9a_TDDlhUYlRuMFnz56a9T3QCownNohXIM6ZQeTavXjpBkci2sl2cbtvUPqzEyMifaojkawjePz5UHhnkLs9zAmI1i8qTBHcZLwJg4MPaDF3KygxR4uAt232xnNZkN5_A5Pe97ZhdWX_mufK59T5_yF_f3I5qqKRKI7ec0dd1dgB0sR9Hi4_RG1w';
const axiosServices = axios.create({
  baseURL: BASE_URL
});

// interceptor for http
axiosServices.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);
export default axiosServices;
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` }
});
