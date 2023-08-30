let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  //When page loads make a GET request to fetch all key objects
  const toyCollection = document.getElementById("toy-collection")
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(data => data.forEach(toys => createCard(toys)))

  //with response data, make a <div class = "card"> for each toy
  //add h2, img src, p, and button 
  function createCard(toys){
    const div = document.createElement("div")
    div.className = "card"
      let h2 = document.createElement("h2")
      h2.innerText = toys.name
      const img = document.createElement("img")
      img.src = toys.image
      img.className = "toy-avatar"
      const p = document.createElement("p")
      p.innerText = `${toys.likes} likes`
      let btn = document.createElement("button")
      btn.className = "like-btn"
      btn.id = toys.id
      btn.innerText = "Like"
      btn.addEventListener("click", () => {
        toys.likes += 1
        div.querySelector("p").innerText = `${toys.likes} likes`
        updateToy(toys)
      })
      div.append(h2, img, p, btn)

    toyCollection.appendChild(div)
  }

//   //Add a new Toy
//   //A POST request should be sent to http://localhost:3000/toys the new toy added to Andy's Toy Collection.
//   //If the post is successful, the toy should be added to the DOM without reloading the page.
  document.getElementsByClassName("add-toy-form")[0].addEventListener("submit", (e) => {
    e.preventDefault()
    let toyObject = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0,
    }
    createCard(toyObject)
    addNewToy(toyObject)
  })

  function addNewToy(toyObject){
    fetch("http://localhost:3000/toys",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toyObject)
    })
    .then(res => res.json())
    .then(toy => toy)
  }

  function updateToy(toyObject){
    fetch(`http://localhost:3000/toys/${toyObject.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toyObject)
      })
      .then(res => res.json())
      .then(toy => toy)
    }
  })

  //A patch request should be sent to the server, updating the number of likes that the specific toy has
  //If patch is successful, the toy's like count is updated in the DOM without reloading the page
  //capture that toy's id,
  
  //calculate the new number of likes,
  //submit the patch request, and
  //update the toy's card in the DOM based on the Response returned by the fetch request.



//  function handleSubmit(e){
//     e.preventDefault()
//     let toyObject = {
//       name: e.target.name.value,
//       image: e.target.image.value
//     }
//  }



