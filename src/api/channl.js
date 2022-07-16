import request from "@/utils/request";
export const getUserChannels = () =>
  request({
    method: "GET",
    url: "/v1_0/user/channels",
  });

export const fetchAllChannels = () =>
  request({
    method: "GET",
    url: "/v1_0/channels",
  });
export const fetchaddChannels = (channel) => {
  return request({
    method: "PATCH",
    url: "/v1_0/user/channels",
    data: {
      channels: [channel],
    },
  });
};
export const deletUserChannel = (channelId) =>
  request({
    method: "DELETE",
    url: `/v1_0/user/channels/${channelId}`,
  });
