/* English course materials. The structure is identical across all language files. */
window.COURSES = window.COURSES || {};
window.COURSES.en = [
 {
  "id": "upr",
  "name": "Institute of Management",
  "color": "#0f5c56",
  "about": "Courses on how public administration is organized and how it works.",
  "courses": [
   {
    "id": "aiethics",
    "title": "AI Ethics and Digital Risks",
    "topics": [
     {
      "id": "principles",
      "title": "Principles of Artificial Intelligence Ethics",
      "pages": [
       "<h3>Why the State Needs AI Ethics</h3>\n     <p>Artificial intelligence is increasingly involved in decisions that affect citizens: allocating benefits, reviewing applications, detecting violations. An algorithmic error in the public sector affects thousands of people at once, and a citizen cannot simply “switch to another provider”.</p>\n     <div class=\"term\"><b>Key concept</b>Responsible AI is an approach in which an AI system is designed and used so that it is lawful, safe, fair and subject to human oversight.</div>\n     <p>For a civil servant, therefore, AI ethics is not philosophy but part of managerial responsibility: who is accountable for a decision made with the help of an algorithm, and how can it be appealed?</p>",
       "<h3>International Reference Points</h3>\n     <p>Most national strategies draw on a few key international documents.</p>\n     <ul><li><b>OECD AI Principles (2019)</b> — the first intergovernmental standard: inclusive growth, respect for human rights, transparency, robustness and accountability.</li>\n     <li><b>UNESCO Recommendation on the Ethics of AI (2021)</b> — a global document adopted by UNESCO Member States, with an emphasis on human rights, diversity and the environment.</li>\n     <li><b>EU Artificial Intelligence Act (AI Act, 2024)</b> — the first comprehensive law, which classifies AI systems by level of risk.</li></ul>",
       "<h3>Five Principles in Practice</h3>\n     <ol><li><b>Fairness</b> — the system does not discriminate against groups of citizens.</li>\n     <li><b>Transparency</b> — people know when they are interacting with AI and can obtain an explanation of a decision.</li>\n     <li><b>Accountability</b> — behind every decision there is a responsible body and a responsible official.</li>\n     <li><b>Human oversight</b> — a person can intervene, correct or overturn the system’s decision.</li>\n     <li><b>Safety and privacy</b> — data are protected, and the system is resilient to failures and attacks.</li></ol>"
      ],
      "quiz": [
       {
        "q": "Which document became the first intergovernmental standard on AI?",
        "o": [
         "OECD AI Principles (2019)",
         "UN Charter",
         "Paris Agreement on climate change"
        ],
        "a": 0,
        "e": "The OECD Principles were adopted in 2019 and formed the basis of many national strategies."
       },
       {
        "q": "What does the principle of human oversight mean?",
        "o": [
         "AI operates without human involvement",
         "A person can intervene, correct or overturn the system’s decision",
         "A person enters data manually"
        ],
        "a": 1,
        "e": "Final responsibility and the ability to intervene remain with a human."
       },
       {
        "q": "Why is an AI error in the public sector especially dangerous?",
        "o": [
         "It affects many citizens at once, and they have no alternative",
         "The public sector does not use data",
         "AI errors always go unnoticed"
        ],
        "a": 0,
        "e": "The scale of public services and the lack of alternatives raise the cost of an error."
       }
      ]
     },
     {
      "id": "bias",
      "title": "Algorithmic Bias and Transparency",
      "pages": [
       "<h3>Where Bias Comes From</h3>\n     <p>An algorithm learns from historical data. If past decisions were unfair to a particular group, the model may reproduce and even amplify that unfairness.</p>\n     <ul><li><b>Data bias</b> — the sample is incomplete or distorted (for example, there is little data on rural residents).</li>\n     <li><b>Feature bias</b> — the model uses proxy features correlated with gender, age or place of residence.</li>\n     <li><b>Deployment bias</b> — the system is used for a task other than the one it was trained for.</li></ul>",
       "<h3>Explainability of Decisions</h3>\n     <p>A citizen who has been refused has the right to understand why. To make this possible, explainable models are used, or tools that show which factors most influenced the outcome.</p>\n     <div class=\"term\"><b>Key concept</b>Explainable AI (XAI) refers to methods that make a model’s decision logic understandable to humans.</div>\n     <p>If a decision cannot be explained, it should not be applied automatically in sensitive areas such as social support, law enforcement and healthcare.</p>",
       "<h3>Algorithmic Impact Assessment</h3>\n     <p>Before a system is launched, an impact assessment is carried out: what data are used, who is affected by the decision, what errors are possible and how a citizen can appeal the outcome.</p>\n     <p>After launch, the system is regularly audited: results for different groups are compared and a brief report is published. This builds trust and helps detect failures in time.</p>"
      ],
      "quiz": [
       {
        "q": "What is most often the source of algorithmic bias?",
        "o": [
         "Distorted historical data",
         "The colour of the interface",
         "Internet speed"
        ],
        "a": 0,
        "e": "A model reproduces the patterns in the data it was trained on, including unfair ones."
       },
       {
        "q": "What is explainable AI (XAI)?",
        "o": [
         "AI that writes texts",
         "Methods that make decision logic understandable to humans",
         "AI without data"
        ],
        "a": 1,
        "e": "XAI helps to understand which factors influenced a decision."
       },
       {
        "q": "When is an algorithmic impact assessment carried out?",
        "o": [
         "Only after complaints",
         "Before the system is launched and then regularly",
         "Never"
        ],
        "a": 1,
        "e": "The assessment is carried out before launch, followed by regular audits."
       }
      ]
     },
     {
      "id": "risks",
      "title": "Digital Risks and Their Management",
      "pages": [
       "<h3>Key Digital Risks</h3>\n     <ul><li><b>Personal data breaches</b> — loss of trust and violation of citizens’ rights.</li>\n     <li><b>Cyberattacks</b> — ransomware, hacking of government systems, denial of service.</li>\n     <li><b>Deepfakes and disinformation</b> — fake videos and texts issued in the name of government bodies.</li>\n     <li><b>Vendor lock-in</b> — an agency cannot switch systems or retrieve its own data.</li></ul>",
       "<h3>The Risk-Based Approach</h3>\n     <p>The EU AI Act divides systems into four levels of risk. The higher the risk, the stricter the requirements.</p>\n     <ol><li><b>Unacceptable</b> — prohibited (for example, social scoring of citizens by the state).</li>\n     <li><b>High</b> — strict requirements for data, documentation and human oversight (education, employment, access to public services).</li>\n     <li><b>Limited</b> — transparency obligations (a chatbot must disclose that it is not a human).</li>\n     <li><b>Minimal</b> — no specific requirements (spam filters).</li></ol>",
       "<h3>Digital Hygiene for Civil Servants</h3>\n     <p>Most incidents begin with human error. Simple rules reduce the risk many times over:</p>\n     <ul><li>use two-factor authentication in all work systems;</li><li>do not upload official documents to public AI services;</li><li>check the sender and links in emails;</li><li>report incidents immediately rather than concealing them.</li></ul>\n     <div class=\"term\"><b>Key concept</b>Phishing is deception aimed at obtaining a password or access, most often through a fake email or website.</div>"
      ],
      "quiz": [
       {
        "q": "Under the AI Act, which risk level applies to social scoring of citizens by the state?",
        "o": [
         "Minimal",
         "Limited",
         "Unacceptable"
        ],
        "a": 2,
        "e": "Such systems are prohibited in the EU."
       },
       {
        "q": "Which requirement applies to limited-risk systems such as chatbots?",
        "o": [
         "A complete ban",
         "An obligation to disclose that the user is interacting with AI",
         "No requirements at all"
        ],
        "a": 1,
        "e": "This is a transparency requirement."
       },
       {
        "q": "Which action by a civil servant violates digital hygiene?",
        "o": [
         "Enabling two-factor authentication",
         "Uploading an official document to a public AI service",
         "Reporting an incident"
        ],
        "a": 1,
        "e": "Official data must not be shared with external public services."
       }
      ]
     }
    ]
   },
   {
    "id": "osn",
    "title": "Fundamentals of Public Administration",
    "topics": [
     {
      "id": "gos",
      "title": "The State and Public Administration",
      "pages": [
       "<h3>What Is Public Administration</h3>\n       <p>Public administration is the activity of government bodies in organizing public life: making decisions, implementing them and monitoring the results. Unlike managing a company, the goal here is not profit but public benefit and compliance with the law.</p>\n       <div class=\"term\"><b>Key concept</b>Public value is an outcome that citizens consider important: security, accessible services, trust in institutions.</div>\n       <p>Administration rests on three pillars: a legal framework (laws and secondary legislation), an organizational structure (ministries, agencies, local authorities) and resources (budget, staff, data).</p>",
       "<h3>Branches of Power and Levels of Government</h3>\n       <p>The principle of separation of powers distributes functions among the legislative, executive and judicial branches. Public administration in the narrow sense is primarily the work of the executive branch.</p>\n       <ul><li><b>Central level</b> — the government and ministries set policy and standards.</li>\n       <li><b>Regional level</b> — regional authorities adapt policy to local conditions.</li>\n       <li><b>Local level</b> — local authorities deliver services directly to citizens.</li></ul>\n       <p>The distribution of powers among levels is called decentralization. The closer a decision is to the citizen, the better it reflects local needs, but the more important common standards and quality control become.</p>"
      ],
      "quiz": [
       {
        "q": "What is the main goal of public administration?",
        "o": [
         "Making a profit",
         "Creating public benefit within the law",
         "Reducing the number of civil servants"
        ],
        "a": 1,
        "e": "Public administration is oriented towards public benefit, not profit."
       },
       {
        "q": "Which branch of power primarily carries out public administration in the narrow sense?",
        "o": [
         "Judicial",
         "Legislative",
         "Executive"
        ],
        "a": 2,
        "e": "Implementing laws and delivering services is the task of the executive branch."
       },
       {
        "q": "The transfer of powers from the central to the local level is called…",
        "o": [
         "Decentralization",
         "Privatization",
         "Codification"
        ],
        "a": 0,
        "e": "Decentralization brings decisions closer to citizens."
       }
      ]
     },
     {
      "id": "models",
      "title": "Models of Public Administration",
      "pages": [
       "<h3>The Bureaucratic Model</h3>\n       <p>The classical model described by Max Weber is based on hierarchy, written rules, specialization and merit-based selection. Its strengths are predictability and equal treatment of everyone.</p>\n       <div class=\"term\"><b>Key concept</b>Rational bureaucracy is an organization in which decisions are made according to formal rules rather than personal connections.</div>\n       <p>Its weaknesses appear when rules become an end in themselves: decisions slow down and citizens face excessive procedures.</p>",
       "<h3>New Public Management</h3>\n       <p>Since the 1980s, many countries have brought business methods into the public sector: performance indicators, competition among service providers and a focus on the “customer”.</p>\n       <ul><li>management by results and KPIs;</li><li>outsourcing and public–private partnerships;</li><li>greater autonomy for managers.</li></ul>\n       <p>Critics point out that a citizen is more than a customer, and that measurable indicators do not always reflect public value.</p>",
       "<h3>Good Governance</h3>\n       <p>The modern approach emphasizes the quality of interaction between the state and society. Its principles are accountability, transparency, citizen participation, the rule of law, effectiveness and inclusiveness.</p>\n       <p>In practice, the models coexist: a single ministry may combine strict procedures, KPIs and open consultations with citizens.</p>"
      ],
      "quiz": [
       {
        "q": "Who described the model of rational bureaucracy?",
        "o": [
         "Max Weber",
         "Adam Smith",
         "Woodrow Wilson"
        ],
        "a": 0,
        "e": "The model of rational bureaucracy is associated with Max Weber."
       },
       {
        "q": "Which tool is characteristic of New Public Management?",
        "o": [
         "Lifetime employment without appraisal",
         "Key performance indicators (KPIs)",
         "Abandoning budget planning"
        ],
        "a": 1,
        "e": "NPM brings management by results into the public sector."
       },
       {
        "q": "Which principle does NOT belong to good governance?",
        "o": [
         "Transparency",
         "Accountability",
         "Keeping decisions closed to citizens"
        ],
        "a": 2,
        "e": "Good governance requires openness and citizen participation."
       }
      ]
     },
     {
      "id": "digital",
      "title": "Digital Government",
      "pages": [
       "<h3>From E-Government to Digital Government</h3>\n       <p>E-government moves existing services online: an application can be submitted through a portal instead of visiting an agency. Digital government goes further and redesigns the processes themselves around data.</p>\n       <div class=\"term\"><b>Key concept</b>A proactive service is a service that the state provides on its own initiative, without an application from the citizen, based on data it already holds.</div>",
       "<h3>Data and Artificial Intelligence</h3>\n       <p>Inter-agency data exchange means citizens no longer have to provide certificates the state already has. Algorithms help forecast hospital workloads, detect risks in procurement and sort citizen requests.</p>\n       <p>Along with the opportunities, the risks grow too: personal data protection, the explainability of algorithmic decisions and the digital divide. That is why the introduction of AI is accompanied by ethical rules and human oversight.</p>"
      ],
      "quiz": [
       {
        "q": "How does digital government differ from e-government?",
        "o": [
         "Only by having a website",
         "By redesigning processes around data",
         "By abandoning laws"
        ],
        "a": 1,
        "e": "Digital government changes the processes themselves, not just the submission channel."
       },
       {
        "q": "What is a proactive service?",
        "o": [
         "A service provided without an application, based on existing data",
         "A paid express service",
         "A service available only at a Public Service Center"
        ],
        "a": 0,
        "e": "The state initiates the service itself when a life event occurs."
       },
       {
        "q": "Which risk is associated with the use of AI in public administration?",
        "o": [
         "Processing speed that is too slow",
         "Unexplainable algorithmic decisions",
         "Too many paper documents"
        ],
        "a": 1,
        "e": "Algorithmic decisions must be understandable and verifiable."
       }
      ]
     }
    ]
   },
   {
    "id": "proj",
    "title": "Project Management in the Public Sector",
    "topics": [
     {
      "id": "cycle",
      "title": "The Project Life Cycle",
      "pages": [
       "<h3>A Project and Its Phases</h3>\n       <p>A project is a temporary endeavour undertaken to create a unique result: a new service, an information system or an infrastructure facility. A project has a start, an end, a budget and a measurable goal.</p>\n       <ol><li><b>Initiation</b> — the business case and the project charter.</li><li><b>Planning</b> — timelines, resources, team.</li><li><b>Execution</b> — work on the deliverable.</li><li><b>Monitoring</b> — comparing plan against actual.</li><li><b>Closure</b> — acceptance and lessons learned.</li></ol>",
       "<h3>Features of Public-Sector Projects</h3>\n       <p>Government projects depend on the budget cycle and procurement procedures, and their results are measured not by profit but by their impact on citizens. Stakeholders therefore play a special role: partner agencies, local authorities and public councils.</p>\n       <div class=\"term\"><b>Key concept</b>A project management office is a unit that sets the methodology and oversees the agency’s project portfolio.</div>"
      ],
      "quiz": [
       {
        "q": "Which feature distinguishes a project from ongoing operations?",
        "o": [
         "It never ends",
         "It is temporary and creates a unique result",
         "It does not require a budget"
        ],
        "a": 1,
        "e": "A project is limited in time and aimed at a unique result."
       },
       {
        "q": "In which phase is the project charter drawn up?",
        "o": [
         "Initiation",
         "Execution",
         "Closure"
        ],
        "a": 0,
        "e": "The charter is prepared during initiation."
       },
       {
        "q": "Who sets the project methodology in an agency?",
        "o": [
         "The accounting department",
         "The project management office",
         "The press office"
        ],
        "a": 1,
        "e": "The project management office is responsible for methodology and the portfolio."
       }
      ]
     },
     {
      "id": "risk",
      "title": "Risks and Indicators",
      "pages": [
       "<h3>Risk Management</h3>\n       <p>A risk is an event that may occur and affect the project’s objectives. Risks are assessed along two axes: probability and impact. Multiplying these scores helps set priorities.</p>\n       <p>Response strategies: avoid, mitigate, transfer (for example, through a contract) or accept, having prepared a contingency reserve in advance.</p>",
       "<h3>SMART Indicators</h3>\n       <p>A good indicator meets the SMART criteria: specific, measurable, achievable, relevant and time-bound.</p>\n       <div class=\"term\"><b>Example</b>Not “improve the service”, but “reduce the time to issue a certificate from 5 working days to 1 by December”.</div>"
      ],
      "quiz": [
       {
        "q": "Along which two axes is risk assessed?",
        "o": [
         "Cost and time",
         "Probability and impact",
         "Department and position"
        ],
        "a": 1,
        "e": "Probability × impact gives the priority of a risk."
       },
       {
        "q": "Risk transfer is, for example…",
        "o": [
         "Insurance or a contract with a contractor",
         "Ignoring the risk",
         "Cancelling the project"
        ],
        "a": 0,
        "e": "The risk is transferred to a third party through a contract or insurance."
       },
       {
        "q": "Which indicator meets the SMART criteria?",
        "o": [
         "Improve the quality of work",
         "Reduce the service time to 1 day by December",
         "Try harder"
        ],
        "a": 1,
        "e": "It is specific, measurable and time-bound."
       }
      ]
     }
    ]
   }
  ]
 },
 {
  "id": "dip",
  "name": "Institute of Diplomacy",
  "color": "#2d4f8a",
  "about": "Courses on foreign policy, the diplomatic service and international organizations.",
  "courses": [
   {
    "id": "govtech",
    "title": "International Digital Leadership and GovTech",
    "topics": [
     {
      "id": "govtech-basics",
      "title": "GovTech and the Digital Transformation of Government",
      "pages": [
       "<h3>What Is GovTech</h3>\n     <p>GovTech is an approach to modernizing government in which services are built around citizens’ needs, and technology, data and modern management methods are used as a single, integrated system.</p>\n     <div class=\"term\"><b>Key concept</b>Digital transformation is a change in the processes and operating model of government itself, not merely the conversion of paper procedures into electronic form.</div>",
       "<h3>Digital Public Infrastructure</h3>\n     <p>The foundation of a modern digital state is digital public infrastructure (DPI) — shared “building blocks” used by all agencies and businesses:</p>\n     <ul><li><b>digital identity</b> — citizens verify their identity online;</li><li><b>digital payments</b> — fast transfers between the state, citizens and businesses;</li><li><b>data exchange</b> — agencies obtain information from one another without requiring certificates.</li></ul>",
       "<h3>How GovTech Maturity Is Measured</h3>\n     <p>The World Bank calculates the GovTech Maturity Index (GTMI). It assesses four areas: core government systems, public service delivery, citizen engagement and GovTech enablers.</p>\n     <p>The index helps countries benchmark themselves against others and identify weak spots: for example, strong online services but weak citizen engagement.</p>"
      ],
      "quiz": [
       {
        "q": "How does digital transformation differ from simple digitization?",
        "o": [
         "The processes and operating model themselves change",
         "New computers are purchased",
         "Documents are scanned to PDF"
        ],
        "a": 0,
        "e": "Transformation redesigns processes, not just the format of documents."
       },
       {
        "q": "What does digital public infrastructure (DPI) include?",
        "o": [
         "Digital identity, payments and data exchange",
         "Only the ministry website",
         "Officials’ social media accounts"
        ],
        "a": 0,
        "e": "These are the three core elements of DPI."
       },
       {
        "q": "Which organization calculates the GovTech Maturity Index (GTMI)?",
        "o": [
         "The World Bank",
         "FIFA",
         "OPEC"
        ],
        "a": 0,
        "e": "The GTMI was developed by the World Bank."
       }
      ]
     },
     {
      "id": "leaders",
      "title": "International Experience of Digital Leaders",
      "pages": [
       "<h3>How Digital Governments Are Compared</h3>\n     <p>Every two years the United Nations publishes the E-Government Survey and calculates the E-Government Development Index (EGDI). It combines three components: online services, telecommunications infrastructure and human capital.</p>\n     <div class=\"term\"><b>Key concept</b>The EGDI is a UN index that shows a state’s readiness and capacity to use ICT to deliver services.</div>",
       "<h3>Lessons from the Leaders</h3>\n     <ul><li><b>Estonia</b> — the X-Road data exchange platform and the “once-only” principle: the state does not ask citizens for data it already holds.</li>\n     <li><b>Singapore</b> — a unified digital identity and a strong in-house team of government developers.</li>\n     <li><b>Republic of Korea</b> — long-term planning and high digital literacy among the population.</li>\n     <li><b>Denmark</b> — “digital by default”: interaction with the state takes place online by default.</li></ul>",
       "<h3>How to Transfer Experience</h3>\n     <p>Directly copying other countries’ solutions rarely works. Before borrowing, ask: what problem was the country solving, what conditions did it have (laws, infrastructure, trust), and which of these do we have?</p>\n     <p>International cooperation (expert exchanges, joint projects, participation in rankings) accelerates learning and helps avoid others’ mistakes.</p>"
      ],
      "quiz": [
       {
        "q": "Which components does the UN EGDI combine?",
        "o": [
         "Online services, telecommunications infrastructure and human capital",
         "GDP, exports and inflation",
         "The number of ministries"
        ],
        "a": 0,
        "e": "The EGDI consists of three sub-indices."
       },
       {
        "q": "What does the “once-only” principle mean?",
        "o": [
         "A service is provided once a year",
         "The state does not ask citizens for data it already holds",
         "A password is entered once in a lifetime"
        ],
        "a": 1,
        "e": "This principle is implemented, for example, in Estonia through X-Road."
       },
       {
        "q": "What should be done before borrowing a foreign solution?",
        "o": [
         "Copy it in full",
         "Analyse the problem and the conditions in which it worked",
         "Skip the analysis"
        ],
        "a": 1,
        "e": "A solution works in a context, and that context must be compared."
       }
      ]
     },
     {
      "id": "digital-leader",
      "title": "Digital Leadership in the Civil Service",
      "pages": [
       "<h3>Who Is a Digital Leader</h3>\n     <p>A digital leader is a manager who understands what technology can do and knows how to change the way an organization works so that citizens get better outcomes. They do not need to be able to code, but they do need to ask the right questions.</p>\n     <div class=\"term\"><b>Key concept</b>A CDO (Chief Digital Officer) is the executive responsible for an agency’s digital transformation.</div>",
       "<h3>Key Competencies</h3>\n     <ul><li><b>Citizen-centricity</b> — designing services around citizens’ life events.</li>\n     <li><b>Working with data</b> — decisions based on facts and metrics.</li>\n     <li><b>Agile methods</b> — rapid iterations and testing with users.</li>\n     <li><b>Change management</b> — engaging staff and overcoming resistance.</li>\n     <li><b>Ethics and security</b> — responsible use of data and AI.</li></ul>",
       "<h3>How to Start a Transformation</h3>\n     <ol><li>Choose one service that citizens use often and find frustrating.</li><li>Interview users and map their journey.</li><li>Build a simple prototype and test it with real people.</li><li>Measure the result: time, number of requests, satisfaction.</li><li>Scale up what works.</li></ol>\n     <p>A small success story gives the team confidence and earns management support for the next steps.</p>"
      ],
      "quiz": [
       {
        "q": "Who is a CDO?",
        "o": [
         "The executive responsible for digital transformation",
         "The agency’s accountant",
         "An external auditor"
        ],
        "a": 0,
        "e": "The Chief Digital Officer is responsible for digital transformation."
       },
       {
        "q": "Where is it best to start a digital transformation?",
        "o": [
         "By purchasing the most expensive software",
         "With one service that citizens use often and find frustrating",
         "By renaming a department"
        ],
        "a": 1,
        "e": "A small, visible result builds support for scaling up."
       },
       {
        "q": "What is characteristic of Agile methods?",
        "o": [
         "A 10-year plan with no changes",
         "Rapid iterations and testing with users",
         "Rejecting feedback"
        ],
        "a": 1,
        "e": "Agile relies on short cycles and feedback."
       }
      ]
     }
    ]
   },
   {
    "id": "basics",
    "title": "Fundamentals of Diplomacy",
    "topics": [
     {
      "id": "func",
      "title": "Diplomacy: Concept and Functions",
      "pages": [
       "<h3>What Is Diplomacy</h3>\n       <p>Diplomacy is the conduct of official relations between states by peaceful means: negotiations, correspondence and participation in international organizations. Its foundation is the Vienna Convention on Diplomatic Relations of 1961.</p>\n       <div class=\"term\"><b>Key concept</b>Agrément is the consent of the receiving state to the appointment of a specific person as head of a diplomatic mission.</div>",
       "<h3>Functions of an Embassy</h3>\n       <ul><li>representing the sending state;</li><li>protecting the interests of the state and its nationals;</li><li>negotiating with the government of the receiving state;</li><li>ascertaining, by all lawful means, conditions and developments in the receiving state;</li><li>promoting economic, cultural and scientific relations.</li></ul>\n       <p>Consular posts complement the work of the embassy and deal primarily with documents and assistance to citizens.</p>"
      ],
      "quiz": [
       {
        "q": "Which document governs diplomatic relations?",
        "o": [
         "The 1961 Vienna Convention",
         "The WTO Agreement",
         "The Paris Agreement"
        ],
        "a": 0,
        "e": "The Vienna Convention on Diplomatic Relations was adopted in 1961."
       },
       {
        "q": "What is agrément?",
        "o": [
         "A type of visa",
         "The receiving state’s consent to the appointment of an ambassador",
         "A note of protest"
        ],
        "a": 1,
        "e": "Without agrément, an ambassador cannot take up their post."
       },
       {
        "q": "Who primarily helps citizens with documents abroad?",
        "o": [
         "The consulate",
         "The Ministry of Finance",
         "Parliament"
        ],
        "a": 0,
        "e": "This is the main task of consular posts."
       }
      ]
     },
     {
      "id": "protocol",
      "title": "Diplomatic Protocol",
      "pages": [
       "<h3>Rules and Precedence</h3>\n       <p>Protocol is a set of rules for conducting official events: visits, receptions and negotiations. It removes uncertainty and demonstrates respect for the partner.</p>\n       <p>The precedence of heads of mission is determined by the date on which they presented their credentials. The ambassador who is most senior by this criterion becomes the dean (doyen) of the diplomatic corps.</p>",
       "<h3>Diplomatic Documents</h3>\n       <p>The main form of correspondence is the note. A personal note is written in the first person and signed; a note verbale is written in the third person and stamped with a seal.</p>\n       <div class=\"term\"><b>Key concept</b>Letters of credence are the document certifying an ambassador’s authority; they are presented to the head of the receiving state.</div>"
      ],
      "quiz": [
       {
        "q": "How is the precedence of ambassadors determined?",
        "o": [
         "By age",
         "By the date of presentation of credentials",
         "By the size of the country"
        ],
        "a": 1,
        "e": "The order of precedence follows the date of presentation of credentials."
       },
       {
        "q": "Who is the doyen?",
        "o": [
         "The most senior head of mission by precedence",
         "The embassy interpreter",
         "The minister of protocol"
        ],
        "a": 0,
        "e": "The doyen heads the diplomatic corps."
       },
       {
        "q": "Which note is written in the third person?",
        "o": [
         "A personal note",
         "A note verbale",
         "A collective memorandum"
        ],
        "a": 1,
        "e": "A note verbale is written in the third person and stamped with a seal."
       }
      ]
     },
     {
      "id": "neg",
      "title": "International Negotiations",
      "pages": [
       "<h3>Preparing for Negotiations</h3>\n       <p>Around 80% of a negotiation’s success depends on preparation: analysing the parties’ interests, positions and alternatives. A position is what a party states; an interest is what it actually needs.</p>\n       <div class=\"term\"><b>Key concept</b>BATNA is the best alternative to a negotiated agreement. The stronger it is, the more confident the negotiating position.</div>",
       "<h3>The Course of Negotiations</h3>\n       <p>Negotiations usually go through several stages: clarifying positions, discussing options and agreeing on wording. The outcome is recorded in a communiqué, a memorandum or a treaty.</p>\n       <p>Multilateral negotiations are more complex than bilateral ones: participants form coalitions, and decisions are often sought by consensus.</p>"
      ],
      "quiz": [
       {
        "q": "How does an interest differ from a position?",
        "o": [
         "There is no difference",
         "An interest is a real need; a position is a stated demand",
         "A position is always secret"
        ],
        "a": 1,
        "e": "Working with interests opens up more options for a solution."
       },
       {
        "q": "What does BATNA mean?",
        "o": [
         "The best alternative to an agreement",
         "A type of diplomatic note",
         "An international organization"
        ],
        "a": 0,
        "e": "BATNA is the reference point for deciding whether or not to agree."
       },
       {
        "q": "How are decisions most often made in multilateral negotiations?",
        "o": [
         "By drawing lots",
         "By consensus",
         "Only by decision of the chair"
        ],
        "a": 1,
        "e": "Consensus is a common decision-making method in multilateral settings."
       }
      ]
     }
    ]
   },
   {
    "id": "io",
    "title": "International Organizations",
    "topics": [
     {
      "id": "un",
      "title": "The United Nations",
      "pages": [
       "<h3>The UN Charter and Purposes</h3>\n       <p>The UN was founded in 1945. Its purposes are to maintain international peace and security, to develop friendly relations among nations, to achieve international cooperation and to promote human rights.</p>",
       "<h3>Principal Organs</h3>\n       <ul><li><b>General Assembly</b> — all Member States, one vote each.</li><li><b>Security Council</b> — 15 members, 5 of them permanent with the right of veto.</li><li><b>Economic and Social Council</b>.</li><li><b>International Court of Justice</b> in The Hague.</li><li><b>Secretariat</b>, headed by the Secretary-General.</li></ul>"
      ],
      "quiz": [
       {
        "q": "In what year was the UN founded?",
        "o": [
         "1919",
         "1945",
         "1991"
        ],
        "a": 1,
        "e": "The UN Charter entered into force in 1945."
       },
       {
        "q": "How many permanent members does the Security Council have?",
        "o": [
         "5",
         "10",
         "15"
        ],
        "a": 0,
        "e": "The five permanent members have the right of veto."
       },
       {
        "q": "Where is the UN International Court of Justice located?",
        "o": [
         "New York",
         "Geneva",
         "The Hague"
        ],
        "a": 2,
        "e": "The International Court of Justice sits in The Hague."
       }
      ]
     },
     {
      "id": "reg",
      "title": "Regional Organizations",
      "pages": [
       "<h3>Why Regional Groupings Are Needed</h3>\n       <p>Regional organizations address issues that are easier for neighbours to agree on: trade, transport, border security and water resources. They may be economic, political or military-political.</p>",
       "<h3>Examples and Forms of Integration</h3>\n       <p>The stages of economic integration are: free trade area, customs union, common market and economic union. Each subsequent stage requires transferring more powers to supranational bodies.</p>\n       <div class=\"term\"><b>Key concept</b>A supranational body is a body whose decisions are binding on member states without the separate consent of each one.</div>"
      ],
      "quiz": [
       {
        "q": "Which stage of integration comes after a free trade area?",
        "o": [
         "Customs union",
         "Economic union",
         "Common market"
        ],
        "a": 0,
        "e": "A customs union adds a common external tariff."
       },
       {
        "q": "What is characteristic of a supranational body?",
        "o": [
         "Its decisions are advisory",
         "Its decisions are binding on members",
         "It consists of private individuals"
        ],
        "a": 1,
        "e": "Supranational decisions are binding."
       },
       {
        "q": "Which task do regional organizations most often address?",
        "o": [
         "Coordinating trade and transport among neighbouring countries",
         "Electing a president",
         "Appointing judges"
        ],
        "a": 0,
        "e": "The regional level is well suited to shared issues among neighbours."
       }
      ]
     }
    ]
   }
  ]
 },
 {
  "id": "nsgp",
  "name": "National School of Public Policy",
  "color": "#8a4a1f",
  "about": "Courses for senior managers: policy analysis, leadership and public service values.",
  "courses": [
   {
    "id": "policy",
    "title": "Public Policy Analysis",
    "topics": [
     {
      "id": "pcycle",
      "title": "The Policy Cycle",
      "pages": [
       "<h3>Stages of the Policy Cycle</h3>\n       <p>The policy cycle model describes the path of a decision from a problem to the evaluation of results.</p>\n       <ol><li>Agenda setting — the problem is recognized as important.</li><li>Policy formulation (developing alternatives).</li><li>Decision-making.</li><li>Implementation.</li><li>Evaluation and adjustment.</li></ol>",
       "<h3>Limitations of the Model</h3>\n       <p>In reality, the stages overlap, and decisions are often made under time pressure. The model is useful as a map: it suggests which questions to ask at each step.</p>\n       <div class=\"term\"><b>Key concept</b>A window of opportunity is a moment when the problem, a solution and political will coincide, making change possible.</div>"
      ],
      "quiz": [
       {
        "q": "With which stage does the policy cycle begin?",
        "o": [
         "Evaluation",
         "Agenda setting",
         "Implementation"
        ],
        "a": 1,
        "e": "First, the problem must get onto the agenda."
       },
       {
        "q": "What is a window of opportunity?",
        "o": [
         "The deadline for submitting a budget request",
         "The coincidence of a problem, a solution and political will",
         "A break between parliamentary sessions"
        ],
        "a": 1,
        "e": "The concept comes from Kingdon’s multiple streams model."
       },
       {
        "q": "What is a drawback of the cycle model?",
        "o": [
         "In reality, the stages overlap",
         "It is too short",
         "It prohibits evaluation"
        ],
        "a": 0,
        "e": "The model is a simplification of the real process."
       }
      ]
     },
     {
      "id": "tools",
      "title": "Policy Instruments",
      "pages": [
       "<h3>Three Groups of Instruments</h3>\n       <p>The state influences the behaviour of people and organizations in three main ways, known as “sticks, carrots and sermons”.</p>\n       <ul><li><b>Regulation</b> — prohibitions, standards, licences.</li><li><b>Economic incentives</b> — taxes, subsidies, grants.</li><li><b>Information</b> — campaigns, ratings, labelling.</li></ul>",
       "<h3>Behavioural Instruments</h3>\n       <p>A nudge changes behaviour without bans or money: through convenient default options, reminders and comparisons with neighbours. One example is automatic enrolment in a savings scheme with the right to opt out.</p>\n       <p>The choice of instrument depends on the goal, the cost, citizens’ readiness and the state’s capacity to enforce compliance.</p>"
      ],
      "quiz": [
       {
        "q": "A subsidy belongs to…",
        "o": [
         "Regulation",
         "Economic incentives",
         "Information instruments"
        ],
        "a": 1,
        "e": "A subsidy is a “carrot”, an economic incentive."
       },
       {
        "q": "What is a nudge?",
        "o": [
         "A gentle push without bans or money",
         "A fine",
         "A new tax"
        ],
        "a": 0,
        "e": "A nudge changes the choice architecture."
       },
       {
        "q": "An example of an information instrument:",
        "o": [
         "A licence",
         "Product labelling",
         "An excise duty"
        ],
        "a": 1,
        "e": "Labelling gives people information on which to base their choices."
       }
      ]
     },
     {
      "id": "ria",
      "title": "Policy Evaluation and RIA",
      "pages": [
       "<h3>Regulatory Impact Assessment</h3>\n       <p>RIA is a procedure for assessing the consequences of new regulation before it is adopted: who will benefit, who will bear the costs, and whether there are less burdensome alternatives.</p>\n       <div class=\"term\"><b>Key concept</b>The baseline (zero option) is the “do nothing” scenario against which all alternatives are compared.</div>",
       "<h3>Evaluating Results</h3>\n       <p>After implementation, a policy is evaluated: were the goals achieved, at what cost, and why? A distinction is made between process evaluation (how it was implemented) and impact evaluation (what changed as a result of the policy).</p>\n       <p>Impact evaluation requires a control group or a “before and after” comparison that takes external factors into account.</p>",
       "<h3>Using the Findings</h3>\n       <p>An evaluation is useful only if its findings feed into the next decision cycle. That is why the report is kept short, with clear recommendations and deadlines, and is published for the public.</p>"
      ],
      "quiz": [
       {
        "q": "When is RIA carried out?",
        "o": [
         "Before regulation is adopted",
         "Only after 10 years",
         "Never in the public sector"
        ],
        "a": 0,
        "e": "RIA is an assessment carried out before a decision is made."
       },
       {
        "q": "What is the zero option?",
        "o": [
         "Repealing all laws",
         "The “do nothing” scenario",
         "A budget with no expenditure"
        ],
        "a": 1,
        "e": "All alternatives are compared against it."
       },
       {
        "q": "What is needed for an impact evaluation?",
        "o": [
         "A control group or a sound comparison",
         "Only the manager’s opinion",
         "The number of meetings held"
        ],
        "a": 0,
        "e": "Without a comparison, the effect of the policy cannot be separated from external factors."
       }
      ]
     }
    ]
   },
   {
    "id": "lead",
    "title": "Leadership and Ethics in the Civil Service",
    "topics": [
     {
      "id": "leader",
      "title": "Leadership in the Public Sector",
      "pages": [
       "<h3>Leadership Styles</h3>\n       <p>A transactional leader manages through tasks, control and rewards. A transformational leader inspires people with a shared purpose and develops them. Servant leadership places the needs of the team and of citizens at the centre.</p>",
       "<h3>Adaptive Leadership</h3>\n       <p>Many public-sector challenges have no ready-made solutions: climate change, demographics, trust in institutions. An adaptive leader does not hand down an answer from above but organizes a joint search for a solution involving those affected by the problem.</p>\n       <div class=\"term\"><b>Key concept</b>An adaptive challenge is a problem whose solution requires the participants themselves to change their values and habits.</div>"
      ],
      "quiz": [
       {
        "q": "Which style is based on control and rewards?",
        "o": [
         "Transactional",
         "Transformational",
         "Servant"
        ],
        "a": 0,
        "e": "A transactional leader exchanges rewards for results."
       },
       {
        "q": "What distinguishes an adaptive challenge?",
        "o": [
         "There is a ready-made instruction",
         "It requires participants to change their values and habits",
         "It can be solved with a single order"
        ],
        "a": 1,
        "e": "Technical problems are solved by experts; adaptive ones are solved together with the people involved."
       },
       {
        "q": "Servant leadership places at the centre…",
        "o": [
         "The leader’s personal career",
         "The needs of the team and of citizens",
         "Only formal procedures"
        ],
        "a": 1,
        "e": "The leader serves the team and society."
       }
      ]
     },
     {
      "id": "ethics",
      "title": "Ethics and Anti-Corruption",
      "pages": [
       "<h3>Public Service Values</h3>\n       <p>A code of ethics enshrines core values: integrity, impartiality, professionalism and respect for citizens. They help civil servants make decisions where the law does not give a clear-cut answer.</p>\n       <div class=\"term\"><b>Key concept</b>A conflict of interest is a situation in which a civil servant’s personal interest may influence the performance of their duties.</div>",
       "<h3>How to Act in a Conflict of Interest</h3>\n       <ol><li>Notify your manager in writing.</li><li>Recuse yourself from any decision on the matter.</li><li>If necessary, place the asset in trust.</li></ol>\n       <p>Corruption prevention rests on transparent procedures, digitalization of services (fewer face-to-face contacts) and protection for those who report wrongdoing.</p>"
      ],
      "quiz": [
       {
        "q": "What is a conflict of interest?",
        "o": [
         "A dispute between agencies",
         "The influence of personal interest on official decisions",
         "A disagreement within a team"
        ],
        "a": 1,
        "e": "The key point is the risk that personal interest may influence a decision."
       },
       {
        "q": "The first step in a conflict of interest:",
        "o": [
         "Conceal it",
         "Notify your manager in writing",
         "Resign"
        ],
        "a": 1,
        "e": "Notification is a mandatory first step."
       },
       {
        "q": "How does digitalization help fight corruption?",
        "o": [
         "It reduces face-to-face contacts with officials",
         "It raises salaries",
         "It abolishes oversight"
        ],
        "a": 0,
        "e": "Fewer face-to-face contacts mean fewer opportunities for abuse."
       }
      ]
     }
    ]
   }
  ]
 }
];
