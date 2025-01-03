<h1><strong>Calendar Application for Communication Tracking(Connecttly
)</strong></h1>
<h2><strong>Project Overview</strong></h2>
<p> Connecttly is a comprehensive web application that supports partner companies’ communication management by allowing organizations to systematically interact with their partner companies. Adding on to the management, it allows to follow up’s in a timely manner and allows keeping control of how often the scheduled follow up’s will be made. This way, all the past communications can be logged, future interactions can be scheduled and random follow ups can be done. Enabling the organizations to enhance their professional relationships as well as increase the overall productivity of the firm by using this tool..</p>

<h2><strong>Deployment Details</strong></h2>
<p>The application is deployed on Render and can be accessed at - https://connecttly-frontend.onrender.com//</p>

<h2>Screenshots</h2>
<h3>User Module - Dashboard</h3>
<p>The dashboard provides a comprehensive overview of companies and upcoming tasks.</p>

<li>View all companies in a grid format with key details</li>
<li> View all Due and Overdue Task/Schedule </li><br>

![Screenshot 2025-01-02 183851](https://github.com/user-attachments/assets/f2b0b8e6-7bbf-4b32-9d58-12c48ce3f7b4)<br>


<p>Log new communications for individual or multiple companies:</p>
<li>Select communication type (e.g., LinkedIn post, email).and add notes</li>
<li>Automatically update task statuses and remove highlights.</li>
<br>

![Screenshot 2025-01-03 132820](https://github.com/user-attachments/assets/971c5f54-9f80-43b9-8ddb-12ca913cca35)

------------------------------------------------------------------------------------------------------------------
<br><br>
<h3><strong>Admin Module - Company Management(Dashboard)</strong></h3>
<p>The Admin has the ability to add, edit and delete companies.Important information such as company name, address, link to company profile on LinkedIn, emails, phone numbers and notes can
Be stored.Set up the required rate of follow on communications (for example: once in a week, every two weeks)</p><br>

![Screenshot 2025-01-02 184324](https://github.com/user-attachments/assets/3ff5ab7b-32ad-4bf1-b8e1-fe6384021122)

<br><br>

![Screenshot 2025-01-02 184350](https://github.com/user-attachments/assets/60373cc1-d627-46a7-b6e1-aa1f71e8dbaf)

-------------------------------------------------------------------------------------------------------------
<br><br>
<h3>Calendar View</h3>
<p>View the previous interaction history visually in calendar format.
This feature gives users the capability to set color codes for overdue and due tasks/block communications.</p>
<li>Red: Past due communications</li>
<li>Green: Upcoming Commuction Task</li>
<li>Blue : Past Complete</li><br>


![Screenshot 2025-01-02 183925](https://github.com/user-attachments/assets/f6bb6d5b-400b-4576-9944-044398f733b0)

----------------------------------------------------------------------------------------------------------------------

<h2>Key Features</h2>
    <h3>Admin Module</h3>
    <h4>Company Management:</h4>
        <li>Add, edit, or delete company details, including:</li>
        <li>Name</li>
            <li>Location</li>
            <li>LinkedIn profile</li>
            <li>Contact information</li>
            <li>Comments</li>
            <li>Periodic schedules</li>

  <h3>Technologies Used</h3>

  <li>Frontend: React.js, FullCalendar</li>
  <li>Backend: Node.js, Express.js, MongoDB (if applicable)</li>
  <li>Deployment:Render</li>

  <h3>Clone the Repository:</h3>

   <p>Open your terminal and execute:<p>
   git bash - copy code
     
            git clone https://github.com/Divyang-Giradkar/Connecttly.git
            cd connecttly

 <p>Open backend and frontend directory in  terminal</p>
 
           --->connecttly/backend
           ----> connecttly / frontend
       
  <p>Install Dependencies:</p>

         npm install
         
<p>Run the Application </p>

            npm start
