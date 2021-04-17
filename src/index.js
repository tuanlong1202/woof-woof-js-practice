
const dog_bar = document.getElementById('dog-bar');
const dog_info = document.getElementById('dog-info');
const good_dog_filter = document.getElementById('good-dog-filter');

let showGoodDog = false ;

document.addEventListener('DOMContentLoaded', function(event){
    loadPups();
    good_dog_filter.style.cursor = 'pointer';
    good_dog_filter.addEventListener('click', function(event) {
        if (!showGoodDog) {
            showGoodDog = true;
            this.textContent = 'Filter good dogs: ON';
        } else {
            showGoodDog = false;
            this.textContent = 'Filter good dogs: OFF';
        }
        loadPups();
    });
})

function loadPups() {
    let url = 'http://localhost:3000/pups';
    removeAllChildNodes(dog_bar);
    fetch(url)
        .then(response=>response.json())
        .then(function(result){
            let arrPuplist = [];
            if (showGoodDog) {
                arrPuplist = result.filter(item => item.isGoodDog==true);
            } else {
                arrPuplist = result;
            }
            arrPuplist.forEach(element => {
                let pupName = createTextNode(element.name);
                let span = createSpan();
                span.appendChild(pupName);
                span.style.cursor = 'pointer';
                span.addEventListener('click', function() {
                    showPup(element.id);
                })
                dog_bar.appendChild(span);
            });
        })
        .catch(function(error){
            console.log(error.message);
        });
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function showPup(intID) {
    let url = 'http://localhost:3000/pups/?id=' + intID;
    removeAllChildNodes(dog_info);
    fetch(url)
        .then(response=>response.json())
        .then(function(result){
            result.forEach(function(item){
                let pupName = createTextNode(item.name);
                let pupNameH2 = h2();
                pupNameH2.appendChild(pupName);
                let imgName = img();
                imgName.src = item.image;
                dog_info.appendChild(imgName);
                dog_info.appendChild(pupNameH2);
                let btnGoodBad = input();
                btnGoodBad.type = 'button';
                if (item.isGoodDog) {
                    btnGoodBad.value = 'Good Dog';
                } else {
                    btnGoodBad.value = 'Bad Dog';
                }
                btnGoodBad.addEventListener('click',function(event) {
                    event.preventDefault();
                    updateGoodBad(item);
                    if(item.isGoodDog){
                        this.value = 'Good Dog';
                    } else {
                        this.value = 'Bad Dog';
                    }
                    return false;
                });
                dog_info.appendChild(btnGoodBad);
            })
        })
        .catch(function(error){
            console.log(error.message);
        });
}

function updateGoodBad(obj) {
    obj.isGoodDog = !obj.isGoodDog;
    fetch("http://localhost:3000/pups/" + obj.id, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(obj)
        })
        .then(response => response.json())
        .then()
        .catch(function(error) {
            console.log(error.message);
        });
}

function createTextNode(strText) {
    return document.createTextNode(strText);
}

function createSpan(){
    return document.createElement('span');
}

function h2() {
    return document.createElement('h2');
}

function img() {
    return document.createElement('img');
}

function br() {
    return document.createElement('br');
}

function input() {
    return document.createElement('input');
}

function form() {
    return document.createElement('form');
}
