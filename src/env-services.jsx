const storedToken = localStorage.getItem("authToken");
const tokenObject = storedToken ? JSON.parse(storedToken) : null;
const token = tokenObject ? tokenObject.token : null;

const config = {
  // api: "http://13.234.223.21:8080/",
  api: "https://stage-api.localmart.app:8443/",
  // api: "http://localhost:8142/api/v1/",
  razorpay: {
    keyId: "rzp_test_1DP5mmOlF5G5ag",
    appName: "LocalMart",
    appEmail: "support@localmart.app",
    appPhone: "+91 9566454545",
  },
  options: {
    headers: {
      "content-type": "application/json",
    },
  },
};

// const hostUrl = "http://13.234.223.21:8080";
const hostUrl = "https://stage-api.localmart.app:8443";

const handleResponse = (response) => {
  if (response.status == 200 || response.status == 201) {
    return response.json();
  } else {
    throw Error(response.json() | "error");
  }
};

export { config, hostUrl, handleResponse };
