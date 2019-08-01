document.addEventListener("DOMContentLoaded", function(e){
  let mainContainer = document.querySelector('main')

// Add a form onto the mainContainer (this is for the sign-up page) where users will
// have to put their info in order to access this app.
  mainContainer.innerHTML +=`<form id="signup-form">
  <ul>
    <h2>Sign-up with HOP today!</h2>
    <p>Owner info:</p>
    <li><input type="text" name="name" placeholder="Name"></li>
    <li><input type="email" name="email" placeholder="Email"></li>
    <li><input type="tel" name="phone" placeholder="Phone"
       pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
       required></li>
    <li><input type="number" name="age" placeholder="Age"></li>
    <li><input type="text" name="gender" placeholder="Gender"></li>
    <p>Pet info:</p>
    <li><input type="text" name="name" placeholder="Pet Name"></li>
    <li><input type="text" name="breed" placeholder="Breed"></li>
    <li><input type="number" name="age" placeholder="Age"></li>
    <li><input type="text" name="gender" placeholder="Pet Gender"></li>
    <li><input type="submit"/></li>
  </ul>
    </form>`

  mainContainer.innerHTML +=`<form id="login">
  <ul>
    <h2>Log-in:</h2>
    <li><input type="text" name="email" placeholder="email"/></li>
    <li><input type="submit"/></li>
  </ul>
    </form>`



// Objective: Building out the Login Form
// 1. Having the Login form on the page (COMPLETED)
// 2. Adding an eventlistener for submit on the login form
// 3. When the user submits, we need to make a fetch request to our login route in the backend MAKE SURE TO SEND THE USER'S EMAIL
// *** e.target will tell us element (form)

    document.getElementById("login").addEventListener("submit", function(e){
      e.preventDefault()
      const signIn = {email: e.target[0].value}
      fetch('http://localhost:3000/login', {
        method:'POST',
        body: JSON.stringify(signIn),
        headers: {'content-Type': 'application/json',
        }
      })
      .then(res => res.json())
      .then(res => {
        loginAndDisplayPosts(res)

      })
    })


// This place on the page then we are telling it to addEventListener.
// For eventlistener we need to know the type of event and what should happen.
//Event(e) prevents the default behavior
  document.getElementById("signup-form").addEventListener("submit", function(e){
    e.preventDefault()
    const data = {name: e.target[0].value, email: e.target[1].value, phone: e.target[2].value,
  age: e.target[3].value, gender: e.target[4].value, petName: e.target[5].value,
  breed: e.target[6].value, petAge: e.target[7].value, petGender: e.target[8].value}
// Setting a variable called "data" to an array of values for all the user's input.
    fetch('http://localhost:3000/users', { // Make a fetch request to the url users
      method:'POST', //A method could take: GET, POST, PATCH or DELETE
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json',
      }
    })
    .then(res => res.json()) //sends a JSON response of that specific (data)
    .then(res => loginAndDisplayPosts(res))
  })

  function loginAndDisplayPosts(user){
    document.getElementById("signup-form").style.display="none"
    document.getElementById("login").style.display="none"
    localStorage.setItem("user_id", user.id)
    fetch('http://localhost:3000/posts')
    .then(res => res.json()) //sends a JSON response of that specific (data)
    .then(data => { //once first function succeeds, create a new variable called
      // postContainer and create an element "div". Set that postContainer's ID to be "postContainer"
      const postContainer = document.createElement("div")
      postContainer.id="postContainer"
      data.forEach(function(data){ // and repeat that forEach function.

      postContainer.innerHTML += `<p class="post">${data.content}<button>Reply</button></p>` // displays all the posts made by other
      // users onto the page once the user signs up. (Sort of like Newsfeed style)
      // <p> tag is what we used for the posts.
      })
      mainContainer.append(postContainer)

      const input = document.getElementById("phraseText")    // take the value of input element;
      const button = document.getElementById("sayPhrase") // take the value of button element;


      button.addEventListener("click", () => {
          // now the input variable has a value, which you can display
        fetch('http://localhost:3000/posts', { // Make a fetch request to the url/posts
          method:'POST',
          body: JSON.stringify({
            user_id:localStorage.user_id, // We need the User-id and the value(phraseText)
            content:phraseText.value // This just gets us the info we need. Next step is to display it to the page
          }),
          headers: {'content-Type': 'application/json',

          }

        })
        .then(res => res.json())
        .then(res => {
          //console.log(res) //
// First define a variable, then make a fetch request(method, body, headers)
        postContainer.innerHTML += `<p class="post">${res.content}<button>Reply</button></p>`
          //Put a debugger, find me content and user-id
          })
        })
      })
  }
})
//LOGIN form:
// Put the form into the browser
// Where do I want to put this form on the page? (Right below the signup form)
//


//Write the code that puts it onto the page.
// in our console.log we have access to that data.
//


  // (1)make the fetch to persist
  // (2) make it display on the DOM
  // finding an element to add to
  //adding P tag with the text input
  // select the main tag add the p tag and interpolate.
