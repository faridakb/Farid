var computersTableBodyElement = document.getElementById('computers-table-body');
var editMode = false; var selectedComputerId = 0;
var computers = [];
var computersString = localStorage.getItem("computers");
if (computersString == null) {
} else {
    computers = JSON.parse(computersString);
}
var mainContentElement = document.getElementById('main-content');
var computersGlobal = computers.slice();

var loggedInUserId = localStorage.getItem("logged-in-user-id");
if (loggedInUserId == null) {
    computers = [];
    window.location.href = 'index.html';
} else {

    mainContentElement.style.display = 'block';
}

var userComputers = [];
for (let index = 0; index < computers.length; index++) {
    const computer = computers[index];
    if (computer.userId == loggedInUserId) {
        userComputers.push(computer);
    }

}
computers = userComputers;
var usersString = localStorage.getItem("users");
var users = JSON.parse(usersString);

function refreshComputers() {
    computersTableBodyElement.innerHTML = '';
    var computersTableBodyElementHtml = '';
    for (let index = 0; index < computers.length; index++) {
        const computer = computers[index];
        computersTableBodyElementHtml += '<tr><td>' + computer.id;
        computersTableBodyElementHtml += '</td><td>' + computer.name;
        computersTableBodyElementHtml += '</td><td><img class="computer-image" src="' +
            computer.imagePath;
        computersTableBodyElementHtml += '" onclick="onImageSelected(\'' + computer.imagePath + '\')" /></td><td>' + computer.price;

        computersTableBodyElementHtml += ' AZN</td><td> <button class="btn btn-danger"' +
            ' onclick="onDeleteComputer(' + computer.id + ')" >Удалить</button>  ' +
            '<button class="btn btn-primary" onclick="onEditComputer(' + computer.id +
            ')">Редактировать</button>  ';
        computersTableBodyElementHtml += '</td></tr>';
    }
    computersTableBodyElement.innerHTML = computersTableBodyElementHtml;
}
refreshComputers();






function onNewComputer() {
    editMode = false; selectedComputerId = 0;
    saveComputerModalElement.style.display = 'block'; saveComputerHeaderMessage.innerHTML = 'Новый';
}

var categories = [];
var categoriesString = localStorage.getItem("categories");

if (categoriesString == null) {

} else {
    categories = JSON.parse(categoriesString);
}



var saveComputerModalElement = document.getElementById('save-computer-modal');

var saveComputerModalCloseButtonElement = document.getElementById('save-computer-modal-close-button');
saveComputerModalCloseButtonElement.addEventListener('click', function () {
    saveComputerModalElement.style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target == saveComputerModalElement) {
        // saveComputerModalElement.style.display='none';
    }

    if (event.target == computerImageModalElement) {
        computerImageModalElement.style.display = 'none';
    }
});


var computerImageInputElement = document.getElementById('computer-image');
var computerImageShowElement = document.getElementById('computer-image-show');
var computerNameElement = document.getElementById('computer-name');
var computerPriceElement = document.getElementById('computer-price');
var computerDescriptionElement = document.getElementById('computer-description');
var computerIsNewElement = document.getElementById('computer-new');
var computerRamElement = document.getElementById('computer-ram');
var computerCpuElement = document.getElementById('computer-cpu');
var computerDriveElement = document.getElementById('computer-drive');
var computerDriveTypeElement = document.getElementById('computer-drive-type');
var computerOsElement = document.getElementById('computer-os');
var computerVideoCardElement = document.getElementById('computer-video-card');
var computerCategoryElement = document.getElementById('computer-category');

computerCategoryElement.innerHTML = '';
var computerCategoryElementHtml = '';

for (let index = 0; index < categories.length; index++) {
    const c = categories[index];
    computerCategoryElementHtml += "<option value='" + c.id + "'>" + c.name + "</option>";
}
computerCategoryElement.innerHTML = computerCategoryElementHtml;
function onComputerImageChange(imageInputElement) {
    var imageValue = imageInputElement.value;
    imageValue = imageValue.trim();
    if (imageValue == '') {
        computerImageShowElement.style.display = 'none';
    } else {
        computerImageShowElement.style.display = 'block';
        computerImageShowElement.src = imageValue;
    }


}

function onSaveComputer(event) {
    event.preventDefault();
    var computer = {};
    var computerId = 0;
    for (let index = 0; index < computersGlobal.length; index++) {
        const c = computersGlobal[index];
        if (c.id > computerId) {
            computerId = c.id;
        }
    }
    computerId++;
    computer.id = computerId;
    computer.name = computerNameElement.value;
    computer.price = Number(computerPriceElement.value);
    computer.imagePath = computerImageInputElement.value;
    computer.description = computerDescriptionElement.value;
    computer.isNew = computerIsNewElement.value == "true" ? true : false;
    computer.ram = Number(computerRamElement.value);
    computer.cpu = computerCpuElement.value;
    computer.drive = Number(computerDriveElement.value);
    computer.driveType = computerDriveTypeElement.value;
    computer.os = computerOsElement.value;
    computer.videoCard = Number(computerVideoCardElement.value);
    computer.categoryId = Number(computerCategoryElement.value);
    computer.userId = Number(loggedInUserId);
    console.log(computer);


    for (var j = 0; j < users.length; j++) {
        const u = users[j];
        if (u.id === computer.userId) {
            computer.phone = u.phone; break;
        }
    }

    if (editMode) {
        // save computer
        computer.id = selectedComputerId;
        for (let index = 0; index < computersGlobal.length; index++) {
            const c = computersGlobal[index];
            if (c.id == selectedComputerId) {
                computersGlobal[index] = computer; break;
            }
        }
        alert("Компьютер успешно редактирован!");

    } else {
        // add computer
        computersGlobal.push(computer);
        alert("Компьютер успешно загестрирован!");
    }

    localStorage.setItem('computers', JSON.stringify(computersGlobal));


    window.location.reload();
    userComputers = [];
    for (let index = 0; index < computersGlobal.length; index++) {
        const computer = computersGlobal[index];
        if (computer.userId == loggedInUserId) {
            userComputers.push(computer);
        }

    }
    computers = userComputers;


    refreshComputers();

}



function onDeleteComputer(computerId) {
    var result = confirm('Вы уверены удалить этот компьютер?');
    if (result) {

        for (let index = 0; index < computersGlobal.length; index++) {
            const c = computersGlobal[index];
            if (c.id === computerId) {
                computersGlobal.splice(index, 1);
                break;
            }
        }

        localStorage.setItem('computers', JSON.stringify(computersGlobal));

        userComputers = [];
        for (let index = 0; index < computersGlobal.length; index++) {
            const computer = computersGlobal[index];
            if (computer.userId == loggedInUserId) {
                userComputers.push(computer);
            }

        }
        computers = userComputers;


        //refreshComputers();
        alert("Компьютер успешно удален");
        window.location.reload();
    } else {

    }
}





function onEditComputer(computerId) {
    editMode = true; selectedComputerId = computerId;
    saveComputerModalElement.style.display = 'block'; saveComputerHeaderMessage.innerHTML = 'Редактировать';
    setTimeout(() => {



        var selectedComputer = {};

        for (let index = 0; index < computersGlobal.length; index++) {
            const computer = computersGlobal[index];
            if (computer.id == computerId) {
                selectedComputer = computer; break;
            }

        }
        computerCategoryElement.value = selectedComputer.categoryId;
        computerNameElement.value = selectedComputer.name;
        computerPriceElement.value = selectedComputer.price;
        computerDescriptionElement.value = selectedComputer.description;
        computerIsNewElement.value = selectedComputer.isNew;
        computerImageInputElement.value = selectedComputer.imagePath;


        var imageValue = selectedComputer.imagePath;
        if (imageValue == '') {
            computerImageShowElement.style.display = 'none';
        } else {
            computerImageShowElement.style.display = 'block';
            computerImageShowElement.src = imageValue;
        }

        computerRamElement.value = selectedComputer.ram;
        computerCpuElement.value = selectedComputer.cpu;
        computerDriveElement.value = selectedComputer.drive;
        computerDriveTypeElement.value = selectedComputer.driveType;
        computerOsElement.value = selectedComputer.os;
        computerVideoCardElement.value = selectedComputer.videoCard;

    }, 500);


}

var saveComputerHeaderMessage = document.getElementById('save-computer-header-message');
var saveComputerModalForm = document.getElementById('save-computer-modal-form');


function resetComputerForm() {
    computerImageShowElement.style.display = 'none';
}



var computersTableBodyElementHtml = '';
function addComputersToPage(computersLocal) {

    for (let index = 0; index < computersLocal.length; index++) {
        const computer = computersLocal[index];
        computersTableBodyElementHtml += '<tr><td>' + computer.id;
        computersTableBodyElementHtml += '</td><td>' + computer.name;
        computersTableBodyElementHtml += '</td><td><img style="width:120px;" src="' +
            computer.imagePath;
        computersTableBodyElementHtml += '" /></td><td>' + computer.price;

        computersTableBodyElementHtml += ' AZN</td><td> <button class="btn btn-danger"' +
            ' onclick="onDeleteComputer(' + computer.id + ')" >Удалить</button>  ' +
            '<button class="btn btn-primary" onclick="onEditComputer(' + computer.id +
            ')">Редактировать</button>  ';
        computersTableBodyElementHtml += '</td><tr>';
    }
    computersTableBodyElement.innerHTML = computersTableBodyElementHtml;
}

var computersTableElement = document.getElementById('computers-table');
var computersLoading = document.getElementById('computers-loading');
function onSearchKeyDown(event) {
    if (event.keyCode == 13) {
        computersTableElement.style.display = 'none';
        computersLoading.style.display = 'block';
        computersTableBodyElement.innerHTML = '';
        computersTableBodyElementHtml = '';
        setTimeout(() => {
            computersTableElement.style.display = 'block';
            computersLoading.style.display = 'none';
            var searchValue = event.target.value.toLowerCase();
            searchValue = searchValue.trim();
            var findedComputers = [];

            for (let index = 0; index < computers.length; index++) {
                const c = computers[index];
                if (c.name.toLowerCase().includes(searchValue)) {
                    findedComputers.push(c);
                }
            }
            addComputersToPage(findedComputers);

        }, 500);



    }
}


console.log('computers.js end');


function onImageSelected(computerImagePath) {
    computerImageModalElement.style.display = 'block';
    computerModalImageShowElement.src = computerImagePath;
}

var computerImageModalElement = document.getElementById('computer-image-modal');
var computerModalImageShowElement = document.getElementById('computer-modal-image-show');