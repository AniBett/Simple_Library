let buttonAdd = document.querySelector('.buttonAdd')
let addBookForm = document.querySelector('.formWindow')
let checkbox = document.querySelector('#read_ind')
let submitButton = document.querySelector('.submitButton')
let containerBox = document.querySelector('#container')
let libraryContainer = document.querySelector('.library')
let library = []



function book(title,Author, pageNum,read){
        this.title = title
        this.Author = Author
        this.pageNum = pageNum    
        this.read = read
    }

function clearInput(){
  document.querySelector('#author_name').value = ""
  document.querySelector('#book_title').value = ""
  document.querySelector('#page_count').value = ""
  document.querySelector('#read_ind').checked = false
}
function bringForm(){  
    addBookForm.classList.add('active');
    containerBox.classList.add('active')

}
function removeBookAction(event){
   let rID = document.getElementById(event.target.parentNode.id)
   rID.parentElement.removeChild(rID)
   library.splice(Number(event.target.parentNode.id), 1)
   console.log(event.target.parentNode.id)
   resetID = document.querySelectorAll('.book')
   for (let i = 0; i<library.length;i++){
    resetID[i].setAttribute('id',i)
   }


}
function closeForm(){
    addBookForm.classList.remove('active')
    containerBox.classList.remove('active')
    clearInput()
}
function readStatusChanger(event){
  console.log(event.target.parentNode.id)
  let changer = document.getElementById(event.target.parentNode.id)
  let changer2 = changer.querySelector('#'+event.target.id)
  library[Number(event.target.parentNode.id)].read = !library[Number(event.target.parentNode.id)].read
  if (library[Number(event.target.parentNode.id)].read){
     changer2.classList.add('active')
  }
  else{
    changer2.classList.remove('active')
  }
}
function submitFunction(event){
  event.preventDefault()
  let Author = document.querySelector('#author_name').value;
  let title = document.querySelector('#book_title').value;
  let pageNum = document.querySelector('#page_count').value;
  let readStat = checkbox.checked
  console.log(Author," ",title," ",pageNum," ",readStat)
  if (Author.length != 0 && title.length !=0 && pageNum.length != 0){
    let newBook = new book(Author,title,pageNum,readStat)
    library.push(newBook)
    let newTag = document.createElement('div')
    let newText = document.createTextNode(newBook.Author+'\n\n'+newBook.title+'\n\n'+newBook.pageNum+'\n')
    let rbutton = document.createElement('button')
    rbutton.classList.add('rbutton')
    rbutton.innerText = 'Remove Book'
    rbutton.addEventListener('click',removeBookAction)
    let readStatChange = document.createElement('button');
    readStatChange.setAttribute("id", "readStatusChange");
    readStatChange.innerText = 'Read?'
    if (newBook.read){
      readStatChange.classList.add('active')
    }
    readStatChange.addEventListener('click', readStatusChanger)
    newTag.setAttribute('id',library.indexOf(newBook))
    newTag.classList.add('book')
    newTag.appendChild(newText) 
    newTag.appendChild(readStatChange)
    // newTag.appendChild(document.createTextNode('\n'))
    newTag.appendChild(rbutton)
    libraryContainer.appendChild(newTag)
    closeForm()
  }
}
buttonAdd.addEventListener('click', bringForm)
containerBox.addEventListener('click', closeForm)
submitButton.addEventListener('click', (e) => submitFunction(e))


   

