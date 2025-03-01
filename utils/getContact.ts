import * as Contacts from "expo-contacts";

const getContactByName = async (name: string) => {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status !== "granted") return {success: false, message: "Enable permission to contacts."};

  const { data } = await Contacts.getContactsAsync({
    fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
  });

  const contact = data.find((contact) =>
    contact.name?.toLowerCase().includes(name.toLowerCase())
  );

  if(!contact || !contact.phoneNumbers)
    return {success: false, message: `No contacts found with name ${name}`}

  return {success: true, number: contact.phoneNumbers[0].number};
};

export default getContactByName;