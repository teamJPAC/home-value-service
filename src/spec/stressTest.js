import http from "k6/http";

export let options = {
  duration: "30s",
  vus: 200,
}

export default function () {
  http.get("http://localhost:8081/10");
}
