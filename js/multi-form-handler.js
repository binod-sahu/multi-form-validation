class newUser {
    constructor(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    }
  }
class Users {

    formTemplate = document.querySelector('.contact-form');
    formsContainer = document.querySelector('.forms');
    formsChildren = this.formsContainer.children;

    addForm = function() {
        const cloneTemplate = this.formTemplate.content.cloneNode(true);
        if(this.formsChildren.length){
            this.formsContainer.insertBefore(cloneTemplate, this.formsChildren[0]);
        } else {
            this.formsContainer.insertBefore(cloneTemplate, null);
        }
    }
    
    removeForm = function(event) {
       event.parentElement.parentElement.remove();
    }
    
    validateForms = function() {
        Array.from(this.formsChildren).map(item => {
            const cName = item.querySelector('[name=c-name]').value;
            const cEmail = item.querySelector('[name=c-email]').value;
            const cPhone = item.querySelector('[name=c-phone]').value;
            cName ? item.querySelector('.c-error.c-name').innerHTML = this.validateName(cName) ? '' : 'Invalid Name' 
                    : item.querySelector('.c-error.c-name').innerHTML = 'Please enter Name';
            cEmail ? item.querySelector('.c-error.c-email').innerHTML = this.validateEmail(cEmail) ? '' : 'Invalid Email' 
                    : item.querySelector('.c-error.c-email').innerHTML = 'Please enter email address ';        
            cPhone ? item.querySelector('.c-error.c-phone').innerHTML = this.validatePhone(cPhone) ? '' : 'Invalid Phone Number' 
                    : item.querySelector('.c-error.c-phone').innerHTML = 'Please enter email address ';
        })
    }
    saveForms = function() {
        const data = new FormData();
        const jsonSaveData = Array.from(this.formsChildren)
                .map(item => new newUser(item.querySelector('[name=c-name]').value, item.querySelector('[name=c-email]').value, item.querySelector('[name=c-phone]').value))
        const test = jsonSaveData.map(item => item)
        console.log(test)
        data.append( "json", JSON.stringify( jsonSaveData ));
        fetch("/assignments/contact/save.php",
        {
            method: "POST",
            body: data
        })
        .then(function(res){ console.log(res); return res.json(); })
        .then(function(data){ alert( JSON.stringify( data ) ) })
    }
    
    validateName = function(name) {
        const re = /^[A-Za-z ]+$/;
        return re.test(name);
    }
    
    validateEmail = function(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    validatePhone = function(phone) {
        const re = /^[0-9]+$/;
        return re.test(phone);
    }
}
    

const user = new Users()