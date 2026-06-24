/* ===================================================================
   SKOOLYST PORTFOLIO — DAILY SCHEDULE DATA
   -------------------------------------------------------------------
   This is the ONLY file you need to edit to add new days to the
   calendar on your portfolio. No HTML/CSS knowledge needed.

   HOW TO ADD A NEW ENTRY
   -------------------------------------------------------------------
   1. Copy one block (the part between { and },) below.
   2. Paste it inside the scheduleData array (before the closing ]).
   3. Edit the values. Keep the quotes.
   4. Save the file. That's it — the calendar updates automatically.

   FIELDS
   -------------------------------------------------------------------
   date        : "YYYY-MM-DD"  → required. e.g. "2026-06-20"
   category    : one of "Learning", "Experience", "Meeting", "Event",
                 "Task"  → controls the color + icon on the calendar.
                 (You can type a new category name too — it will just
                 use a default grey color until you add it to the
                 CATEGORY_META list inside js/schedule.js)
   title       : short heading → shown on hover label & modal title
   description : full details → shown inside the popup when the date
                 is clicked. Plain text, a few sentences is perfect.
   tags        : OPTIONAL → array of small keyword chips,
                 e.g. ["Docker", "DevOps"]. Use [] or remove the line
                 if you don't want tags.
   link        : OPTIONAL → { "label": "...", "url": "..." } shows a
                 clickable button inside the modal (e.g. link to the
                 YouTube video, article, or meeting notes). Remove the
                 whole "link" line if not needed.

   NOTE: If you have more than one activity on the same day, just add
   a second object with the same "date" value — the modal will list
   every entry for that day together.
   =================================================================== */

const scheduleData = [

    {
        date: "2026-06-18",
        category: "Task",
        title: "MCQs for Skoolyst",
        description: "Added multiple-choice questions (MCQs) to Skoolyst's for English Subject with 4 new topics Sentence Correction & Common Errors, Reading Comprehension, Subject-Verb Agreement, Conditional Sentences. These MCQs will help students practice and improve their English skills effectively.",
        tags: ["New Post", "Social Media", "Skoolyst"],
        link: { label: "Skoolyst MCQs", url: "https://skoolyst.com/en/quiz/subject/english" }
    },
    {
        date: "2026-06-19",
        category: "Task",
        title: "Skoolyst Social Media Content Creation",
        description: " Created/Scheduled engaging social media content for Skoolyst posts, to promote our brand and connect with our audience across Facebook , Instagram, and LinkedIn.",
        tags: ["New Post", "Social Media", "Skoolyst"],
        link: { label: "Facebook", url: "https://www.facebook.com/skoolyst" }
    },
    {
        date: "2026-06-20",
        category: "Learning",
        title: "Docker Fundamentals",
        description: "Watched a comprehensive introduction to Docker on YouTube, covering why it is essential for modern software development and how it solves the common \"it works on my machine\" problem. Learned the core concepts of images, containers, and how Docker keeps environments consistent across development and production.",
        tags: ["Docker", "DevOps", "YouTube"],
        link: { label: "Watch on YouTube", url: "https://www.youtube.com/watch?v=H8Lyj2D_cWo&t=164s" }
    },
    {
        date: "2026-06-21",
        category: "Task",
        title: "Tawk.to Chat Widget Setup",
        description: "Implemented the Tawk.to live chat widget on the Skoolyst website to enhance customer support and engagement. Configured the widget's appearance and automated greetings to provide visitors with immediate assistance and improve user experience.",
        tags: ["Skoolyst", "Tawk.to", "Customer Support"],
        link: { label: "Visit Website", url: "https://www.skoolyst.com" }
    },
    {
        date: "2026-06-22",
        category: "Task",
        title: "Tawk.to AI Assist Integrated",
        description: "Set up Tawk.to live chat on the Skoolyst website with a custom-trained AI agent (Apollo). Configured a Pre-Chat form to capture visitor name, email, and phone, followed by a guided welcome flow with quick-reply options (What is SKOOLYST, How to find a school, School Owner / Parent-Student paths). Trained the agent on the website content and 12 FAQs so it can also answer general visitor questions automatically.",
        tags: ["Skoolyst", "Tawk.to", "AI Assist", "Customer Support"],
        link: { label: "Visit Website", url: "https://www.skoolyst.com" }
    },
    {
        date: "2026-06-23",
        category: "Experience",
        title: "Skoolyst digital marketing campaign",
        description: "Worked on Skoolyst's digital marketing campaign by creating promotional video scripts, social media posts, and branding content aimed at helping schools reach more parents and increase admissions.",
        tags: ["Digital Marketing","Skoolyst Branding","Admissions","Education"]

    },
    {
        date: "2026-06-24",
        category: "Experience",
        title: "Skoolyst digital marketing campaign",
        description: "Worked on Skoolyst's digital marketing campaign by creating promotional video scripts, social media posts, and branding content aimed at helping schools reach more parents and increase admissions.",
        tags: ["Digital Marketing","Skoolyst Branding","Admissions","Education"]
    },
    {
        date: "2026-06-24",
        category: "Task",
        title: "Legal-consultant app Fixes",
        description: "Fixes for the legalconsultant application 404 page on lawyers uploaded file is now fixed and the file is now downloadable. Also, also file uploaded to custom directory.",
        tags: ["Digital Marketing","Skoolyst Branding","Admissions","Education"],
        link: { label: "Visit Website", url: "https://lawyers.saifpindiautos.com/" }
    },
    {
        date: "2026-06-25",
        category: "Task",
        title: "Skoolyst Localization issue fixes",
        description: "Skoolyst Localization issue fixed for the urdu language switching was showing 404 page error on the website. Now the issue is fixed and also pushed the changes to the production server. Second I added new schools to the skoolyst database for the parents to find the schools in their city. The schools added are The Vantage - A British Curriculum School.",
        tags: ["Bug Fixing","School Registered"],
        link: { label: "Visit Website", url: "https://skoolyst.com/" }
    }
    /* 👇 Add your next entries below this line, comma-separated 👇

    {
        date: "2026-06-21",
        category: "Experience",
        title: "Fixed Vite build issue on shared hosting",
        description: "Resolved the Medical Store deployment issue where Vite assets needed to be committed to GitHub instead of built on the server.",
        tags: ["Laravel", "Vite", "Deployment"]
    },

    */

];
