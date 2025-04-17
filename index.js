const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
    console.log('Client is ready!');

    const chats = await client.getChats();
    const groups = chats.filter(chat => chat.isGroup);

    console.log('Groups:');
    groups.forEach((group, index) => {
        console.log(`${index + 1}. ${group.name}`);
    });

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const askGroupNumber = () => {
        readline.question('Enter the number of the group you want to export: ', async (groupNumber) => {
            if (!groupNumber.trim()) {
                console.log('❗ Please enter a number.');
                askGroupNumber();
                return;
            }

            const groupIndex = parseInt(groupNumber) - 1;

            if (isNaN(groupIndex) || groupIndex < 0 || groupIndex >= groups.length) {
                console.log('❗ Invalid group number. Try again.');
                askGroupNumber();
                return;
            }

            const selectedGroup = groups[groupIndex];

            console.log(`Fetching members from group: ${selectedGroup.name}`);

            // Fetch complete group metadata
            const groupMetadata = await client.getGroupMetadata(selectedGroup.id._serialized);
            const participants = groupMetadata.participants;

            console.log(`Total members fetched: ${participants.length}`);

            // Extract only numbers
            const numbers = participants.map(p => p.id.user);

            // Write to a simple text file
            const output = numbers.join('\n');
            fs.writeFileSync('Numbers.txt', output);

            console.log(`✅ Saved ${numbers.length} numbers to Numbers.txt`);
            readline.close();
        });
    };

    askGroupNumber();
});

client.initialize();
