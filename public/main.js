const update = document.querySelector("#update-button");

update.addEventListener("click", (_) => {
  fetch("/countries", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "England",
      quote: "English speaking people like the Queen",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      console.log(response);
    });
});
