import axios from "axios";

export default async function registerRequest(data, navigate, setAuthError) {
  try {
    const response = await axios.post(
      "https://task-manage-app.glitch.me/auth/register",
      data
    );
    if (response.data.success) {
      sessionStorage.setItem("token", response.data.token);
      // navigate("/", { replace: true });
      navigate("/owned-tasks", { replace: true });
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      setAuthError("Unauthorized: Email Already In Use!"); // Display unauthorized error
    } else {
      setAuthError("Regisration failed"); // Display a general error message
    }
  }
}
