const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(id) {
  const contacts = await listContacts();
  return contacts.find((i) => i.id === id);
}

async function removeContact(id) {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((i) => i.id === id);
  if (contactIndex === -1) {
    return null;
  }
  const a = contacts.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));
  return a;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContacts = {
    id: Math.floor(Math.random() * 100000),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));
  return newContacts;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
