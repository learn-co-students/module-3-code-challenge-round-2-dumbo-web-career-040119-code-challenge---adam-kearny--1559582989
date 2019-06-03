const imageId = 2765 //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

const commentsUl = document.querySelector('#comments')

const likeButton = document.querySelector('#like_button')

const commentForm = document.querySelector('#comment_form')





document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  loadImage()
})

function addComment(){
  event.preventDefault()
  const comment = document.querySelector('#comment_input').value
  const newLi = document.createElement('li')
  newLi.innerText = comment
  commentsUl.appendChild(newLi)
  document.querySelector('#comment_input').value = ""

  fetch('https://randopic.herokuapp.com/comments', {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify({
      image_id: imageId,
      content: comment
    })
  })
}

function increaseLikes(){
  const likesSpan = document.querySelector('#likes')
  const likes = parseInt(likesSpan.innerText)
  const newLikes = likes + 1
  likesSpan.innerText = newLikes

  fetch('https://randopic.herokuapp.com/likes', {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify({
      image_id: imageId
    })
  })
}

function addCommentToUl(comment){
  const newLi = document.createElement('li')
  newLi.innerText = comment.content
  commentsUl.appendChild(newLi)
}

function addImageToDom(image){
  console.log(image)
  const imageTag = document.querySelector('#image')
  imageTag.src = image.url
  const nameHeader = document.querySelector('#name')
  nameHeader.innerText = image.name
  const likesSpan = document.querySelector('#likes')
  likesSpan.innerText = image.like_count
  image.comments.forEach(addCommentToUl)
}

function loadImage(){
  fetch(imageURL)
  .then(res => res.json())
  .then(image => addImageToDom(image))
}

likeButton.addEventListener("click", increaseLikes)
commentForm.addEventListener("submit", addComment)
