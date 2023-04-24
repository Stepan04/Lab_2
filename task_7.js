const mod = require('./custom_module/module');

// Додавання замовників
let h1 = mod.add_Сustomer("Petro", "28");
let h2 = mod.add_Сustomer("Dima", "27");
let h3 = mod.add_Сustomer("Vasya", "36");

// Список замовників
mod.get_Customer_List();

// Видалення замовникa
console.log("Видалення замовникa: Dima");
mod.remove_Сustomer("Dima", "27");

// Список замовників
mod.get_Customer_List();

// Зміна замовникa
console.log("Зміна замовникa: Vasya");
mod.edit_Сustomer("Vasya", "36", "Pavlo", "44");

// Список замовників
mod.get_Customer_List();

// Пошук замовників
let cust1 = mod.find_Сustomer("Petro", "28");
console.log(`Пошук замовника Petro: ${cust1 !== -1 ? "знайдено" : "не знайдено"}`);
let cust2 = mod.find_Сustomer("Kolya", "45");
console.log(`Пошук замовника Kolya: ${cust2 !== -1 ? "знайдено" : "не знайдено"}`);

////////////////////////////////////////////////////////////////////////////////////
 // Додавання виконавця
mod.add_Performer("А. Фролов", 30);
mod.add_Performer("Ю. Остапчук", 36);
mod.add_Performer("Г. Сковорода", 45);

// Отримати список виконавців
mod.get_Performer_List();

// Видалення виконавця з колекції
console.log("Видалення виконавця: А. Фролов");
mod.remove_Performer("А. Фролов", 30);

// Отримати список виконавців
mod.get_Performer_List();

// // Редагування виконавців
console.log("Редагування виконавців: Г. Сковорода");
mod.edit_Performer("Г. Сковорода", 45, "О. Хітинська", 54);

// Отримати список виконавців
mod.get_Performer_List();

////////////////////////////////////////////////////
// Додавання нового проекту
mod.add_Project("Project1","Ю. Остапчук", "Petro");
mod.add_Project("Project2","А. Фролов", "Petro");
mod.add_Project("Project3","Ю. Остапчук","Petro");

// список проектів
mod.get_Project_List();

// Видалення проекту
console.log("Видалення проекту: Project2");
mod.remove_Project("Project2", "А. Фролов", "Petro");

// Список проектів 
mod.get_Project_List();

// редагувати проект
console.log("Редагування проектy: Project3");
mod.edit_Project("Project3", "Ю. Остапчук","Petro", "Project3333", "Petrenko","Василенко");

// Список проектів 
mod.get_Project_List();

// Пошук проектів
let doc1 = mod.find_Project("Project1", "Ю. Остапчук", "Petro");
console.log(`Пошук проекту - Project1: ${doc1 !== -1 ? "знайдено" : "не знайдено"}`);
let doc2 = mod.find_Project("Project22", "Ю. Остапчук", "Petro");
console.log(`Пошук проекту - Project22: ${doc2 !== -1 ? "знайдено" : "не знайдено"}`);
////////////////////////////////////////////////////////////////////////////////////

//Пошук усіх проектів виконавця
mod.get_User_Performer_List("Petrenko");

// Пошук усіх проектів замовника
mod.get_User_Customer_List("Petro");
