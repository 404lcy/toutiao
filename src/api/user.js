import axios from "@/utils/request.js";
export const onSubmit = (data) =>
  axios({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
export const getSmsCode = (mobile) =>
  axios({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`,
  });
