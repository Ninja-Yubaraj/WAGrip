const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

// Initialize client
const client = new Client();

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('📱 Scan the QR code above to log in.');
});

client.on('ready', async () => {
    console.log('✅ Client is ready!');

    const chats = await client.getChats();
    const groups = chats.filter(chat => chat.isGroup);

    if (groups.length === 0) {
        console.log('❗ No groups found.');
        return;
    }

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

            console.log(`📥 Fetching members from group: ${selectedGroup.name}`);

            try {
                const chat = await client.getChatById(selectedGroup.id._serialized);
                if (!chat.isGroup || !chat.participants) {
                    console.log('❗ Unable to fetch participants. Make sure you are a member of this group.');
                    readline.close();
                    return;
                }

                const numbers = chat.participants.map(p => p.id.user);
                const uniqueNumbers = [...new Set(numbers)];

                const sanitizedGroupName = selectedGroup.name.replace(/[\/\\?%*:|"<>]/g, '-');
                const outputFileName = `${sanitizedGroupName}Numbers.txt`;

                fs.writeFileSync(outputFileName, uniqueNumbers.join('\n'));

                console.log(`✅ Saved ${uniqueNumbers.length} unique numbers to ${outputFileName}`);
            } catch (err) {
                console.error('❗ Error fetching group data:', err.message);
            }

            readline.close();
        });
    };

    askGroupNumber();
});

client.initialize();
