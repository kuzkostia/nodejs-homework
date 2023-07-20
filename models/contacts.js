const fs = require("fs/promises");
const path = require("path");
const nanoid  = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(
    (item) => item.id === contactId 
  );
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (item) => item.id === contactId 
  );
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, updatedFields) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (item) => item.id === contactId || item.contactId === contactId
  );
  if (index === -1) {
    return null;
  }

  // Перевірте, які поля були надіслані в запиті і дозвольте змінювати тільки їх
  if (updatedFields.name) {
    contacts[index].name = updatedFields.name;
  }
  if (updatedFields.email) {
    contacts[index].email = updatedFields.email;
  }
  if (updatedFields.phone) {
    contacts[index].phone = updatedFields.phone;
  }

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
