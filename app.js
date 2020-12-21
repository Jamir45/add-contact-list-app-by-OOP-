// Our Own Selector
function selectById (id) {
   return document.getElementById(id)
}


// Contact Constructor
function Contact(name, email, phone, birthday) {
   this.name = name;
   this.email = email;
   this.phone = phone;
   this.birthday = birthday;
}

// UI Constructor
function UI() {

}


// Add Contact
UI.prototype.addContact = function(contact){
   console.log(contact);
   const listDiv = selectById('contact-list');
   const list = document.createElement('tr')
   list.innerHTML = `
      <td>${contact.name}</td>
      <td>${contact.email}</td>
      <td>${contact.phone}</td>
      <td>${contact.birthday}</td>
      <td><a class="btn btn-floating delete">X</a></td>
   `
   listDiv.appendChild(list)
}

// Delete Contact
UI.prototype.deleteContact = function(target){
   if (target.classList.contains('delete')) {
      if (confirm('Are you sure')) {
         target.parentElement.parentElement.remove()
      }
   }
}

// Search Contact
UI.prototype.searchContact = function(searchContact){
   console.log(searchContact)
   const allContact = document.querySelectorAll('#contact-list tr')
   allContact.forEach((element) => {
      console.log(element.children[0].textContent)
      if (element.children[0].textContent.indexOf(searchContact) != -1) {
         element.style.display = 'table-row'
      }else{
         element.style.display = 'none'
      }
   })
}


// Submit Event
selectById('button').addEventListener('click', function(e) {
   e.preventDefault();
   // alert('Successfully Working')
   const name = selectById('name').value;
   const email = selectById('email').value;
   const phone = selectById('phone').value;
   const birthday = selectById('birthday').value;

   if (name && email && phone && birthday) {
      const contact = new Contact(name, email, phone, birthday)

      const ui = new UI();
      ui.addContact(contact)
   }else{
      alert('Please Fil All The Input Field')
   }
})

// Delete Event
selectById('contact-list').addEventListener('click', function (e) {
   const ui = new UI();
   ui.deleteContact(e.target)
})

// Search Event
selectById('search').addEventListener('keyup', function (e) {
   const ui = new UI();
   ui.searchContact(e.target.value)
})

