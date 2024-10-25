import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function registerRequest(data, navigate) {
  axios
    .post("https://task-manage-app.glitch.me/auth/register", data)
    .then((response) => {
      if (response.data.success) {
        sessionStorage.setItem("token", response.data.token);
        // navigate("/", { replace: true });
        navigate("/owned-tasks", { replace: true });
      }
    });
}
