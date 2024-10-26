import axios from "axios";

export default function login(data, navigate, setAuthError) {
  axios
    .post("https://task-manage-app.glitch.me/auth/login", data)
    .then((response) => {
      if (response.data.success) {
        sessionStorage.setItem("token", response.data.token);
        // navigate("/", { replace: true });
        location.reload();
        navigate("/board", { replace: true });
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        setAuthError("Unauthorized: Invalid email or password"); // Display unauthorized error
      } else {
        setAuthError("Login failed"); // Display a general error message
      }
    });
}
