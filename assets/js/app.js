const cl = console.log;

const onAddMovie = document.getElementById('onAddMovie');
const backdrop = document.getElementById('backdrop');
const moviemodel = document.getElementById('moviemodel');
const onCancel = [...document.querySelectorAll('.cancel')];
const onSubmit = document.getElementById('submit-form');
const moviename = document.getElementById('moviename');
const movieurl = document.getElementById('movieurl');
const rating = document.getElementById('rating');
const moviecontainer = document.getElementById('moviecontainer')
const addbtn = document.getElementById('addbtn');
const updatebtn = document.getElementById('updatebtn');

let dbArray = JSON.parse(localStorage.getItem('movieobj')) || [];


const onAddbtn = () => {
    backdrop.classList.add('active');
    moviemodel.classList.add('active');
}

const onCancelhandler = () =>{
    backdrop.classList.remove('active');
    moviemodel.classList.remove('active');
    addbtn.classList.remove('d-none');
    updatebtn.classList.add('d-none');
    onSubmit.reset();
} 

onCancel.forEach(eve => {
    eve.addEventListener('click', onCancelhandler);
})

const onEdit = eve => {
   let getid = eve.closest(".card").id;
   localStorage.setItem('editID', getid);
   let getobj = dbArray.find(ele => getid === ele.movieid);
   moviename.value = getobj.moviename;
   movieurl.value = getobj.movieurl;
   movierating.value = getobj.movierating;
   
    onAddbtn();
    addbtn.classList.add('d-none');
    updatebtn.classList.remove('d-none');
}

const onUpdate = () => {
    let getid = localStorage.getItem('editID');
    let getindex = dbArray.findIndex(ele => getid === ele.movieid);
        dbArray[getindex].moviename = moviename.value;
        dbArray[getindex].movieurl = movieurl.value;
        dbArray[getindex].rating = rating.value;
    localStorage.setItem('movieobj', JSON.stringify(dbArray));    
    let getobj = document.getElementById(getid);
    getobj.children[0].firstElementChild.innerText = moviename.value;
    getobj.children[0].lastElementChild.innerText = rating.value;
    movieurl.value = getobj.children[1].firstElementChild.children[0].setAttribute('src',movieurl.value);
    onCancelhandler();
    onSubmit.reset();
}

const onRemove = eve => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            timer: 1500
          });
          let getid = eve.closest(".card").id;
            let getindex = dbArray.findIndex(eve => eve.movieid === getid);
            dbArray.splice(getindex,1);
            localStorage.setItem('movieobj', JSON.stringify(dbArray));
            templating(dbArray);
        }
      });
}

const templating = eve => {
    let result = ''
    eve.forEach(ele => {
        result += `
        <div class="col-md-3 mb-4" >
        <div class="card" id="${ele.movieid}">
        <div class="card-header rating d-flex justify-content-between align-items-center">
            <h2 style="font-size:19px"><strong>${ele.moviename}</strong></h2>
            <span class="text-right ${movierating(ele.rating)}">${ele.rating}</span>
        </div>
        <div class="card-body p-0">
            <figure class="movieimg m-0">
                <img src='${ele.movieurl}' alt'movieimg'>
            </figure>
        </div>
        <div class="card-footer d-flex justify-content-between">
            <button class="btn btn-primary" onclick="onEdit(this)"><strong>Edit</strong></button>
            <button class="btn btn-danger" onclick="onRemove(this)"><strong>Delete</strong></button>
        </div>
    </div> 
    </div>       
        `
    })

    moviecontainer.innerHTML = result;
}

const movierating = ele => {
    if(ele >= 4){
        return "bg-success";
    }else if(ele >= 2 && ele < 4){
        return "bg-warning";
    }else if(ele < 2){
        return "bg-danger";
    }else{
        alert('please enter correct rating')
    }
}

templating(dbArray);

const onsubmtform = eve => {
    eve.preventDefault();
    let newobj = {
        moviename : moviename.value,
        movieurl : movieurl.value,
        rating : rating.value,
        movieid : uuidv4()
    }
    let flag = true;
    if(flag){
        Swal.fire({
            icon: "success",
            title: "Successfully Added",
            timer: 1500
        });
        dbArray.unshift(newobj);
        localStorage.setItem('movieobj', JSON.stringify(dbArray));
        templating(dbArray);
        onCancelhandler();
        eve.target.reset();
    }else{
        return;
    }
    
}

onAddMovie.addEventListener('click', onAddbtn);
onSubmit.addEventListener('submit', onsubmtform);
updatebtn.addEventListener('click', onUpdate)

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }


// function fizzbuzz(min,max){
//     if(min >= max){
//         alert('Enter valid value')
//     }
//     for(let i = min; i <= max; i++){
//         if(i % 3 === 0 && i % 5 === 0){
//             cl('fizzbuzz')
//         }else if(i % 5 === 0){
//             cl('buzzz')
//         }else if(i % 3 === 0){
//             cl('fizzz')
//         }else{
//             cl(i)
//         }
//     }
// }

// fizzbuzz(1,200);