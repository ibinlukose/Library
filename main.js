let products = []

if (sessionStorage.getItem("products")){
    products=JSON.parse(sessionStorage.getItem("products"))
}

userform.addEventListener('submit' ,(event)=>{
event.preventDefault()
 
const bookId = bookid.value
const bookName=bookname.value
const authorName=authorname.value
console.log(bookId,bookName,authorName);
 
if(bookId&&bookName&&authorName ){

    const editIndex=editstatus.value
    if(editIndex===""){

   

    products.push({bookid:bookId,bookname:bookName,authorname:authorName})
    console.log(products);
     }else{
        products[editIndex]= {bookid:bookId,bookname:bookName,authorname:authorName}
     }
} else{
    alert("please fill the form completely")
}



userform.reset()
sessionStorage.setItem("products",JSON.stringify(products))
searchBook.dispatchEvent(new Event("input"))
})

function displayBookList(){
    tablebody.innerHTML = ""
    products.forEach((item,index)=>{
        tablebody.innerHTML=` <tr>
                <td>${index+1}</td>
                <td>${item.bookname}</td>
                <td>${item.authorname}</td>
                <td>
                    <button onClick="editList(${index})"  class="btn btn-warning  ">Edit</button>
                    <button onClick="deleteList(${index})" class="btn btn-danger ">Delete</button>
                </td>
            </tr> `
    })
}


function deleteList(userindex){
    if(confirm("are you sure, you want to delete the data"))
        products.splice(userindex,1)
    sessionStorage.getItem("products",JSON.stringify(products))
    displayBookList()
}

function editList(userindex){
    const bookDetails = products[userindex]
    console.log(bookDetails);
     bookid.value=bookDetails.bookid
     bookname.value=bookDetails.bookname
     authorname.value=bookDetails.authorname
     editstatus.value=userindex

    
}

const searchBook = document.getElementById("searchBook")

searchBook.addEventListener("input", () => {
    const searchValue = searchBook.value.toLowerCase()

    const filteredBooks = products.filter((item) => {
        return item.bookname.toLowerCase().includes(searchValue)
    })

    tablebody.innerHTML = ""

    filteredBooks.forEach((item) => {
        const index = products.indexOf(item)

        tablebody.innerHTML += `
            <tr>
                <td>${item.bookid}</td>
                <td>${item.bookname}</td>
                <td>${item.authorname}</td>
                <td>
                    <button onclick="editList(${index})" class="btn btn-warning">
                        Edit
                    </button>

                    <button onclick="deleteList(${index})" class="btn btn-danger">
                        Delete
                    </button>
                </td>
            </tr>
        `
    })
})


