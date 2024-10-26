import axios from "axios";

export default async function login(data, navigate, setAuthError) {
 await axios
    .post("https://task-manage-app.glitch.me/auth/login", data)
    .then((response) => {
      if (response.data.success) {
        sessionStorage.setItem("token", response.data.token);
        // navigate("/", { replace: true });
        navigate("/owned-tasks", { replace: true });
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
