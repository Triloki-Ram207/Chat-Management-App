📩 Chat Management App
A full-featured chat management system where users can raise tickets and get their queries resolved by Admins or Team Members. The app provides a responsive landing page for users and a powerful dashboard for admins and team members to manage tickets, chats, analytics, and team settings.

🚀 Features
🧑‍💻 User Side
Landing Page: Simple, responsive design with a floating chat icon.

Mini Chat Box: Opens a form requesting Name, Email, and Phone Number.

Ticket Creation: On form submission, a ticket is automatically generated.

Acknowledgement: Displays a “Thank You, our team will get back to you soon” message.

Live Chat: Users can chat directly with Admin or Team Members via the homepage chat box.

🔐 Admin & Team Side
Authentication
Signup: Only accessible initially for creating the first Admin account.

Login: Admin and team members can log in with credentials.

Password Security: Passwords are securely hashed. On password change, the user is logged out immediately.

Email Restriction: Registered email cannot be changed.

📊 Dashboard
Displays system summary and quick metrics:

All Tickets

Resolved Tickets

Unresolved Tickets

Search & Filter: Search tickets by Ticket ID.

Scalability: Pagination or lazy loading supported.

Edge Cases:

No tickets → “No tickets found”

Invalid Ticket ID → “Ticket not found”

💬 Contact Center
Chat List Panel: Shows all chat threads sorted by latest message or unread status.

Chat Box Section:

Send text messages

View conversation history

Mark tickets as resolved/unresolved

Details Section:

Sender info (Name, Email, Phone)

Assigned teammate

Ticket status (Open, In Progress, Resolved)

Assignment:

By default, tickets are assigned to Admin.

Admin can reassign tickets to team members.

Edge Cases:

Deleted teammate → tickets auto-reassigned to Admin

Failed chat load → “Unable to load chat details”

📈 Analytics
Metrics:

Average Reply Time (line/bar chart)

Resolved Tickets % (pie chart)

Total Chats Till Date (numeric counter with date filter)

Edge Cases:

Insufficient data → “No data available yet”

⚙️ Chat Bot Settings
Customize chat experience:

Header Color

Background Color

Initial Message

Intro Form Fields (labels, placeholders, visibility)

Pop Message Text

Missed Chat Timer (e.g., flag chats after 5 mins)

Edge Cases:

Failed configuration → default values applied

Invalid color → fallback to default scheme

👥 Team Management
Roles:

Admin: Full access, can add/edit/delete members and update roles.

Team Members: Can edit their own profile only.

Rules:

Only one Admin account can exist.

Team members cannot delete themselves or others.

Team members cannot change registered email.

Edge Cases:

Deleted teammate → tickets reassigned to Admin

Admin account deletion → restricted

⚙️ Settings
Profile management:

Update password

Update name

Force logout on password change

🏠 Home Page
Integrated chat box for users to directly chat with Admin or Team Members.

👨‍💼 Admin Details
This section is reserved for documenting the Admin account information. Fill in the details when setting up the system:

Admin Name:"Triloki ram

Admin Email: trilokiram207@gmail.com


Admin Role: Full access (cannot be deleted, only one Admin account exists)

📌 Summary
This app provides:

A user-friendly ticket raising system

A robust admin dashboard for managing tickets and chats

Analytics for tracking performance

Customization options for chat UI

Team management with role-based access

## 🌐 Hosted Links

- **Frontend (User Landing Page + Dashboard)**  
  👉 [https://chat-management-app.vercel.app](https://chat-management-app.vercel.app)

- **Backend API (Render)**  
  👉 [https://chat-management-app.onrender.com](https://chat-management-app.onrender.com)

### Example Endpoints
- Signup: `POST https://chat-management-app.onrender.com/api/v1/signup`
- Login: `POST https://chat-management-app.onrender.com/api/v1/login`
- Tickets: `GET https://chat-management-app.onrender.com/api/v1/tickets`

