let cl = console.log;
const info = document.getElementById('info');
const myTable =document.getElementById('mytable');
const loader = document.getElementById('loader');

let baseUrl ="https://fakestoreapi.com/products";

let imgArray =[];
let newImgArr =[];


function fetchData(methodName,url,data){
    return new Promise((resolve,reject) => {
        loader.classList.remove('d-none')
        let xhr = new XMLHttpRequest();
        xhr.open(methodName, url);
        xhr.onload = function(){
            if((xhr.status == 200 || xhr.status == 201) && xhr.readyState == 4){
                loader.classList.add('d-none')
                resolve(imgArray =JSON.parse(xhr.response));
            }else{
                reject("something went wrong")
            }
        };
        xhr.send(data);
    })
};
fetchData('GET',baseUrl)
    .then(res => templating(imgArray))
    .catch(cl)

function templating(arr){
    let result = '';
    arr.forEach(element => {
        result +=`
        <div class="col-md-3">
             <div class="card mt-4" data-id ="${element.id}">
                 <div class="card-body">
                     <figure class="imgList">
                          <img src="${element.image}" alt="img1" class="img-fluid">
                      </figure>
                     <button class="btn btn-primary" onclick ="onAddHandler(this)"> add </button>
                     <button class="btn btn-danger d-none" onclick ="onremoveHandler(this)"> remove </button>
                 </div>
            </div>
         </div>
        `
    });
    info.innerHTML = result;
}

function createTable(ele){
    let result ='';
    ele.forEach(e =>{
        result += `
            <tr>
                <td>${e.id}</td>
                <td><img src="${e.image}" alt="img" class="img-fluid"></td>
                <td>${e.title}</td>
            </tr>
        
        `
    })
    mytable.innerHTML =result;
    
}

function onAddHandler(eve){
    
    let getId = eve.closest('.card').dataset.id;
    let getobj =imgArray.find(ele =>{
        return getId == ele.id
            
    });
    //cl(getobj)

    let obj={
        id: getobj.id,
        image: getobj.image,
        title: getobj.title,
    }
    newImgArr.push(obj)
   // cl(newImgArr)
  createTable(newImgArr)
    eve.classList.add('d-none')
    eve.nextElementSibling.classList.remove('d-none')
  
};

function onremoveHandler(r){
    let getId = +r.closest('.card').dataset.id;

    newImgArr = newImgArr.filter(ele => getId !== ele.id);
    createTable(newImgArr);
    r.classList.add('d-none')
    r.previousElementSibling.classList.remove('d-none')
}
