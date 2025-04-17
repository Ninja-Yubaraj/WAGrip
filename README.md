# WAGrip

![WAGrip Banner](https://i.imgur.com/AzJxruG.png)

**WAGrip** is a simple Node.js tool that connects to WhatsApp Web and exports all member phone numbers from a selected WhatsApp Group into a plain text file.


## 🚀 Features

- List all your WhatsApp groups.
- Select any group easily.
- Export all member phone numbers into `group_numbers.txt`.
- Supports large groups with thousands of members.
- Safe input validation to prevent crashes.
- Lightweight and minimal setup.


## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ninja-Yubaraj/WAGrip.git
   cd WAGrip
   ```

2. Install dependencies:
   ```bash
   npm install
   ```


## ⚡ Usage

1. Start the app:
   ```bash
   node index.js
   ```

2. Scan the QR Code with your WhatsApp:
   - Open WhatsApp → Linked Devices → Link a Device → Scan QR

3. Select a group from the list when prompted.

4. The tool will create a file named `group_numbers.txt` containing one phone number per line.


## 📋 Example Output

```
919812345678
917045678910
918765432101
...
```


## 🛠 Built With

- [Node.js](https://nodejs.org/)
- [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- [qrcode-terminal](https://github.com/gtanner/qrcode-terminal)


## 🔥 Notes

- This tool does **not** save sessions. You will need to scan the QR code every time you run it.
- Intended for **educational and personal use** only. Please respect WhatsApp’s [Terms of Service](https://www.whatsapp.com/legal/terms-of-service). (😜)


## 🤝 Contributing

Pull requests are welcome!  
If you have suggestions for improvements or features, feel free to open an issue.
