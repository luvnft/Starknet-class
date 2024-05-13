
#Basics of Cairo Language#

Cairo is the smart contract language used for developing smart contracts on the StarkNet network. More importantly, Cairo is a fully featured language compatible with STARK Proofs, and although we use it in this context to build smart contracts on StarkNet, you can also use it outside of StarkNet! Unlike Solidity, Cairo was built from day one with the aim of compatibility with ZK proof systems. Therefore, any transactions for a smart contract written using Cairo can be automatically and efficiently translated into the ZK-STARK proof that can be deployed on Layer 1.

Cairo is a revolutionary programming language like no other. It's not like typical languages such as Python or Java; it's a Turing-complete language designed specifically to prove program correctness before execution. Imagine being fully confident in the execution of your program, even on a device you don't fully control!

##Development Environment Setup##

If you haven't installed the basic development environment on your machine, you can go back to the previous lesson to install it and then continue with the lesson.

In this lesson, we will use the scarb tool to run and test our code easily.

We'll open a terminal or cmd and then create a folder called cairo_lesson.

```bash
mkdir cairo_lesson & cd cairo_lesson
```
To create the scarb environment, we'll run this command:

bash
Copy code
scarb init
The environment has been successfully created!

The essential files we'll be dealing with:

Scarb.toml file for managing the project as a whole.
The src folder is where we'll create and work with the Cairo language files. You'll notice there's an automatic file named lib.cairo, which is the file we'll be editing throughout this lesson.
To run or test the code throughout this lesson, you'll enter this command:

bash
Copy code
scarb cairo-run --available-gas=200000000
After running this command, you'll notice a new folder named target created, which you'll need in the upcoming lessons when deploying smart contracts on starknet. In this lesson, we'll focus solely on learning the basics of the cairo language.

Cairo language is similar to Rust, so it's a good opportunity to learn this language, as Rust is one of the most in-demand languages in the job market due to the scarcity of developers and perhaps its slight difficulty as it differs from other programming languages.

Basic Code Structure
To start writing Cairo code, we'll define a function called main and then write the code inside the function so that scarb can compile it. We'll explain the functions below; all you need to know for now is the general structure:

rust
Copy code
fn main() {

}
Printing - Print
It's important to clarify this at the beginning! To print any text you want, you'll use the command println!().

Copy the code into the lib.cairo file and then follow the explanation below the code directly:

rust
Copy code
fn main() {
    println!("Hello World");

    println!("5");
    println!("{}", 5);

    println!("My name is AH and my age {}", 20);

    println!("The month = {} and the week = {}", 30, 7);
}
Let's clarify each line:

Line 2: We printed Hello World like in other programming languages.
Lines 4 and 5: Although both lines print the number 5, the second method is important to know when we want to print variables.
Lines 7 and 9: Same concept as line 5, but with additional examples to understand the usage of curly braces {}.
Try implementing and running the code above to see the results on your device.

Variables

In Cairo language, there are 2 types of variables:

Variables that cannot be modified automatically and are defined using the keyword let, and it's possible to make them changeable easily by adding mut.
Variables that cannot be modified at all and are defined using the keyword const.
We'll understand now through the following code:
Copy the code into the lib.cairo file and then follow the explanation below the code directly:

rust
Copy code
const ONE_HOUR_IN_SECONDS: u128 = 3600;

fn main () {
    let number_1: u128 = 10;
    println!("Number 1 = {}", number_1);

    let number_2: u256 = 15;
    println!("Number 2 = {}", number_2);

    let message: ByteArray = "Hello World!";
    println!("The message: {}", message);

    let boo: bool = true;
    println!("Boo is {}", boo);

    let mut nums: u128 = 5;
    println!("Before edit the variable: {}", nums);

    nums = 2;
    println!("After edit the variable: {}", nums);
    
    println!("{}", ONE_HOUR_IN_SECONDS);

    let num_1 = 100;
    let boos = true;
}

Let's clarify each line:

Line 1: We defined a variable that is immutable using const. The variable name is ONE_HOUR_IN_SECONDS. Since the value we want to store is a positive number, we added the type u128. Then we added the value, which is 3600, representing the number of seconds in an hour. (Note: Constants are defined outside the main function).
Line 4: We defined a variable using let. This type of variable is immutable by default, but we can make it mutable, as we'll see in the following lines. We named the variable number_1, and since the value we want to store is a positive number, we added the type u128. Then we added the value, which is 10.
Line 5: We printed the value of the variable number_1 using curly braces {}.
Lines 7 and 8: We defined a variable named number_2 with the type u256 instead of u128. Then we added the value 20, and in line 8, we printed the value.
Lines 10 and 11: We defined a variable named message with the type ByteArray to store a text value. Then we stored the desired text, and in line 11, we printed the value.
Lines 13 and 14: We defined a variable named boo with the type bool to store a logical value, either true or false. Then we stored the value true, and in line 14, we printed the value.
Lines 16 and 17: We defined a variable named nums with the keyword mut to make it mutable. Then we specified the type u128 and added the value 5. In line 17, we printed the variable, and you'll notice that the printed value is 5.
Lines 19 and 20: After defining the variable nums as mutable, in line 19, we changed the value of the variable from 5 to 2. In line 20, we printed the value of the variable, and you'll notice that the printed value is 2.
Line 22: We printed the value of the constant variable defined in line 1.
Lines 24 and 25: We defined two variables in these lines with the same purpose as the ones above, but this time without specifying a type beforehand. It's always preferred to specify a type for a variable during its definition.
Try running and applying the code above to see the results on your device.

For more information on variable types, you can refer to Cairo's documentation.

Conditional Statements - if/else
The if/else statement is used to execute different code depending on a certain condition.

Let's understand through the following code: Copy the code into the file lib.cairo and then follow the explanation below it directly.

rust
Copy code
fn main() {
    let num: u8 = 5;

    if num > 10 {
        println!("big number");
    }
    else if num == 10 {
        println!("good number");
    }
    else {
        println!("bad number");
    }
}
Let's clarify each line:

Line 2: We defined a variable named num with a numerical value of 5.
Lines 4 - 6: We added a condition using the keyword if. If the value of the variable is "greater than" 10, it prints "big number".
Lines 7 - 9: We added another condition using the keyword else if. If the previous condition is not met and the value equals 10, it prints "good number". (You can also add additional conditions, but we'll stick to one additional condition).
Lines 10 - 12: We added a condition using the keyword else. If none of the previous conditions are met, it prints "bad number".
Try running and applying the code above to see the results on your device.

Functions
Working with functions in Cairo is similar to many programming languages. We can create functions to return a specific value or perform multiple operations. Let's move on to examples directly.

Copy the code into the file lib.cairo and then follow the explanation below it directly.

rust
Copy code
fn main() {
    let value = sum(10, 20);
    println!("The value: {}", value);

    check(8);
}

fn sum(x: u32, y: u32) -> u32 {
    x + y
}

fn check(val: u32) {
    if val >= 10 {
        println!("Big number");
    } else {
        println!("Small number");
    }
}
In the above code, we have 3 functions:

Main Function: As discussed earlier, this is the main function for the program to execute. We call any other functions we create within the main function.
sum Function: We defined a function called sum that takes two parameters x and y of type u32 and returns their sum. We call the sum function within the main function in line 2 and pass two numbers we want to add together. We store the result of the function (the sum of the two numbers) in the variable value and print it in line 3.
check Function: We defined a function called check that takes a single parameter val of type u32. The purpose of this function is to perform certain operations and not return any value like the sum function. All it does is check if val is "greater than or equal to" 10, it prints "Big number", otherwise, it prints "Small number". Then, we call the check function within the main function in line 5 and pass the value 8.
Try running and applying the code above to see the results on your device.

You can find more examples here. But don't worry, we'll mention many examples in the future lessons and also while writing smart contracts. Just keep learning.

Arrays
Arrays work in Cairo the same way they do in other programming languages. Let's dive into the examples directly.

Copy the code into the lib.cairo file and then follow the explanation above each line:

rust
Copy code
fn main() {
    // Define a mutable variable to store a new array
    let mut arr = ArrayTrait::new();

    // Add four values to the array
    arr.append(5);
    arr.append(10);
    arr.append(15);
    arr.append('hi');

    // In arrays, the index of the values we enter starts from 0
    // Print the value at index 0
    println!("Index 0: {}", *arr.at(0));
    // Print the value at index 1
    println!("Index 1: {}", *arr.at(1));

    // Print the size of the array
    println!("The len: {}", arr.len());

    // Remove the first element in the array
    arr.pop_front();
    // Remove the first element in the array
    arr.pop_front();

    // Print the value at index 0
    println!("Index 0: {}", *arr.at(0));

    // Print the size of the array
    println!("The len: {}", arr.len());
}
Try running and applying the code above to see the results on your machine.

Structs
Structs in Cairo are a way to define custom types with members from other types. They are useful for grouping related data together, such as book titles, authors, and ISBN numbers in a library. Structs can be used to store complex data types like mappings and arrays. Additionally, structs can be stored in other structs, allowing for data nesting.

Copy the code into the lib.cairo file and then follow the explanation above each line:

rust
Copy code
// This allows the struct to be called inside functions or copied
#[derive(Drop, Copy)]
// Define the struct for employees that combines three types of data
struct Employee {
    name: felt252,
    age: u32,
    salary: u32,
}

fn main() {
    // Store employee data in a variable according to the types defined in the struct
    let employee: Employee = Employee { name: 'ali', age: 20, salary: 5000 };

    // Print the employee's name
    println!("{}", employee.name);
    // Print the employee's age
    println!("{}", employee.age);
    // Print the employee's salary
    println!("{}", employee.salary);
}
As you can see above, when defining the variable employee, we made its type based on the Employee struct, allowing it to receive all data types we want to store without problems.

Try running and applying the code above to see the results on your machine.

Working with Structs and Functions
Copy the code into the lib.cairo file and then follow the explanation above each line:

rust
Copy code
// This allows the struct to be called inside functions or copied
#[derive(Drop, Copy)]
// Define the struct for people that combines four types of data
struct Person {
    name: felt252,
    email: felt252,
    age: u32,
    year_join: u32, 
}

fn main() {
    // Store person data in a variable according to the types defined in the struct
    let per: Person = Person { name: "Ali", email: "ali@gmail.com", age: 20, year_join: 2023 };

    // Call the function and input variable data
    print_person(per);
    
    // Create a variable to store the year from the function
    let year: u32 = year_birthday(per);
    // Print the person's birth year
    println!("The year birthday: {}", year);
}

// Print all person data by receiving a value of type struct
fn print_person(val: Person) {
    println!("name: {}", val.name);
    println!("email: {}", val.email);
    println!("age: {}", val.age);
    println!("year_join: {}", val.year_join);
}

// Function to calculate and return the person's birth year
fn year_birthday(val: Person) -> u32 {
    val.year_join - val.age
}
Try running and applying the code above to see the results on your machine.

Trait & Impl
As you noticed in the previous example while dealing with functions, it seems a bit cumbersome, especially if the project is large and you want to use it extensively across many files.

However, using Trait and Impl, we can organize the project simply as interfaces and work with structs easily.

Using Trait, we gather functions in one place as a group, and then use them in Impl as an interface to build on.

Copy the code into the lib.cairo file and then follow the explanation below the code directly:

rust
Copy code
#[derive(Drop, Copy)]
struct Person {
    name: felt252,
    email: felt252,
    age: u32,
    year_join: u32, 
}

trait IPerson {
    fn year_birthday(self: Person) -> u32;
    fn edit_year_join(ref self: Person, newYear: u32);
}

impl PersonImpl of IPerson {
    fn year_birthday(self: Person) -> u32 {
        self.year_join - self.age
    }

    fn edit_year_join(ref self: Person, newYear: u32) {
        self.year_join = newYear;
    }
}

fn main() {
    let mut per = Person { name: "Ali", email: "ali@gmail.com", age: 20, year_join: 2020 };

    println!("Year join: {}", per.year_join);

    let year: u32 = per.year_birthday();
    println!("The year birthday: {}", year);

    per.edit_year_join(2024);
    println!("Year join: {}", per.year_join);
}
Explanation of each line:

Lines 1 - 7: We defined a struct called Person to create a data structure that includes name, email, age, and year of joining.

Lines 9 - 12: We created a trait named IPerson and declared two functions. The first function, year_birthday, returns the person's birth year, and the second function, edit_year_join, modifies the year of joining. However, as you can see, these are just interfaces that don't execute anything.

Lines 14 - 22: We created an impl named PersonImpl that uses the IPerson trait. As you can see, inside the impl, we only implement the functions declared in the trait. In line 15, we wrote the year_birthday function, passing self to copy the Person struct, allowing access to the variables inside the struct. Then, inside the function, we performed a calculation, subtracting the age from the year of joining, and returned a numerical value, the birth year. In line 19, we wrote the edit_year_join function, which modifies the year of joining. But as you can see, while passing the self variable to copy the Person struct, we added ref before the self variable, which allows us to modify the data normally. We also passed the newYear variable, which is the new value we want to store, and then added the value newYear to the year of joining.
Lines 24 - 34: We included everything we built in the main function. We stored the struct data in the variable per, and then easily called the functions in impl via the per variable.

Try running and applying the code above to see the results on your machine.

Don't worry if you don't understand it quickly; we'll be using mod extensively in the next lesson while creating smart contracts.

As always, if you have any questions or feel stuck, or just want to say hello, feel free to join us on Discord https://discord.gg/xTyByNRemx, and we'll be more than happy to assist you!