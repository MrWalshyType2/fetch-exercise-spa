(() => {
  let fetchOneBtn = document.querySelector("#fetchOne");
  let fetchAllBtn = document.querySelector("#fetchAll");
  let createBtn = document.querySelector("#createOne");
  let cardContainer = document.querySelector("#cardContainer");

  cardCreator = (data, i) => {
    let card = document.createElement("div");
    let cardBody = document.createElement("div");
    let uId = document.createElement("p");
    let id = document.createElement("p");
    let title = document.createElement("p");
    let body = document.createElement("body");

    if (i >= 0) {
      uId.innerText = `User ID: ${data[i].userId}`;
      id.innerText = `ID: ${data[i].id}`;
      title.innerText = `Title: ${data[i].title}`;
      body.innerText = `Body: ${data[i].body}`;
    } else {
      uId.innerText = `User ID: ${data.userId}`;
      id.innerText = `ID: ${data.id}`;
      title.innerText = `Title: ${data.title}`;
      body.innerText = `Body: ${data.body}`;
    }

    card.classList = "card my-3";
    cardBody.classList = "card-body";

    cardBody.appendChild(uId);
    cardBody.appendChild(id);
    cardBody.appendChild(title);
    cardBody.appendChild(body);
    card.appendChild(cardBody);

    return card;
  };

  emptyCardContainer = () => {
    cardContainer.innerHTML = "";
  };

  fetchAllBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    emptyCardContainer();
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject({
            status: response.status,
            statusText: response.statusText,
          });
        }
      })
      .then((data) => {
        for (let i = 0; i < 100; i++) {
          let card = cardCreator(data, i);
          cardContainer.appendChild(card);
        }
      })
      .catch((error) => {
        console.log(`Error: ${error.status}, ${error.statusText}`);
      });
  });

  fetchOneBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    emptyCardContainer();
    let id = document.querySelector("#id");
    if (id.value === "") {
      console.log("Empty input...");
      return;
    }
    fetch(`https://jsonplaceholder.typicode.com/posts/${id.value}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject({
            status: response.status,
            statusText: response.statusText,
          });
        }
      })
      .then((data) => {
        let card = cardCreator(data);
        cardContainer.appendChild(card);
      })
      .catch((error) => {
        console.log(`Error: ${error.status}, ${error.statusText}`);
      });
  });

  createBtn.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    emptyCardContainer();

    let uId = document.querySelector("#newUserId").value;
    let title = document.querySelector("#newTitle").value;
    let body = document.querySelector("#newBody").value;

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        userId: uId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject({
            status: response.status,
            statusText: response.statusText,
          });
        }
      })
      .then((data) => {
        let card = cardCreator(data);
        cardContainer.appendChild(card);
      })
      .catch((error) => {
        console.log(`Error: ${error.status}, ${error.statusText}`);
      });
  });
})(window);
