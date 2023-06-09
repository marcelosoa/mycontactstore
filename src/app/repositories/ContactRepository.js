const { v4 } = require('uuid');

let contacts = [
  {
    id: v4(),
    name: 'Marcelo Soares',
    email: 'marcelosoares@gmail.com',
    phone: '123123',
    category_id: v4(),
  },
  {
    id: v4(),
    name: 'Roberta Mugue Dias',
    email: 'robertamugue@gmail.com',
    phone: '123123',
    category_id: v4(),
  },
];

class ContactRepository {
  // create
  create({
    name, email, phone, category_id
  }) {
    return new Promise((resolve) => {
      const newContact = {
        id: v4(),
        name,
        email,
        phone,
        category_id,
      };
      contacts.push(newContact);
      resolve(newContact);
    });
  }

  // Find all users
  findAll() {
    return new Promise((resolve) => resolve(contacts));
  }

  // Find user by id
  findById(id) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.id === id),
    ));
  }

  findByEmail(email) {
    return new Promise((resolve) => resolve(
      contacts.find((contact) => contact.email === email),
    ));
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((contact) => contact.id !== id);
      resolve();
    });
  }

  update(id, {
    name, email, phone, category_id
  }) {
    return new Promise((resolve) => {
      const updatedContent = {
        id,
        name,
        email,
        phone,
        category_id,
      };

      contacts = contacts.map((contact) => (
        contact.id === id ? updatedContent : contact
      ));

      resolve(contacts);
    });
  }
}

module.exports = new ContactRepository();
