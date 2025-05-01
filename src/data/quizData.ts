export type QuizQuestion = {
  id: number;
  query?: string;  // Optional search term for dynamic image fetch
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  topic?: string; // Add topic field for personalized feedback
  imageUrl?: string;
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  questions: QuizQuestion[];
};

export type Category = {
  id: string;
  title: string;
  description: string;
  icon: string;
  quizzes: Quiz[];
  directQuiz?: Quiz; // For categories that directly start a quiz (AI, GK)
};

// Function to get today's daily quiz
export const getDailyQuiz = (): Quiz => {
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const storedDateString = localStorage.getItem('dailyQuizDate');
  
  // If we already generated a quiz for today, return it from localStorage
  if (storedDateString === dateString) {
    const storedQuiz = localStorage.getItem('dailyQuiz');
    if (storedQuiz) {
      return JSON.parse(storedQuiz);
    }
  }
  
  // Otherwise, generate a new daily quiz
  const allQuizzes = categories.flatMap(category => 
    category.quizzes.concat(category.directQuiz ? [category.directQuiz] : [])
  );
  
  // Get 5 random questions from all quizzes
  const allQuestions = allQuizzes.flatMap(quiz => quiz.questions);
  const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
  const selectedQuestions = shuffledQuestions.slice(0, 5);
  
  const dailyQuiz: Quiz = {
    id: "daily-quiz",
    title: "Daily Challenge",
    description: `Daily Challenge for ${today.toLocaleDateString()}`,
    icon: "calendar",
    difficulty: "medium",
    estimatedTime: "5 mins",
    questions: selectedQuestions
  };
  
  // Store in localStorage
  localStorage.setItem('dailyQuizDate', dateString);
  localStorage.setItem('dailyQuiz', JSON.stringify(dailyQuiz));
  
  return dailyQuiz;
};

export const categories: Category[] = [
  {
    id: "technology",
    title: "Technology",
    description: "Test your knowledge on programming languages and web development",
    icon: "code",
    quizzes: [
      {
        id: "python",
        title: "Python",
        description: "Test your Python programming skills",
        icon: "code",
        difficulty: "medium",
        estimatedTime: "5 mins",
        questions: [
          {
            id: 1,
            question: "What is the correct way to create a function in Python?",
            options: ["function myFunc():", "def myFunc():", "create myFunc():", "func myFunc():"],
            correctAnswer: "def myFunc():",
            explanation: "In Python, you define a function using the 'def' keyword followed by the function name and parentheses.",
            topic: "Functions",
            imageUrl: "python.jpg"
          },
          {
            id: 2,
            question: "Which of the following is used for comments in Python?",
            options: ["/* comment */", "// comment", "# comment", "<!-- comment -->"],
            correctAnswer: "# comment",
            explanation: "Python uses the # symbol to start a comment. Everything after # on that line is considered a comment.",
            topic: "Syntax",
            imageUrl: "python-syntax.jpg"
          },
          {
            id: 3,
            question: "What does the 'len()' function do in Python?",
            options: ["Rounds a number to the nearest integer", "Returns the length of an object", "Converts a string to lowercase", "Returns the maximum value"],
            correctAnswer: "Returns the length of an object",
            explanation: "The len() function returns the number of items in an object like a string, list, tuple, etc.",
            topic: "Built-in Functions",
            imageUrl: "python-built-in-functions.jpg"
          },
          {
            id: 4,
            question: "Which method is used to add an element at the end of a list in Python?",
            options: ["list.add()", "list.append()", "list.insert()", "list.extend()"],
            correctAnswer: "list.append()",
            explanation: "The append() method adds a single item to the end of the list.",
            topic: "Lists",
            imageUrl: "python-lists.jpg"
          },
          {
            id: 5,
            question: "How do you create a list in Python?",
            options: ["list = (1, 2, 3)", "list = [1, 2, 3]", "list = {1, 2, 3}", "array(1, 2, 3)"],
            correctAnswer: "list = [1, 2, 3]",
            explanation: "In Python, lists are created using square brackets [].",
            topic: "Lists",
            imageUrl: "python-lists.jpg"
          }
        ]
      },
      {
        id: "javascript",
        title: "JavaScript",
        description: "Test your JavaScript programming skills",
        icon: "code",
        difficulty: "hard",
        estimatedTime: "7 mins",
        questions: [
          {
            id: 1,
            question: "Which operator is used to assign a value to a variable in JavaScript?",
            options: ["=", "*", "#", "-"],
            correctAnswer: "=",
            explanation: "The = operator is used to assign values to JavaScript variables.",
            topic: "Operators",
            imageUrl: "javascript-operators.jpg"
          },
          {
            id: 2,
            question: "How do you create a function in JavaScript?",
            options: ["function:myFunction()", "function myFunction()", "function = myFunction()", "create myFunction()"],
            correctAnswer: "function myFunction()",
            explanation: "In JavaScript, a function is defined using the function keyword, followed by a name and parentheses ().",
            topic: "Functions",
            imageUrl: "javascript-functions.jpg"
          },
          {
            id: 3,
            question: "Which event occurs when a user clicks on an HTML element?",
            options: ["onmouseclick", "onclick", "onchange", "onmouseover"],
            correctAnswer: "onclick",
            explanation: "The onclick event occurs when the user clicks on an element.",
            topic: "Events",
            imageUrl: "javascript-events.jpg"
          },
          {
            id: 4,
            question: "How do you declare a JavaScript variable?",
            options: ["v carName;", "variable carName;", "var carName;", "declare carName;"],
            correctAnswer: "var carName;",
            explanation: "In JavaScript, variables are declared using var, let, or const.",
            topic: "Variables",
            imageUrl: "javascript-variables.jpg"
          },
          {
            id: 5,
            question: "Which method is used to remove the last element from an array in JavaScript?",
            options: ["pop()", "push()", "remove()", "delete()"],
            correctAnswer: "pop()",
            explanation: "The pop() method removes the last element from an array.",
            topic: "Arrays",
            imageUrl: "javascript-arrays.jpg"
          }
        ]
      },
      {
        id: "java",
        title: "Java",
        description: "Test your Java programming knowledge",
        icon: "code",
        difficulty: "hard",
        estimatedTime: "7 mins",
        questions: [
          {
            id: 1,
            question: "Which of the following is a valid Java identifier?",
            options: ["123abc", "a-b-c", "_value", "java.lang"],
            correctAnswer: "_value",
            explanation: "In Java, identifiers can start with a letter, underscore, or dollar sign, followed by letters, digits, underscores, or dollar signs.",
            topic: "Syntax",
            imageUrl: "java-syntax.jpg"
          },
          {
            id: 2,
            question: "What is the default value of an uninitialized integer variable in Java?",
            options: ["0", "1", "null", "undefined"],
            correctAnswer: "0",
            explanation: "In Java, numeric primitive types are automatically initialized to 0 when declared as class or instance variables.",
            topic: "Variables",
            imageUrl: "java-variables.jpg"
          },
          {
            id: 3,
            question: "Which statement is true about Java?",
            options: ["Java is a purely object-oriented language", "Java supports multiple inheritance through classes", "Java code runs directly on the operating system", "Java has automatic garbage collection"],
            correctAnswer: "Java has automatic garbage collection",
            explanation: "Java features automatic memory management through garbage collection.",
            topic: "Memory Management",
            imageUrl: "java-memory-management.jpg"
          },
          {
            id: 4,
            question: "What is the purpose of 'final' keyword in Java?",
            options: ["To prevent inheritance", "To prevent method overriding", "To make a variable constant", "All of the above"],
            correctAnswer: "All of the above",
            explanation: "The 'final' keyword can be used with classes to prevent inheritance, with methods to prevent overriding, and with variables to create constants.",
            topic: "Keywords",
            imageUrl: "java-keywords.jpg"
          },
          {
            id: 5,
            question: "Which of these is not a primitive data type in Java?",
            options: ["String", "boolean", "double", "char"],
            correctAnswer: "String",
            explanation: "String is a class in Java, not a primitive data type. The primitive types are byte, short, int, long, float, double, char, and boolean.",
            topic: "Data Types",
            imageUrl: "java-data-types.jpg"
          }
        ]
      },
      {
        id: "c++",
        title: "C++",
        description: "Test your C++ programming knowledge",
        icon: "code",
        difficulty: "hard",
        estimatedTime: "7 mins",
        questions: [
          {
            id: 1,
            question: "What is the correct syntax for a pointer declaration in C++?",
            options: ["ptr int;", "int ptr;", "int* ptr;", "pointer int ptr;"],
            correctAnswer: "int* ptr;",
            explanation: "In C++, a pointer is declared using the data type followed by an asterisk (*) and the variable name.",
            topic: "Pointers",
            imageUrl: "c++-pointers.jpg"
          },
          {
            id: 2,
            question: "What does the 'new' operator do in C++?",
            options: ["Creates a new class", "Allocates memory dynamically", "Initializes a variable to zero", "Creates a new scope"],
            correctAnswer: "Allocates memory dynamically",
            explanation: "The 'new' operator in C++ dynamically allocates memory on the heap and returns a pointer to it.",
            topic: "Memory Management",
            imageUrl: "c++-memory-management.jpg"
          },
          {
            id: 3,
            question: "Which feature of C++ is used to implement runtime polymorphism?",
            options: ["Templates", "Virtual functions", "Friend functions", "Default arguments"],
            correctAnswer: "Virtual functions",
            explanation: "Virtual functions allow a program to call methods that are overridden in derived classes through base class pointers or references.",
            topic: "Polymorphism",
            imageUrl: "c++-polymorphism.jpg"
          },
          {
            id: 4,
            question: "What is the main purpose of the 'const' keyword in C++?",
            options: ["To improve performance", "To declare constants", "To prevent objects from being modified", "Both B and C"],
            correctAnswer: "Both B and C",
            explanation: "The 'const' keyword in C++ can be used to declare constants or to specify that a method does not modify the object's state.",
            topic: "Keywords",
            imageUrl: "c++-keywords.jpg"
          },
          {
            id: 5,
            question: "What does the scope resolution operator (::) do in C++?",
            options: ["Inherits a class", "Accesses a global variable", "Resolves a variable's data type", "Creates a new scope"],
            correctAnswer: "Accesses a global variable",
            explanation: "The scope resolution operator (::) in C++ is used to access global variables, class members, and namespace elements.",
            topic: "Operators",
            imageUrl: "c++-operators.jpg"
          }
        ]
      },
      {
        id: "html-css",
        title: "HTML/CSS",
        description: "Test your HTML and CSS knowledge",
        icon: "code",
        difficulty: "easy",
        estimatedTime: "5 mins",
        questions: [
          {
            id: 1,
            question: "Which HTML tag is used to define an unordered list?",
            options: ["<ol>", "<list>", "<ul>", "<dl>"],
            correctAnswer: "<ul>",
            explanation: "The <ul> tag defines an unordered (bulleted) list in HTML.",
            topic: "HTML Lists",
            imageUrl: "html-lists.jpg"
          },
          {
            id: 2,
            question: "Which CSS property is used to change the text color?",
            options: ["font-color", "text-color", "color", "font-style"],
            correctAnswer: "color",
            explanation: "The 'color' property in CSS is used to set the color of text.",
            topic: "CSS Properties",
            imageUrl: "css-properties.jpg"
          },
          {
            id: 3,
            question: "What does CSS stand for?",
            options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
            correctAnswer: "Cascading Style Sheets",
            explanation: "CSS stands for Cascading Style Sheets, which is used to style HTML elements.",
            topic: "CSS Basics",
            imageUrl: "css-basics.jpg"
          },
          {
            id: 4,
            question: "Which HTML attribute specifies an alternate text for an image?",
            options: ["title", "alt", "src", "href"],
            correctAnswer: "alt",
            explanation: "The 'alt' attribute provides alternative information for an image if a user cannot view it.",
            topic: "HTML Attributes",
            imageUrl: "html-attributes.jpg"
          },
          {
            id: 5,
            question: "Which CSS property controls the spacing between elements?",
            options: ["margin", "padding", "spacing", "border"],
            correctAnswer: "margin",
            explanation: "The 'margin' property in CSS controls the space around elements, outside of any defined borders.",
            topic: "CSS Box Model",
            imageUrl: "css-box-model.jpg"
          }
        ]
      },
      {
        id: "csharp",
        title: "C#",
        description: "Test your C# programming knowledge",
        icon: "code",
        difficulty: "medium",
        estimatedTime: "6 mins",
        questions: [
          {
            id: 1,
            question: "Which of the following is NOT a valid C# access modifier?",
            options: ["public", "private", "protected", "friend"],
            correctAnswer: "friend",
            explanation: "C# has the access modifiers public, private, protected, internal, and protected internal, but not 'friend' (which exists in Visual Basic).",
            topic: "Access Modifiers",
            imageUrl: "csharp-access-modifiers.jpg"
          },
          {
            id: 2,
            question: "What does the 'using' directive do in C#?",
            options: ["Imports namespaces", "Executes a block of code and then disposes of resources", "Creates a new namespace", "Declares a variable"],
            correctAnswer: "Imports namespaces",
            explanation: "The 'using' directive in C# imports types from namespaces so you don't have to fully qualify type names.",
            topic: "Namespaces",
            imageUrl: "csharp-namespaces.jpg"
          },
          {
            id: 3,
            question: "What is an interface in C#?",
            options: ["A class that cannot be instantiated", "A user interface component", "A contract that classes can implement", "A base class for all objects"],
            correctAnswer: "A contract that classes can implement",
            explanation: "An interface in C# is a contract that defines a set of methods and properties that implementing classes must provide.",
            topic: "Interfaces",
            imageUrl: "csharp-interfaces.jpg"
          },
          {
            id: 4,
            question: "What is the difference between 'ref' and 'out' parameters in C#?",
            options: ["'ref' requires variables to be initialized before passing, 'out' does not", "'out' requires variables to be initialized before passing, 'ref' does not", "They are exactly the same", "Neither requires initialization before passing"],
            correctAnswer: "'ref' requires variables to be initialized before passing, 'out' does not",
            explanation: "In C#, 'ref' parameters must be initialized before passing to a method, while 'out' parameters do not need to be initialized but must be assigned a value within the method.",
            topic: "Method Parameters",
            imageUrl: "csharp-method-parameters.jpg"
          },
          {
            id: 5,
            question: "Which operator is used for string concatenation in C#?",
            options: ["+", "&", "||", "+="],
            correctAnswer: "+",
            explanation: "The '+' operator is used for string concatenation in C#, though for performance reasons, StringBuilder is often preferred for multiple concatenations.",
            topic: "Operators",
            imageUrl: "csharp-operators.jpg"
          }
        ]
      },
      {
        id: "ai-basics",
        title: "AI Basics",
        description: "Test your knowledge of artificial intelligence concepts",
        icon: "code",
        difficulty: "medium",
        estimatedTime: "5 mins",
        questions: [
          {
            id: 1,
            question: "What is machine learning?",
            options: [
              "A type of computer hardware",
              "The ability of computers to learn without explicit programming",
              "A programming language for AI",
              "The study of how to make computers think like humans"
            ],
            correctAnswer: "The ability of computers to learn without explicit programming",
            explanation: "Machine learning is a subset of AI that enables computers to learn from data and improve their performance without being explicitly programmed.",
            topic: "Machine Learning Basics",
            imageUrl: "machine-learning-basics.jpg"
          },
          {
            id: 2,
            question: "Which of these is NOT a type of machine learning?",
            options: [
              "Supervised learning",
              "Unsupervised learning",
              "Reinforcement learning",
              "Deterministic learning"
            ],
            correctAnswer: "Deterministic learning",
            explanation: "The three main types of machine learning are supervised, unsupervised, and reinforcement learning. Deterministic learning is not a standard category.",
            topic: "Types of Machine Learning",
            imageUrl: "types-of-machine-learning.jpg"
          },
          {
            id: 3,
            question: "What is a neural network?",
            options: [
              "A computer network designed for AI applications",
              "A network of computers working together",
              "A computational model inspired by the human brain",
              "A network protocol for AI systems"
            ],
            correctAnswer: "A computational model inspired by the human brain",
            explanation: "Neural networks are computing systems vaguely inspired by the biological neural networks that constitute animal brains, designed to recognize patterns.",
            topic: "Neural Networks",
            imageUrl: "neural-networks.jpg"
          },
          {
            id: 4,
            question: "What is deep learning?",
            options: [
              "Learning that happens during deep sleep",
              "A subset of machine learning using neural networks with many layers",
              "Learning about deep sea creatures",
              "A philosophical approach to AI"
            ],
            correctAnswer: "A subset of machine learning using neural networks with many layers",
            explanation: "Deep learning is a subset of machine learning that uses neural networks with multiple layers (deep neural networks) to model complex patterns in data.",
            topic: "Deep Learning",
            imageUrl: "deep-learning.jpg"
          },
          {
            id: 5,
            question: "What is NLP in AI?",
            options: [
              "New Learning Process",
              "Natural Language Processing",
              "Neural Link Protocol",
              "Network Learning Procedure"
            ],
            correctAnswer: "Natural Language Processing",
            explanation: "NLP stands for Natural Language Processing, which is the ability of computers to understand, interpret, and generate human language.",
            topic: "Natural Language Processing",
            imageUrl: "natural-language-processing.jpg"
          }
        ]
      },
      {
        id: "programming-puzzles",
        title: "Programming Puzzles",
        description: "Test your problem-solving skills",
        icon: "puzzle",
        difficulty: "medium",
        estimatedTime: "10 mins",
        questions: [
          {
            id: 1,
            question: "What will be the output of this code snippet?\n```python\nx = 5\ny = x\nx = 10\nprint(y)```",
            options: ["5", "10", "None", "Error"],
            correctAnswer: "5",
            explanation: "In Python, when y = x is executed, y gets the value of x at that moment (5). When x is later changed to 10, it doesn't affect y.",
            topic: "Debugging",
            imageUrl: "python-debugging.jpg"
          },
          {
            id: 2,
            question: "Find the bug in this JavaScript code:\n```javascript\nfunction sum(a, b) {\n  return a + b;\n}\nconsole.log(sum(2, '3'));```",
            options: ["SyntaxError", "The function returns 5", "The function returns '23'", "TypeError"],
            correctAnswer: "The function returns '23'",
            explanation: "In JavaScript, + operator with a string and number performs string concatenation, not addition. 2 + '3' results in '23'.",
            topic: "Debugging",
            imageUrl: "javascript-debugging.jpg"
          },
          {
            id: 3,
            question: "Which data structure would be most efficient for implementing a priority queue?",
            options: ["Array", "Linked List", "Heap", "Stack"],
            correctAnswer: "Heap",
            explanation: "A heap is the most efficient data structure for a priority queue as it provides O(log n) time complexity for insertion and deletion operations.",
            topic: "Logic Building",
            imageUrl: "logic-building.jpg"
          },
          {
            id: 4,
            question: "What's the time complexity of binary search?",
            options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
            correctAnswer: "O(log n)",
            explanation: "Binary search has a time complexity of O(log n) because it divides the search interval in half with each comparison.",
            topic: "Logic Building",
            imageUrl: "binary-search.jpg"
          },
          {
            id: 5,
            question: "Which algorithm is used to find the shortest path in a weighted graph?",
            options: ["BFS", "DFS", "Dijkstra's algorithm", "Bubble sort"],
            correctAnswer: "Dijkstra's algorithm",
            explanation: "Dijkstra's algorithm is used to find the shortest paths between nodes in a weighted graph, which may represent, for example, road networks.",
            topic: "Logic Building",
            imageUrl: "dijkstras-algorithm.jpg"
          }
        ]
      }
    ]
  },
  {
    id: "science",
    title: "Science",
    description: "Test your knowledge on physics, chemistry, and biology",
    icon: "flask-conical",
    quizzes: [
      {
        id: "physics",
        title: "Physics",
        description: "Test your physics knowledge",
        icon: "science",
        difficulty: "medium",
        estimatedTime: "4 mins",
        questions: [
          {
            id: 1,
            question: "What is Newton's First Law of Motion?",
            options: [
              "Force equals mass times acceleration",
              "An object at rest stays at rest unless acted upon by a force",
              "For every action, there is an equal and opposite reaction",
              "Energy cannot be created or destroyed"
            ],
            correctAnswer: "An object at rest stays at rest unless acted upon by a force",
            explanation: "Newton's First Law states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.",
            topic: "Newton's Laws",
            imageUrl: "newtons-laws.jpg"
          },
          {
            id: 2,
            question: "What is the SI unit of force?",
            options: ["Watt", "Joule", "Newton", "Pascal"],
            correctAnswer: "Newton",
            explanation: "The newton (N) is the SI unit of force, named after Sir Isaac Newton.",
            topic: "SI Units",
            imageUrl: "si-units.jpg"
          },
          {
            id: 3,
            question: "Which particle has a positive charge?",
            options: ["Electron", "Neutron", "Proton", "Photon"],
            correctAnswer: "Proton",
            explanation: "Protons carry a positive electrical charge, electrons are negative, and neutrons have no charge.",
            topic: "Atomic Structure",
            imageUrl: "atomic-structure.jpg"
          },
          {
            id: 4,
            question: "What is the formula for kinetic energy?",
            options: ["KE = mgh", "KE = 1/2 mv²", "KE = Fd", "KE = P/t"],
            correctAnswer: "KE = 1/2 mv²",
            explanation: "Kinetic energy is equal to half of mass times velocity squared.",
            topic: "Energy",
            imageUrl: "energy.jpg"
          },
          {
            id: 5,
            question: "Which type of wave requires a medium to travel?",
            options: ["Electromagnetic waves", "Radio waves", "Mechanical waves", "Light waves"],
            correctAnswer: "Mechanical waves",
            explanation: "Mechanical waves require a medium (like air or water) to travel, while electromagnetic waves can travel through a vacuum.",
            topic: "Waves",
            imageUrl: "waves.jpg"
          }
        ]
      },
      {
        id: "chemistry",
        title: "Chemistry",
        description: "Test your chemistry knowledge",
        icon: "flask-conical",
        difficulty: "hard",
        estimatedTime: "5 mins",
        questions: [
          {
            id: 1,
            question: "What is the chemical symbol for gold?",
            options: ["Go", "Gd", "Au", "Ag"],
            correctAnswer: "Au",
            explanation: "The chemical symbol Au comes from the Latin word for gold, 'aurum'.",
            topic: "Chemical Symbols",
            imageUrl: "chemical-symbols.jpg"
          },
          {
            id: 2,
            question: "What is the pH of a neutral solution?",
            options: ["0", "7", "10", "14"],
            correctAnswer: "7",
            explanation: "A neutral solution has a pH of 7, with values below 7 being acidic and above 7 being alkaline.",
            topic: "pH Scale",
            imageUrl: "ph-scale.jpg"
          },
          {
            id: 3,
            question: "Which element has the atomic number 1?",
            options: ["Helium", "Hydrogen", "Carbon", "Oxygen"],
            correctAnswer: "Hydrogen",
            explanation: "Hydrogen is the first element on the periodic table with atomic number 1.",
            topic: "Periodic Table",
            imageUrl: "periodic-table.jpg"
          },
          {
            id: 4,
            question: "What type of bond is formed when electrons are shared between atoms?",
            options: ["Ionic bond", "Covalent bond", "Hydrogen bond", "Metallic bond"],
            correctAnswer: "Covalent bond",
            explanation: "Covalent bonds involve the sharing of electron pairs between atoms.",
            topic: "Chemical Bonding",
            imageUrl: "chemical-bonding.jpg"
          },
          {
            id: 5,
            question: "Which gas makes up the majority of Earth's atmosphere?",
            options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
            correctAnswer: "Nitrogen",
            explanation: "Nitrogen makes up about 78% of Earth's atmosphere.",
            topic: "Earth Science",
            imageUrl: "earth-science.jpg"
          }
        ]
      },
      {
        id: "biology",
        title: "Biology",
        description: "Test your biology knowledge",
        icon: "flask-conical",
        difficulty: "medium",
        estimatedTime: "5 mins",
        questions: [
          {
            id: 1,
            question: "Which organelle is known as the 'powerhouse' of the cell?",
            options: ["Nucleus", "Mitochondrion", "Ribosome", "Golgi apparatus"],
            correctAnswer: "Mitochondrion",
            explanation: "Mitochondria are called the powerhouse of the cell because they generate most of the cell's supply of ATP, used as a source of chemical energy.",
            topic: "Cell Structure",
            imageUrl: "cell-structure.jpg"
          },
          {
            id: 2,
            question: "What is the process by which plants make their own food?",
            options: ["Respiration", "Fermentation", "Photosynthesis", "Digestion"],
            correctAnswer: "Photosynthesis",
            explanation: "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugars.",
            topic: "Plant Biology",
            imageUrl: "plant-biology.jpg"
          },
          {
            id: 3,
            question: "Which of the following is NOT a type of blood cell?",
            options: ["Red blood cells", "White blood cells", "Platelets", "Stem cells"],
            correctAnswer: "Stem cells",
            explanation: "The three types of blood cells are red blood cells (erythrocytes), white blood cells (leukocytes), and platelets (thrombocytes). Stem cells are precursor cells that can develop into various cell types.",
            topic: "Human Biology",
            imageUrl: "human-biology.jpg"
          },
          {
            id: 4,
            question: "Which of these is NOT a function of the liver?",
            options: ["Detoxification", "Protein synthesis", "Bile production", "Oxygen transport"],
            correctAnswer: "Oxygen transport",
            explanation: "The liver performs many functions including detoxification, protein synthesis, and bile production, but oxygen transport is primarily a function of red blood cells.",
            topic: "Organ Systems",
            imageUrl: "organ-systems.jpg"
          },
          {
            id: 5,
            question: "What is the largest organ in the human body?",
            options: ["Heart", "Brain", "Liver", "Skin"],
            correctAnswer: "Skin",
            explanation: "The skin is the largest organ in the human body, with a total area of about 20 square feet in adults.",
            topic: "Human Anatomy",
            imageUrl: "human-anatomy.jpg"
          }
        ]
      }
    ]
  },
  {
    id: "mathematics",
    title: "Mathematics",
    description: "Test your mathematical knowledge and problem-solving skills",
    icon: "book",
    quizzes: [
      {
        id: "algebra",
        title: "Algebra",
        description: "Test your algebraic skills",
        icon: "algebra",
        difficulty: "medium",
        estimatedTime: "8 mins",
        questions: [
          {
            id: 1,
            question: "Solve for x: 3x + 5 = 14",
            options: ["x = 3", "x = 4", "x = 2", "x = 5"],
            correctAnswer: "x = 3",
            explanation: "3x + 5 = 14\n3x = 14 - 5\n3x = 9\nx = 3",
            topic: "Linear Equations",
            imageUrl: "linear-equations.jpg"
          },
          {
            id: 2,
            question: "Factor the expression: x² - 9",
            options: ["(x - 3)(x + 3)", "(x - 3)²", "(x + 3)²", "(x - 3)(x - 3)"],
            correctAnswer: "(x - 3)(x + 3)",
            explanation: "The expression x² - 9 can be recognized as a difference of squares: a² - b² = (a - b)(a + b). Here, a = x and b = 3.",
            topic: "Factoring"
          },
          {
            id: 3,
            question: "What is the slope of the line passing through points (2, 5) and (4, 9)?",
            options: ["1", "2", "3", "4"],
            correctAnswer: "2",
            explanation: "The slope formula is (y₂ - y₁)/(x₂ - x₁). Substituting our points: (9 - 5)/(4 - 2) = 4/2 = 2.",
            topic: "Linear Functions"
          },
          {
            id: 4,
            question: "Simplify the expression: 2(x + 3) - 4(x - 1)",
            options: ["2x + 10", "-2x + 10", "6x + 2", "6x - 2"],
            correctAnswer: "-2x + 10",
            explanation: "2(x + 3) - 4(x - 1) = 2x + 6 - 4x + 4 = 2x - 4x + 6 + 4 = -2x + 10",
            topic: "Simplification"
          },
          {
            id: 5,
            question: "Solve the system of equations: x + y = 5 and x - y = 3",
            options: ["x = 4, y = 1", "x = 1, y = 4", "x = 2, y = 3", "x = 3, y = 2"],
            correctAnswer: "x = 4, y = 1",
            explanation: "Adding the two equations: 2x = 8, so x = 4. Substituting into x + y = 5: 4 + y = 5, so y = 1.",
            topic: "Systems of Equations"
          }
        ]
      },
      {
        id: "calculus",
        title: "Calculus",
        description: "Test your calculus knowledge",
        icon: "calculus",
        difficulty: "hard",
        estimatedTime: "10 mins",
        questions: [
          {
            id: 1,
            question: "What is the derivative of f(x) = x²?",
            options: ["f'(x) = x", "f'(x) = 2x", "f'(x) = 2", "f'(x) = x³"],
            correctAnswer: "f'(x) = 2x",
            explanation: "The derivative of x^n is n·x^(n-1). For x², n=2, so the derivative is 2·x^(2-1) = 2x.",
            topic: "Derivatives"
          },
          {
            id: 2,
            question: "What is the integral of f(x) = 2x?",
            options: ["x² + C", "x² + 2C", "x² - C", "2x² + C"],
            correctAnswer: "x² + C",
            explanation: "The integral of x^n is x^(n+1)/(n+1) + C. For 2x, it's 2·x^(1+1)/2 + C = x² + C.",
            topic: "Integration"
          },
          {
            id: 3,
            question: "What is the limit of (sin x)/x as x approaches 0?",
            options: ["0", "1", "∞", "Does not exist"],
            correctAnswer: "1",
            explanation: "This is a well-known limit in calculus. As x approaches 0, the limit of (sin x)/x equals 1.",
            topic: "Limits"
          },
          {
            id: 4,
            question: "What is the derivative of sin(x)?",
            options: ["cos(x)", "-cos(x)", "tan(x)", "-sin(x)"],
            correctAnswer: "cos(x)",
            explanation: "The derivative of sin(x) is cos(x). This is a fundamental derivative in calculus.",
            topic: "Derivatives"
          },
          {
            id: 5,
            question: "What is the integral of e^x?",
            options: ["e^x + C", "x·e^x + C", "ln(x) + C", "e^x/x + C"],
            correctAnswer: "e^x + C",
            explanation: "The integral of e^x is e^x + C. This is because the derivative of e^x is itself.",
            topic: "Integration"
          }
        ]
      },
      {
        id: "logical-reasoning",
        title: "Logical Reasoning",
        description: "Test your logical reasoning skills",
        icon: "logic",
        difficulty: "medium",
        estimatedTime: "8 mins",
        questions: [
          {
            id: 1,
            question: "If all flowers are plants, and some plants are green, which statement must be true?",
            options: [
              "All flowers are green", 
              "Some flowers are green", 
              "No flowers are green", 
              "None of the above"
            ],
            correctAnswer: "None of the above",
            explanation: "From the given premises, we can't determine whether any flowers are green. Some plants are green, but we don't know if those specific plants are flowers.",
            topic: "Deductive Reasoning"
          },
          {
            id: 2,
            question: "Continue the sequence: 2, 4, 8, 16, ...",
            options: ["24", "32", "30", "20"],
            correctAnswer: "32",
            explanation: "Each number is doubled to get the next number: 2 × 2 = 4, 4 × 2 = 8, 8 × 2 = 16, 16 × 2 = 32.",
            topic: "Pattern Recognition"
          },
          {
            id: 3,
            question: "Choose the figure that completes the pattern: [A visual sequence showing rotation]",
            options: ["Square", "Circle", "Triangle", "Rectangle"],
            correctAnswer: "Triangle",
            explanation: "The pattern shows a 90-degree clockwise rotation in each step. Following this pattern, the triangle would be the next figure.",
            topic: "Visual Reasoning"
          },
          {
            id: 4,
            question: "Peter is older than Mary. Mary is older than John. Which statement must be true?",
            options: [
              "Peter is older than John", 
              "John is the youngest", 
              "Mary is the youngest", 
              "Peter is the oldest"
            ],
            correctAnswer: "Peter is older than John",
            explanation: "Since Peter is older than Mary and Mary is older than John, by transitive property, Peter must be older than John.",
            topic: "Logical Deduction"
          },
          {
            id: 5,
            question: "Which number doesn't belong in the set: 2, 3, 5, 7, 9, 11, 13?",
            options: ["2", "3", "9", "13"],
            correctAnswer: "9",
            explanation: "All numbers except 9 are prime numbers. 9 is composite (9 = 3 × 3).",
            topic: "Classification"
          }
        ]
      }
    ]
  },
  {
    id: "entertainment",
    title: "Entertainment",
    description: "Test your knowledge on movies, anime, cartoons, and web series",
    icon: "film",
    quizzes: [
      {
        id: "movies",
        title: "Movies",
        description: "Test your knowledge of popular films",
        icon: "film",
        difficulty: "easy",
        estimatedTime: "5 mins",
        questions: [
          {
            id: 1,
            question: "Which film won the Academy Award for Best Picture in 2020?",
            options: ["1917", "Joker", "Parasite", "Once Upon a Time in Hollywood"],
            correctAnswer: "Parasite",
            explanation: "Parasite, directed by Bong Joon-ho, won the Academy Award for Best Picture in 2020, becoming the first non-English language film to win this award.",
            topic: "Awards"
          },
          {
            id: 2,
            question: "Who directed the movie 'Inception'?",
            options: ["Steven Spielberg", "Christopher Nolan", "James Cameron", "Martin Scorsese"],
            correctAnswer: "Christopher Nolan",
            explanation: "Inception (2010) was directed by Christopher Nolan, who is known for other films like The Dark Knight trilogy and Interstellar.",
            topic: "Directors"
          },
          {
            id: 3,
            question: "Which actor played Iron Man in the Marvel Cinematic Universe?",
            options: ["Chris Evans", "Chris Hemsworth", "Robert Downey Jr.", "Mark Ruffalo"],
            correctAnswer: "Robert Downey Jr.",
            explanation: "Robert Downey Jr. portrayed Tony Stark/Iron Man in the Marvel Cinematic Universe from Iron Man (2008) to Avengers: Endgame (2019).",
            topic: "Actors"
          },
          {
            id: 4,
            question: "What was the first feature-length animated film ever released?",
            options: ["Snow White and the Seven Dwarfs", "Pinocchio", "Fantasia", "Bambi"],
            correctAnswer: "Snow White and the Seven Dwarfs",
            explanation: "Snow White and the Seven Dwarfs, released by Disney in 1937, was the first full-length traditionally animated feature film.",
            topic: "Animation"
          },
          {
            id: 5,
            question: "Which film franchise features a character named Harry Potter?",
            options: ["The Chronicles of Narnia", "Harry Potter", "The Lord of the Rings", "The Hunger Games"],
            correctAnswer: "Harry Potter",
            explanation: "The Harry Potter film series is based on J.K. Rowling's novels and features the titular character, a young wizard.",
            topic: "Franchises"
          }
        ]
      },
      {
        id: "anime",
        title: "Anime",
        description: "Test your knowledge of anime series and films",
        icon: "anime",
        difficulty: "medium",
        estimatedTime: "5 mins",
        questions: [
          {
            id: 1,
            question: "Which anime features a character named Monkey D. Luffy?",
            options: ["Naruto", "One Piece", "Dragon Ball", "Bleach"],
            correctAnswer: "One Piece",
            explanation: "Monkey D. Luffy is the main protagonist of the anime and manga series One Piece, created by Eiichiro Oda.",
            topic: "Shonen Anime"
          },
          {
            id: 2,
            question: "Which studio animated 'Spirited Away'?",
            options: ["Toei Animation", "Madhouse", "Studio Ghibli", "Kyoto Animation"],
            correctAnswer: "Studio Ghibli",
            explanation: "Spirited Away (2001) was animated by Studio Ghibli and directed by Hayao Miyazaki. It won the Academy Award for Best Animated Feature.",
            topic: "Anime Films"
          },
          {
            id: 3,
            question: "What is the name of the main character in 'Attack on Titan'?",
            options: ["Mikasa Ackerman", "Eren Yeager", "Armin Arlert", "Levi Ackerman"],
            correctAnswer: "Eren Yeager",
            explanation: "Eren Yeager is the main protagonist of Attack on Titan (Shingeki no Kyojin), a series created by Hajime Isayama.",
            topic: "Action Anime"
          },
          {
            id: 4,
            question: "Which of these is NOT one of the 'Big Three' anime?",
            options: ["Naruto", "One Piece", "Bleach", "Dragon Ball Z"],
            correctAnswer: "Dragon Ball Z",
            explanation: "The 'Big Three' refers to three highly popular anime series that ran in Shonen Jump magazine concurrently: One Piece, Naruto, and Bleach.",
            topic: "Anime History"
          },
          {
            id: 5,
            question: "Who is the creator of 'Death Note'?",
            options: ["Eiichiro Oda", "Tsugumi Ohba and Takeshi Obata", "Masashi Kishimoto", "Tite Kubo"],
            correctAnswer: "Tsugumi Ohba and Takeshi Obata",
            explanation: "Death Note was written by Tsugumi Ohba and illustrated by Takeshi Obata. It was first published in Shonen Jump in 2003.",
            topic: "Manga Authors"
          }
        ]
      },
      {
        id: "cartoons",
        title: "Cartoons",
        description: "Test your knowledge of animated shows",
        icon: "cartoons",
        difficulty: "easy",
        estimatedTime: "5 mins",
        questions: [
          {
            id: 1,
            question: "Which cartoon features a sponge who lives in a pineapple under the sea?",
            options: ["The Simpsons", "SpongeBob SquarePants", "Family Guy", "Rick and Morty"],
            correctAnswer: "SpongeBob SquarePants",
            explanation: "SpongeBob SquarePants, created by marine science educator and animator Stephen Hillenburg, features the title character who lives in a pineapple under the sea.",
            topic: "Nickelodeon"
          },
          {
            id: 2,
            question: "Which cartoon family lives in Springfield?",
            options: ["The Simpsons", "The Griffins", "The Belchers", "The Smiths"],
            correctAnswer: "The Simpsons",
            explanation: "The Simpsons, created by Matt Groening, follows the Simpson family who live in the fictional town of Springfield.",
            topic: "Fox Animation"
          },
          {
            id: 3,
            question: "Who created the cartoon 'Adventure Time'?",
            options: ["Rebecca Sugar", "Pendleton Ward", "Alex Hirsch", "Justin Roiland"],
            correctAnswer: "Pendleton Ward",
            explanation: "Adventure Time was created by Pendleton Ward and aired on Cartoon Network from 2010 to 2018.",
            topic: "Cartoon Network"
          },
          {
            id: 4,
            question: "Which of these is NOT one of the Powerpuff Girls?",
            options: ["Blossom", "Bubbles", "Buttercup", "Beatrice"],
            correctAnswer: "Beatrice",
            explanation: "The Powerpuff Girls are Blossom, Bubbles, and Buttercup. There is no Powerpuff Girl named Beatrice.",
            topic: "Cartoon Characters"
          },
          {
            id: 5,
            question: "What is the name of Mickey Mouse's dog?",
            options: ["Goofy", "Pluto", "Figaro", "Max"],
            correctAnswer: "Pluto",
            explanation: "Pluto is Mickey Mouse's pet dog in the Disney universe. Goofy, while also a dog, is an anthropomorphic character who walks upright and talks.",
            topic: "Disney"
          }
        ]
      },
      {
        id: "web-series",
        title: "Web Series",
        description: "Test your knowledge of popular web and TV series",
        icon: "tv",
        difficulty: "medium",
        estimatedTime: "5 mins",
        questions: [
          {
            id: 1,
            question: "Which series features a high school chemistry teacher who begins making methamphetamine?",
            options: ["The Sopranos", "Breaking Bad", "The Wire", "Ozark"],
            correctAnswer: "Breaking Bad",
            explanation: "Breaking Bad, created by Vince Gilligan, follows Walter White, a high school chemistry teacher who turns to manufacturing methamphetamine after being diagnosed with cancer.",
            topic: "Drama Series"
          },
          {
            id: 2,
            question: "Which fantasy series is based on books by George R.R. Martin?",
            options: ["The Witcher", "Game of Thrones", "Lord of the Rings", "The Wheel of Time"],
            correctAnswer: "Game of Thrones",
            explanation: "Game of Thrones is based on 'A Song of Ice and Fire' series by George R.R. Martin.",
            topic: "Fantasy Series"
          },
          {
            id: 3,
            question: "Which streaming service originally produced 'Stranger Things'?",
            options: ["Amazon Prime", "Hulu", "Netflix", "Disney+"],
            correctAnswer: "Netflix",
            explanation: "Stranger Things is an original Netflix series created by the Duffer Brothers that premiered in 2016.",
            topic: "Streaming Platforms"
          },
          {
            id: 4,
            question: "Which character does Steve Carell play in 'The Office' (US version)?",
            options: ["Jim Halpert", "Dwight Schrute", "Michael Scott", "Andy Bernard"],
            correctAnswer: "Michael Scott",
            explanation: "Steve Carell played Michael Scott, the regional manager of Dunder Mifflin Scranton branch in 'The Office' (US version).",
            topic: "Comedy Series"
          },
          {
            id: 5,
            question: "Which show features the Shelby family in post-World War I Birmingham?",
            options: ["Downton Abbey", "Peaky Blinders", "Boardwalk Empire", "The Crown"],
            correctAnswer: "Peaky Blinders",
            explanation: "Peaky Blinders, created by Steven Knight, follows the Shelby crime family in Birmingham, England after World War I.",
            topic: "Historical Drama"
          }
        ]
      }
    ]
  },
  {
    id: "sports",
    title: "Sports",
    description: "Test your knowledge on various sports and sporting events",
    icon: "football",
    quizzes: [
      {
        id: "cricket",
        title: "Cricket",
        description: "Test your knowledge of cricket",
        icon: "cricket",
        difficulty: "medium",
        estimatedTime: "5 mins",
        questions: [
          {
            id: 1,
            question: "How many players are there in a cricket team?",
            options: ["9", "10", "11", "12"],
            correctAnswer: "11",
            explanation: "A standard cricket team consists of 11 players, with one designated as the captain.",
            topic: "Cricket Basics"
          },
          {
            id: 2,
            question: "Which country won the ICC Cricket World Cup 2023?",
            options: ["Australia", "India", "England", "New Zealand"],
            correctAnswer: "Australia",
            explanation: "Australia won the ICC Cricket World Cup 2023, defeating India in the final.",
            topic: "Cricket World Cup"
          },
          {
            id: 3,
            question: "What does LBW stand for in cricket?",
            options: ["Long Ball Wide", "Leg Before Wicket", "Last Batsman Walking", "Late Bat Wrist"],
            correctAnswer: "Leg Before Wicket",
            explanation: "LBW stands for Leg Before Wicket, a method of dismissal where the ball hits the batsman's body (typically the leg) when it would otherwise have hit the wicket.",
            topic: "Cricket Rules"
          },
          {
            id: 4,
            question: "Who holds the record for the highest individual score in Test cricket?",
            options: ["Sachin Tendulkar", "Don Bradman", "Brian Lara", "Virat Kohli"],
            correctAnswer: "Brian Lara",
            explanation: "Brian Lara holds the record for the highest individual score in Test cricket with 400 not out against England in 2004.",
            topic: "Cricket Records"
          },
          {
            id: 5,
            question: "Which of these is NOT a type of delivery in cricket?",
            options: ["Googly", "Yorker", "Flipper", "Striker"],
            correctAnswer: "Striker",
            explanation: "Googly, Yorker, and Flipper are types of deliveries in cricket, while 'Striker' refers to the batsman on strike, not a type of delivery.",
            topic: "Cricket Terminology"
          }
        ]
      },
      {
        id: "football",
        title: "Football",
        description: "Test your knowledge of football/soccer",
        icon: "football",
        difficulty: "easy",
        estimatedTime: "5 mins",
        questions: [
          {
            id: 1,
            question: "How many players are there on a standard football/soccer team on the field?",
            options: ["9", "10", "11", "12"],
            correctAnswer: "11",
            explanation: "A standard football/soccer team has 11 players on the field, including one goalkeeper and ten outfield players.",
            topic: "Football Basics"
          },
          {
            id: 2,
            question: "Which country has won the most FIFA World Cup tournaments?",
            options: ["Germany", "Italy", "Argentina", "Brazil"],
            correctAnswer: "Brazil",
            explanation: "Brazil has won the FIFA World Cup a record five times (1958, 1962, 1970, 1994, and 2002).",
            topic: "World Cup"
          },
          {
            id: 3,
            question: "What is the standard duration of a football match?",
            options: ["80 minutes", "90 minutes", "100 minutes", "120 minutes"],
            correctAnswer: "90 minutes",
            explanation: "A standard football match consists of two 45-minute halves, for a total of 90 minutes, excluding added time for stoppages.",
            topic: "Football Rules"
          },
          {
            id: 4,
            question: "Which player has won the most Ballon d'Or awards?",
            options: ["Cristiano Ronaldo", "Lionel Messi", "Pelé", "Diego Maradona"],
            correctAnswer: "Lionel Messi",
            explanation: "Lionel Messi has won the Ballon d'Or (awarded to the world's best player) a record eight times.",
            topic: "Football Awards"
          },
          {
            id: 5,
            question: "What is shown to a player as a warning in football?",
            options: ["Red Card", "Yellow Card", "Blue Card", "Green Card"],
            correctAnswer: "Yellow Card",
            explanation: "A yellow card is shown as a warning, while a red card results in the player being sent off. A player who receives two yellow cards in a match is automatically shown a red card.",
            topic: "Football Rules"
          }
        ]
      },
      {
        id: "olympics",
        title: "Olympics",
        description: "Test your knowledge of Olympic games",
        icon: "olympics",
        difficulty: "medium",
        estimatedTime: "6 mins",
        questions: [
          {
            id: 1,
            question: "Where were the first modern Olympic Games held?",
            options: ["Paris", "Athens", "London", "Rome"],
            correctAnswer: "Athens",
            explanation: "The first modern Olympic Games were held in Athens, Greece, in 1896.",
            topic: "Olympic History"
          },
          {
            id: 2,
            question: "What do the five rings in the Olympic symbol represent?",
            options: [
              "The five original sports", 
              "The five continents", 
              "The five elements", 
              "The five founding nations"
            ],
            correctAnswer: "The five continents",
            explanation: "The five rings represent the five continents: Africa, Americas, Asia, Europe, and Oceania. The colors (blue, yellow, black, green, and red) were chosen because at least one of these colors appears in the flag of every nation.",
            topic: "Olympic Symbols"
          },
          {
            id: 3,
            question: "Which city has hosted the Summer Olympics three times?",
            options: ["Paris", "London", "Athens", "Los Angeles"],
            correctAnswer: "London",
            explanation: "London has hosted the Summer Olympics three times: in 1908, 1948, and 2012.",
            topic: "Olympic Hosts"
          },
          {
            id: 4,
            question: "Which sport made its Olympic debut at the Tokyo 2020/2021 Games?",
            options: ["Skateboarding", "Rugby Sevens", "Golf", "BMX Freestyle"],
            correctAnswer: "Skateboarding",
            explanation: "Skateboarding made its Olympic debut at the Tokyo 2020 Olympics (held in 2021 due to the COVID-19 pandemic).",
            topic: "Olympic Sports"
          },
          {
            id: 5,
            question: "Who holds the record for the most Olympic gold medals?",
            options: ["Usain Bolt", "Michael Phelps", "Carl Lewis", "Larisa Latynina"],
            correctAnswer: "Michael Phelps",
            explanation: "American swimmer Michael Phelps holds the record for the most Olympic gold medals with 23, and the most Olympic medals overall with 28.",
            topic: "Olympic Records"
          }
        ]
      }
    ]
  },
  {
    id: "geography",
    title: "Geography",
    description: "Test your knowledge on countries, rivers, and mountains",
    icon: "earth",
    quizzes: [
      {
        id: "countries",
        title: "Countries",
        description: "Test your knowledge of countries around the world",
        icon: "earth",
        difficulty: "medium",
        estimatedTime: "5 mins",
        questions: [
          {
            id: 1,
            question: "Which country has the largest population in the world?",
            options: ["India", "China", "United States", "Indonesia"],
            correctAnswer: "India",
            explanation: "As of 2023, India has overtaken China as the world's most populous country with over 1.4 billion people.",
            topic: "Demographics"
          },
          {
            id: 2,
            question: "Which country has the largest land area?",
            options: ["China", "United States", "Russia", "Canada"],
            correctAnswer: "Russia",
            explanation: "Russia is the largest country by land area, covering over 17 million square kilometers (6.6 million square miles).",
            topic: "Land Area"
          },
          {
            id: 3,
            question: "Which country is known as the Land of the Rising Sun?",
            options: ["China", "South Korea", "Thailand", "Japan"],
            correctAnswer: "Japan",
            explanation: "Japan is known as the Land of the Rising Sun because from China, Japan appears to be in the direction where the sun rises.",
            topic: "Country Nicknames"
          },
          {
            id: 4,
            question: "Which country has the most islands in the world?",
            options: ["Philippines", "Indonesia", "Sweden", "Norway"],
            correctAnswer: "Sweden",
            explanation: "Sweden has the most islands of any country in the world, with an estimated 267,570 islands, though only about 1,000 are inhabited.",
            topic: "Geography Facts"
          },
          {
            id: 5,
            question: "Which is the smallest country in the world by land area?",
            options: ["Monaco", "Nauru", "Vatican City", "San Marino"],
            correctAnswer: "Vatican City",
            explanation: "Vatican City is the smallest country in the world, with a total area of approximately 0.49 square kilometers (0.19 square miles).",
            topic: "Small Countries"
          }
        ]
      },
      {
        id: "rivers",
        title: "Rivers",
        description: "Test your knowledge of major rivers around the world",
        icon: "river",
        difficulty: "hard",
        estimatedTime: "5 mins",
        questions: [
          {
            id: 1,
            question: "Which is the longest river in the world?",
            options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
            correctAnswer: "Nile River",
            explanation: "The Nile River is generally considered the longest river in the world, flowing approximately 6,650 kilometers (4,130 miles).",
            topic: "Major Rivers"
          },
          {
            id: 2,
            question: "Which river flows through the Grand Canyon?",
            options: ["Missouri River", "Columbia River", "Colorado River", "Rio Grande"],
            correctAnswer: "Colorado River",
            explanation: "The Colorado River flows through the Grand Canyon in the southwestern United States.",
            topic: "North American Rivers"
          },
          {
            id: 3,
            question: "Which river is considered sacred in Hinduism?",
            options: ["Indus", "Brahmaputra", "Yamuna", "Ganges"],
            correctAnswer: "Ganges",
            explanation: "The Ganges (Ganga) River is considered sacred in Hinduism and plays an important role in Hindu religious ceremonies and beliefs.",
            topic: "Cultural Significance"
          },
          {
            id: 4,
            question: "Which river forms parts of the border between the United States and Mexico?",
            options: ["Colorado River", "Mississippi River", "Rio Grande", "Snake River"],
            correctAnswer: "Rio Grande",
            explanation: "The Rio Grande forms a natural border between the United States and Mexico for approximately 1,885 kilometers (1,171 miles).",
            topic: "Border Rivers"
          },
          {
            id: 5,
            question: "Which river flows through Paris?",
            options: ["Thames", "Seine", "Rhine", "Loire"],
            correctAnswer: "Seine",
            explanation: "The Seine River flows through Paris, France, and is one of the city's most famous and iconic features.",
            topic: "European Rivers"
          }
        ]
      },
      {
        id: "mountains",
        title: "Mountains",
        description: "Test your knowledge of mountains around the world",
        icon: "mountain",
        difficulty: "medium",
        estimatedTime: "5 mins",
        questions: [
          {
            id: 1,
            question: "Which is the highest mountain in the world?",
            options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
            correctAnswer: "Mount Everest",
            explanation: "Mount Everest, located in the Himalayas on the border of Nepal and Tibet, is the highest mountain in the world at 8,848.86 meters (29,031.7 feet) above sea level.",
            topic: "Mountain Heights"
          },
          {
            id: 2,
            question: "Which mountain range contains Mount Everest?",
            options: ["Andes", "Alps", "Himalayas", "Rocky Mountains"],
            correctAnswer: "Himalayas",
            explanation: "Mount Everest is located in the Himalayas, a mountain range in Asia that separates the plains of the Indian subcontinent from the Tibetan Plateau.",
            topic: "Mountain Ranges"
          },
          {
            id: 3,
            question: "Which is the highest mountain in North America?",
            options: ["Mount McKinley (Denali)", "Mount Logan", "Pico de Orizaba", "Mount Saint Elias"],
            correctAnswer: "Mount McKinley (Denali)",
            explanation: "Mount McKinley, officially known as Denali, is the highest mountain in North America at 6,190 meters (20,310 feet).",
            topic: "Continental Peaks"
          },
          {
            id: 4,
            question: "Which volcano in Italy famously erupted in 79 AD, burying the cities of Pompeii and Herculaneum?",
            options: ["Mount Etna", "Mount Vesuvius", "Stromboli", "Monte Nuovo"],
            correctAnswer: "Mount Vesuvius",
            explanation: "Mount Vesuvius erupted in 79 AD, burying the Roman cities of Pompeii and Herculaneum under volcanic ash and pumice.",
            topic: "Historical Eruptions"
          },
          {
            id: 5,
            question: "Which is the highest mountain in Africa?",
            options: ["Mount Kenya", "Mount Kilimanjaro", "Mount Meru", "Mount Elgon"],
            correctAnswer: "Mount Kilimanjaro",
            explanation: "Mount Kilimanjaro in Tanzania is the highest mountain in Africa at 5,895 meters (19,341 feet).",
            topic: "African Mountains"
          }
        ]
      }
    ]
  },
  {
    id: "english",
    title: "English Language",
    description: "Test your knowledge on vocabulary, synonyms, and grammar",
    icon: "book",
    quizzes: [
      {
        id: "synonyms",
        title: "Synonyms",
        description: "Test your knowledge of word meanings and synonyms",
        icon: "vocabulary",
        difficulty: "medium",
        estimatedTime: "4 mins",
        questions: [
          {
            id: 1,
            question: "What is a synonym for 'benevolent'?",
            options: ["Malicious", "Kind", "Arrogant", "Timid"],
            correctAnswer: "Kind",
            explanation: "Benevolent means 'well-meaning and kindly'. Its synonym is 'kind'.",
            topic: "Positive Adjectives"
          },
          {
            id: 2,
            question: "Which word is a synonym for 'ubiquitous'?",
            options: ["Rare", "Everywhere", "Unique", "Hidden"],
            correctAnswer: "Everywhere",
            explanation: "Ubiquitous means 'present, appearing, or found everywhere'. Its synonym is 'everywhere' or 'omnipresent'.",
            topic: "Advanced Vocabulary"
          },
          {
            id: 3,
            question: "What is a synonym for 'lethargic'?",
            options: ["Energetic", "Sluggish", "Anxious", "Angry"],
            correctAnswer: "Sluggish",
            explanation: "Lethargic means 'lacking energy; sluggish and apathetic'. Its synonym is 'sluggish'.",
            topic: "State Words"
          },
          {
            id: 4,
            question: "Which word is a synonym for 'ephemeral'?",
            options: ["Eternal", "Brief", "Significant", "Important"],
            correctAnswer: "Brief",
            explanation: "Ephemeral means 'lasting for a very short time'. Its synonym is 'brief', 'fleeting', or 'transitory'.",
            topic: "Time Words"
          },
          {
            id: 5,
            question: "What is a synonym for 'audacious'?",
            options: ["Timid", "Careful", "Bold", "Ordinary"],
            correctAnswer: "Bold",
            explanation: "Audacious means 'showing a willingness to take surprisingly bold risks'. Its synonym is 'bold' or 'daring'.",
            topic: "Character Traits"
          }
        ]
      },
      {
        id: "antonyms",
        title: "Antonyms",
        description: "Test your knowledge of word opposites",
        icon: "vocabulary",
        difficulty: "medium",
        estimatedTime: "4 mins",
        questions: [
          {
            id: 1,
            question: "What is an antonym for 'abundant'?",
            options: ["Scarce", "Plentiful", "Generous", "Ample"],
            correctAnswer: "Scarce",
            explanation: "Abundant means 'existing or available in large quantities'. Its antonym is 'scarce'.",
            topic: "Quantity Words"
          },
          {
            id: 2,
            question: "Which word is an antonym for 'frugal'?",
            options: ["Economical", "Thrifty", "Extravagant", "Careful"],
            correctAnswer: "Extravagant",
            explanation: "Frugal means 'sparing or economical with money or food'. Its antonym is 'extravagant' or 'wasteful'.",
            topic: "Financial Terms"
          },
          {
            id: 3,
            question: "What is an antonym for 'cordial'?",
            options: ["Friendly", "Warm", "Hostile", "Polite"],
            correctAnswer: "Hostile",
            explanation: "Cordial means 'warm and friendly'. Its antonym is 'hostile' or 'unfriendly'.",
            topic: "Interpersonal Terms"
          },
          {
            id: 4,
            question: "Which word is an antonym for 'transparent'?",
            options: ["Clear", "Opaque", "Visible", "Apparent"],
            correctAnswer: "Opaque",
            explanation: "Transparent means 'allowing light to pass through so that objects behind can be distinctly seen'. Its antonym is 'opaque'.",
            topic: "Visual Terms"
          },
          {
            id: 5,
            question: "What is an antonym for 'augment'?",
            options: ["Increase", "Enhance", "Diminish", "Enlarge"],
            correctAnswer: "Diminish",
            explanation: "Augment means 'make (something) greater by adding to it'. Its antonym is 'diminish', 'decrease', or 'reduce'.",
            topic: "Change Words"
          }
        ]
      },
      {
        id: "grammar",
        title: "Grammar",
        description: "Test your knowledge of English grammar",
        icon: "book",
        difficulty: "hard",
        estimatedTime: "5 mins",
        questions: [
          {
            id: 1,
            question: "Which sentence contains a subject-verb agreement error?",
            options: [
              "The team is playing well this season.", 
              "The team are playing well this season.", 
              "Each of the players has their own locker.", 
              "Neither of the solutions is perfect."
            ],
            correctAnswer: "Each of the players has their own locker.",
            explanation: "In the sentence 'Each of the players has their own locker,' there is a pronoun agreement error. 'Each' is singular, so it should be 'Each of the players has his or her own locker.'",
            topic: "Agreement"
          },
          {
            id: 2,
            question: "Which sentence uses the correct form of the verb?",
            options: [
              "If I was you, I would accept the offer.", 
              "If I were you, I would accept the offer.", 
              "If I be you, I would accept the offer.", 
              "If I am you, I would accept the offer."
            ],
            correctAnswer: "If I were you, I would accept the offer.",
            explanation: "'If I were you' is correct because it uses the subjunctive mood, which is used to express hypothetical situations.",
            topic: "Verb Mood"
          },
          {
            id: 3,
            question: "Which of the following is a complex sentence?",
            options: [
              "I ran to the store and bought some milk.", 
              "I ran to the store.", 
              "Although it was raining, I went for a walk.", 
              "I ran to the store; I bought some milk."
            ],
            correctAnswer: "Although it was raining, I went for a walk.",
            explanation: "A complex sentence contains an independent clause and at least one dependent clause. 'Although it was raining, I went for a walk' has the dependent clause 'Although it was raining' and the independent clause 'I went for a walk.'",
            topic: "Sentence Structure"
          },
          {
            id: 4,
            question: "Which sentence contains a dangling modifier?",
            options: [
              "Walking down the street, the birds sang loudly.", 
              "The birds sang loudly as I walked down the street.", 
              "While walking down the street, I heard birds singing loudly.", 
              "The birds were singing loudly while I walked down the street."
            ],
            correctAnswer: "Walking down the street, the birds sang loudly.",
            explanation: "In 'Walking down the street, the birds sang loudly,' the modifier 'Walking down the street' dangles because it modifies 'birds,' but birds don't walk down streets. It should modify 'I': 'Walking down the street, I heard birds singing loudly.'",
            topic: "Modifiers"
          },
          {
            id: 5,
            question: "Which sentence uses punctuation correctly?",
            options: [
              "My favorite colors are: blue, green, and purple.", 
              "My favorite colors are blue, green and purple.", 
              "My favorite colors are blue, green, and purple.", 
              "My favorite colors are, blue, green, and purple."
            ],
            correctAnswer: "My favorite colors are blue, green, and purple.",
            explanation: "'My favorite colors are blue, green, and purple.' is correct. It uses the Oxford comma (the comma before 'and' in a list), which is generally recommended in formal writing for clarity.",
            topic: "Punctuation"
          }
        ]
      }
    ]
  },
  {
    id: "ai",
    title: "AI inD2D",
    description: "Test your knowledge on AI concepts and applications",
    icon: "lightbulb",
    quizzes: [],
    directQuiz: {
      id: "ai-basics",
      title: "AI Fundamentals",
      description: "Test your knowledge of AI concepts",
      icon: "lightbulb",
      difficulty: "medium",
      estimatedTime: "10 mins",
      questions: [
        {
          id: 1,
          question: "Which AI is primarily used for content writing?",
          options: ["ChatGPT", "GitHub Copilot", "Midjourney", "Stable Diffusion"],
          correctAnswer: "ChatGPT",
          explanation: "ChatGPT specializes in text generation, unlike Copilot (code) or Midjourney (images).",
          topic: "AI Applications"
        },
        {
          id: 2,
          question: "What type of learning involves an AI learning without labeled data?",
          options: ["Supervised learning", "Unsupervised learning", "Reinforcement learning", "Transfer learning"],
          correctAnswer: "Unsupervised learning",
          explanation: "Unsupervised learning is where algorithms find patterns in data without explicit labels.",
          topic: "Machine Learning"
        },
        {
          id: 3,
          question: "Which AI model generates images from text descriptions?",
          options: ["BERT", "GPT-4", "Midjourney", "AlphaGo"],
          correctAnswer: "Midjourney",
          explanation: "Midjourney is an AI that generates images based on text prompts.",
          topic: "Generative AI"
        },
        {
          id: 4,
          question: "What is the name of the self-driving car technology developed by Tesla?",
          options: ["Waymo", "Autopilot", "Cruise", "Zoox"],
          correctAnswer: "Autopilot",
          explanation: "Tesla's self-driving technology is called Autopilot (and Full Self-Driving for more advanced features).",
          topic: "Autonomous Systems"
        },
        {
          id: 5,
          question: "Which of these is a technique used to prevent AI models from overfitting?",
          options: ["Regularization", "Amplification", "Maximization", "Centralization"],
          correctAnswer: "Regularization",
          explanation: "Regularization techniques help prevent overfitting in machine learning models.",
          topic: "Model Training"
        },
        {
          id: 6,
          question: "Which company developed the large language model GPT-4?",
          options: ["Google", "Microsoft", "OpenAI", "Meta"],
          correctAnswer: "OpenAI",
          explanation: "GPT-4 was developed by OpenAI, although Microsoft has invested heavily in the company.",
          topic: "Language Models"
        },
        {
          id: 7,
          question: "What does AI stand for?",
          options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Integration", "Algorithmic Iteration"],
          correctAnswer: "Artificial Intelligence",
          explanation: "AI stands for Artificial Intelligence, which refers to machines that can perform tasks that typically require human intelligence.",
          topic: "AI Basics"
        },
        {
          id: 8,
          question: "Which of these is NOT a common application of AI?",
          options: ["Image recognition", "Natural language processing", "Time travel prediction", "Autonomous vehicles"],
          correctAnswer: "Time travel prediction",
          explanation: "Image recognition, natural language processing, and autonomous vehicles are common AI applications, while time travel prediction is not possible.",
          topic: "AI Applications"
        },
        {
          id: 9,
          question: "Which AI assistant was developed by Amazon?",
          options: ["Siri", "Alexa", "Cortana", "Google Assistant"],
          correctAnswer: "Alexa",
          explanation: "Alexa is Amazon's AI assistant, Siri is Apple's, Cortana is Microsoft's, and Google Assistant is Google's.",
          topic: "Virtual Assistants"
        },
        {
          id: 10,
          question: "Which field of AI focuses on making computers learn from data?",
          options: ["Machine Learning", "Robotics", "Expert Systems", "Computer Vision"],
          correctAnswer: "Machine Learning",
          explanation: "Machine Learning is the field of AI focused on algorithms that can learn from data without being explicitly programmed.",
          topic: "AI Fields"
        }
      ]
    }
  },
  {
    id: "generalknowledge",
    title: "General Knowledge",
    description: "Test your knowledge on various general topics",
    icon: "book",
    quizzes: [],
    directQuiz: {
      id: "gk-basics",
      title: "General Knowledge",
      description: "Test your general knowledge",
      icon: "book",
      difficulty: "easy",
      estimatedTime: "10 mins",
      questions: [
        {
          id: 1,
          question: "Which planet is known as the Red Planet?",
          options: ["Venus", "Mars", "Jupiter", "Saturn"],
          correctAnswer: "Mars",
          explanation: "Mars is often referred to as the Red Planet due to its reddish appearance, caused by iron oxide (rust) on its surface.",
          topic: "Astronomy"
        },
        {
          id: 2,
          question: "Who painted the Mona Lisa?",
          options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Michelangelo"],
          correctAnswer: "Leonardo da Vinci",
          explanation: "The Mona Lisa was painted by Italian Renaissance artist Leonardo da Vinci between 1503 and 1519.",
          topic: "Art History"
        },
        {
          id: 3,
          question: "Which country is known as the Land of the Rising Sun?",
          options: ["China", "Thailand", "South Korea", "Japan"],
          correctAnswer: "Japan",
          explanation: "Japan is known as the Land of the Rising Sun because from China, Japan appears to be in the direction where the sun rises.",
          topic: "Geography"
        },
        {
          id: 4,
          question: "What is the largest ocean on Earth?",
          options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
          correctAnswer: "Pacific Ocean",
          explanation: "The Pacific Ocean is the largest and deepest ocean on Earth, covering more than 30% of the Earth's surface.",
          topic: "Geography"
        },
        {
          id: 5,
          question: "In which year did the Titanic sink?",
          options: ["1912", "1905", "1920", "1931"],
          correctAnswer: "1912",
          explanation: "The RMS Titanic sank on April 15, 1912, after colliding with an iceberg during her maiden voyage.",
          topic: "History"
        },
        {
          id: 6,
          question: "Who wrote 'Romeo and Juliet'?",
          options: ["Charles Dickens", "Jane Austen", "William Shakespeare", "Mark Twain"],
          correctAnswer: "William Shakespeare",
          explanation: "Romeo and Juliet is a tragedy written by William Shakespeare early in his career, between 1591 and 1595.",
          topic: "Literature"
        },
        {
          id: 7,
          question: "What is the chemical symbol for gold?",
          options: ["Go", "Gd", "Au", "Ag"],
          correctAnswer: "Au",
          explanation: "The chemical symbol for gold is Au, derived from the Latin word 'aurum'.",
          topic: "Chemistry"
        },
        {
          id: 8,
          question: "Which is the smallest continent by land area?",
          options: ["Europe", "Australia", "Antarctica", "South America"],
          correctAnswer: "Australia",
          explanation: "Australia is the smallest continent by land area, covering about 8.5 million square kilometers.",
          topic: "Geography"
        },
        {
          id: 9,
          question: "Who was the first person to step on the moon?",
          options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "Alan Shepard"],
          correctAnswer: "Neil Armstrong",
          explanation: "Neil Armstrong was the first person to walk on the moon on July 21, 1969, as part of the Apollo 11 mission.",
          topic: "Space Exploration"
        },
        {
          id: 10,
          question: "What is the capital of Canada?",
          options: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
          correctAnswer: "Ottawa",
          explanation: "Ottawa is the capital city of Canada, located in the eastern portion of southern Ontario.",
          topic: "Geography"
        }
      ]
    }
  },
  {
    id: "daily-challenge",
    title: "Daily Challenge",
    description: "A new set of mixed questions every day",
    icon: "calendar",
    quizzes: [],
    directQuiz: {
      id: "daily-quiz",
      title: "Daily Challenge",
      description: "A new set of mixed questions every day",
      icon: "calendar",
      difficulty: "medium",
      estimatedTime: "5 mins",
      questions: [] // This will be populated by getDailyQuiz function
    }
  }
];
