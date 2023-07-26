const { Client, Interaction } = require('discord.js');

const codePrompts = {
  'JavaScript Palindrome Check': 'JavaScript Palindrome Check',
  'Python File Handling': 'Python File Handling',
  'Java Prime Number Check': 'Java Prime Number Check',
  'C++ Reverse Array': 'C++ Reverse Array',
  'HTML Form Validation': 'HTML Form Validation',
  'CSS Flexbox Layout': 'CSS Flexbox Layout',
  'SQL Create Table': 'SQL Create Table',
  'Swift For Loop': 'Swift For Loop',
  'JavaScript Random Number Generator': 'JavaScript Random Number Generator',
  'Python Dictionary Manipulation': 'Python Dictionary Manipulation',
  'Java Object-Oriented Programming': 'Java Object-Oriented Programming',
  'C++ Linked List Implementation': 'C++ Linked List Implementation',
  'HTML Image Tag': 'HTML Image Tag',
  'CSS Box Model': 'CSS Box Model',
  'SQL Aggregate Functions': 'SQL Aggregate Functions',
  'Swift Optionals': 'Swift Optionals',
  'JavaScript Fetch API': 'JavaScript Fetch API',
  'Python Data Visualization': 'Python Data Visualization',
  'Java Exception Handling': 'Java Exception Handling',
  'C++ Recursion': 'C++ Recursion',
  // Add more code prompts as needed...
};

// Responses corresponding to the code prompts
const codeResponses = {
  'JavaScript Palindrome Check': `function isPalindrome(str) {
  const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversedStr = cleanedStr.split('').reverse().join('');
  return cleanedStr === reversedStr;
}`,

  'Python File Handling': `# Example of reading from a file in Python
file_path = 'example.txt'
with open(file_path, 'r') as file:
    content = file.read()
    print(content)`,

  'Java Prime Number Check': `// Check if a number is prime in Java
public static boolean isPrime(int number) {
    if (number <= 1) {
        return false;
    }
    for (int i = 2; i <= Math.sqrt(number); i++) {
        if (number % i == 0) {
            return false;
        }
    }
    return true;
}`,

  'C++ Reverse Array': `// Reverse an array in C++
void reverseArray(int arr[], int size) {
    int start = 0;
    int end = size - 1;
    while (start < end) {
        int temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
    }
}`,

  'HTML Form Validation': `<!-- HTML form validation -->
<form onsubmit="return validateForm()" action="/submit" method="post">
    <input type="text" id="name" required>
    <input type="email" id="email" required>
    <button type="submit">Submit</button>
</form>
<script>
function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    if (name === '' || email === '') {
        alert('Name and email are required!');
        return false;
    }
    return true;
}
</script>`,

  'CSS Flexbox Layout': `/* CSS Flexbox Layout */
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
.item {
    flex: 1;
    margin: 10px;
}`,

  'SQL Create Table': `-- SQL Create Table
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    age INT
);`,

  'Swift For Loop': `// Swift For Loop
for i in 1...5 {
    print("Number: \(i)")
}`,

  'JavaScript Random Number Generator': `// JavaScript Random Number Generator
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}`,

  'Python Dictionary Manipulation': `# Python Dictionary Manipulation
person = {
    'name': 'John',
    'age': 30,
    'city': 'New York'
}
# Add a new key-value pair
person['occupation'] = 'Engineer'
# Remove a key-value pair
del person['city']`,

  'Java Object-Oriented Programming': `// Java Object-Oriented Programming
class Circle {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    public double getArea() {
        return Math.PI * radius * radius;
    }
}`,

  'C++ Linked List Implementation': `// C++ Linked List Implementation
#include <iostream>

struct Node {
    int data;
    Node* next;
};

class LinkedList {
private:
    Node* head;

public:
    LinkedList() : head(nullptr) {}

    void insert(int data) {
        Node* newNode = new Node;
        newNode->data = data;
        newNode->next = head;
        head = newNode;
    }

    void display() {
        Node* current = head;
        while (current != nullptr) {
            std::cout << current->data << " ";
            current = current->next;
        }
    }
};`,

  'HTML Image Tag': `<!-- HTML Image Tag -->
<img src="example.jpg" alt="Example Image">`,

  'CSS Box Model': `/* CSS Box Model */
.box {
    width: 100px;
    height: 50px;
    padding: 10px;
    border: 1px solid black;
    margin: 20px;
}`,

  'SQL Aggregate Functions': `-- SQL Aggregate Functions
SELECT COUNT(*) FROM users;
SELECT AVG(age) FROM employees;
SELECT MAX(salary) FROM employees;`,

  'Swift Optionals': `// Swift Optionals
var favoriteBook: String? = "Harry Potter"
if let book = favoriteBook {
    print("My favorite book is \(book)")
} else {
    print("I don't have a favorite book")
}`,

  'JavaScript Fetch API': `// JavaScript Fetch API
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));`,

  'Python Data Visualization': `# Python Data Visualization
import matplotlib.pyplot as plt

x = [1, 2, 3, 4, 5]
y = [10, 8, 12, 6, 14]

plt.plot(x, y)
plt.xlabel('X-axis')
plt.ylabel('Y-axis')
plt.title('Sample Data Visualization')
plt.show()`,

  'Java Exception Handling': `// Java Exception Handling
public class Divide {
    public static int divideNumbers(int dividend, int divisor) {
        try {
            return dividend / divisor;
        } catch (ArithmeticException e) {
            System.err.println("Error: Division by zero");
            return 0;
        }
    }
}`,

  'C++ Recursion': `// C++ Recursion
int factorial(int n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    return n * factorial(n - 1);
}`,
};

module.exports = {
  name: 'gptcode',
  description: 'Interact with GPT-3 to generate code snippets based on pre-defined prompts.',
  options: [
    {
      name: 'prompt',
      description: 'Choose a code prompt:',
      type: 3,
      required: true,
      choices: Object.keys(codePrompts).map((key) => ({
        name: key,
        value: key,
      })),
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    try {
      await interaction.deferReply();

      const selectedPrompt = interaction.options.getString('prompt');

      // Check if the selected prompt exists in the prompts object
      if (!codePrompts[selectedPrompt]) {
        interaction.editReply('Invalid prompt selected.');
        return;
      }

      const response = generateGPT3Response(selectedPrompt);

      // Send the response as a code block using three backticks
      const codeBlockResponse = `\`\`\`${response}\`\`\``;
      interaction.editReply(codeBlockResponse);
    } catch (error) {
      console.error('Error with /gptcode:', error);
      interaction.editReply('An error occurred while processing your code prompt.');
    }
  },
};

/**
 * Generate a code response from GPT-3 using the provided code prompt.
 * @param {string} promptKey - The key of the code prompt for GPT-3.
 * @returns {string} - The generated code response from GPT-3.
 */
function generateGPT3Response(promptKey) {
  const prompt = codePrompts[promptKey];
  const response = codeResponses[promptKey];

  if (!prompt || !response) {
    return `No response available for the prompt: "${promptKey}"`;
  }

  return response;
}
