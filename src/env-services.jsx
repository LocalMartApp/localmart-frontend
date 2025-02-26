
const storedToken = localStorage.getItem('authToken');
const tokenObject = storedToken ? JSON.parse(storedToken) : null;
const token = tokenObject ? tokenObject.token : null;



const config = {
    api: "http://13.234.223.21:8080/",
    // api: "http://localhost:8142/api/v1/",
    options: {
      headers: {
        "content-type": "application/json"
      },
    },
  };

  
  const hostUrl = "http://13.234.223.21:8080";


  const handleResponse = (response) => {
    if (response.status == 200 || response.status == 201) {
      return response.json();
    } else {
      throw Error(response.json() | "error");
    }
  };


  export { config, hostUrl, handleResponse };
  