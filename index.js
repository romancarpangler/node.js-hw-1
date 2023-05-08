const { program } = require("commander");

const contacts = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "contactsList":
      const contact = await contacts.listContacts();
      console.log(contact);
      break;

    case "getConatctId":
      const contactId = await contacts.getContactById(id);
      console.log(contactId);
      break;

    case "addContact":
      const addContact = await contacts.addContact(name, email, phone);
      console.log(addContact);
      break;

    case "removeConatcts":
      const deleteContact = await contacts.removeContact(id);
      console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const option = program.opts();

invokeAction(option);
