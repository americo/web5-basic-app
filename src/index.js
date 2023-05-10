import { Web5 } from "@tbd54566975/web5";

const web5 = new Web5();

// Create a DID
const did = await web5.did.create('ion');

// Store the DID in DWN
await web5.did.manager.set(did.id, {
    connected: true,
    endpoint: 'app://dwn',
    keys: {
        ['#dwn']: {
          keyPair: did.keys.find(key => key.id === 'dwn').keyPair,
        },
    }
});

// Create a record
const { record } = await web5.dwn.records.create(did.id, {
    author: did.id,
    data: "Hello Web5",
    message: {
        dataFormat: 'text/plain',
    },
});


// Read the record
const readResult = await record.data.text();
console.log(readResult); // Hello Web5

// Update the record
const updateResult = await record.update({ data: "Hello, I'm updated!" });
console.log(await record.data.text());

// Delete the record
const deleteResult = await record.delete();
console.log(deleteResult.status);

