import axios from "axios";

export default function login(data, navigate) {
  axios
    .post("https://task-manage-app.glitch.me/auth/login", data)
    .then((response) => {
      if (response.data.success) {
        sessionStorage.setItem("token", response.data.token);
        // navigate("/", { replace: true });
        navigate("/owned-tasks", { replace: true });
      }
    });
}
