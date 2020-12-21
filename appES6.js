// Our Own Selector
const selectById = (id) => {
   return document.getElementById(id)
}


/******** Contact Class ********/
class Contact {
   constructor(name, email, phone, birthday){
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.birthday = birthday;
   }
}

/******** UI Class ********/
class UI {
   // Add Contact
   addContact (contact){
      const listDiv = selectById('contact-list');
      const list = document.createElement('tr')
      list.innerHTML = `
         <td>${contact.name}</td>
         <td>${contact.email}</td>
         <td>${contact.phone}</td>
         <td><a class="btn btn-floating delete">X</a></td>
      `
      listDiv.appendChild(list)
   }

   // Delete Contact
   deleteContact (target){
      if (target.classList.contains('delete')) {
         if (confirm('Are you sure to delete this contact ?')) {
            target.parentElement.parentElement.remove()

            const phone = target.parentElement.parentElement.children[2].textContent
            const contacts = Store.getContact();
            const totalContact = contacts.filter( contact => {
               return contact.phone !== phone
            });
            console.log(totalContact);
            localStorage.setItem('contact', JSON.stringify(totalContact));
         }
      }
   }

   // Search Contact
   searchContact (searchContact){
      console.log(searchContact)

      const allContact = document.querySelectorAll('#contact-list tr')
      allContact.forEach((element) => {
         const name = element.children[0].textContent.toUpperCase()
         console.log(name)
         if (name.indexOf(searchContact) != -1) {
            element.style.display = 'table-row'
         }else{
            element.style.display = 'none'
         }
      })
   }

   // Clear Form
   clearForm(){
      // alert('Successfully Working')
      selectById('name').value = ''
      selectById('email').value = ''
      selectById('phone').value = ''
      selectById('birthday').value = ''
   }

   // Clear Form after adding contact
}

// Store Data in our local storage
class Store {
   static getContact(){
      let contact = JSON.parse(localStorage.getItem('contact'));
      console.log(contact);
      return contact;
   }
   static displayContact(){
      const contacts = Store.getContact();
      console.log(contacts);
      contacts.forEach( contact => {
         console.log(contact)
         const ui =  new UI();
         ui.addContact(contact);
      });
   }

   static addContact(contact) {
      var old_coords = JSON.parse(localStorage.getItem('contact'));
      if (old_coords === null) {
         localStorage.setItem('contact', JSON.stringify([contact]));
      } else {
         var new_coords = old_coords;
         new_coords.push(contact);
         localStorage.setItem('contact', JSON.stringify(new_coords));  
      }
   }

}


/******** All Event Handler Here ********/
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
      Store.addContact(contact)
      ui.clearForm()
      // Show Progress
      document.querySelector('.progress').style.display = 'block';
      setTimeout(function(){
          // hide Progress
          document.querySelector('.progress').style.display = 'none';
      },500);
   }else{
      alert('Please Fill Up All The Input Field')
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
   ui.searchContact(e.target.value.toUpperCase())
})

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayContact());