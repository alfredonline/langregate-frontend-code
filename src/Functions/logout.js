import axios from "axios";

async function logout() {
  localStorage.clear();
  const logUserOut = await axios.post("https://api.langregate.com/api/logout")
}

export default logout