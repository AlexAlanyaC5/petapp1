document.addEventListener("DOMContentLoaded", function(e){
  let mainContainer = document.querySelector('main')

  mainContainer.innerHTML =`<form>
    <input type="text" name="name" placeholder="Name">
    <input type="email" name="email" placeholder="Email">
    <input type="tel" name="phone" placeholder="Phone"
       pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
       required>
    <input type="number" name="age" placeholder="Age">
    <input type="text" name="gender" placeholder="Gender">
    <input type="text" name="name" placeholder="Pet Name">
    <input type="text" name="breed" placeholder="Breed">
    <input type="number" name="age" placeholder="Age">
    <input type="text" name="gender" placeholder="Pet Gender">
    <input type="submit"/>
    </form>`
// This place on the page then we are telling it to addEventListener.
// For eventlistener we need to know the type of event and what should happen.
//Event(e) prevents the default behavior
  mainContainer.addEventListener("submit", function(e){
    e.preventDefault()
    const data = {name: e.target[0].value, email: e.target[1].value, phone: e.target[2].value,
  age: e.target[3].value, gender: e.target[4].value, petName: e.target[5].value,
  breed: e.target[6].value, petAge: e.target[7].value, petGender: e.target[8].value}

    fetch('http://localhost:3000/users', {
      method:'POST',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(res => {
      return fetch('http://localhost:3000/posts')
    })
    .then(res => res.json())
    .then(data => {
      data.forEach(function(data){
      mainContainer.innerHTML += `${data.content}`

      })
      //console.log(data)
    })

  })
})
