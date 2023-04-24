// Необхідні змінні
let last_executor_id = 0;
let executors_list = new Array();

// Клас - виконавець
class Executor {

    // Конструктор класу
    constructor (name, employee_count, experience, id) {
    
        this.id = id;
        this.name = name;
        this.employee_count = employee_count;
        this.experience = experience;
        
        if (id === "" ||
            typeof id             === 'undefined') { this.id             = ++last_executor_id;     }
        if (name === "" ||
            typeof name           === 'undefined') { this.name           = "Невідомий виконавець"; }
        if (employee_count === "" ||
            typeof employee_count === 'undefined') { this.employee_count = "Не встановлено";       }
        if (experience === "" ||
            typeof experience     === 'undefined') { this.experience     = 0;                      }
    
    }
}

// ...............................................................................................

// Додавання нового виконавця
function add_executor (name, employee_count, experience, id) {

    let executor = new Executor(name, employee_count, experience, id);
    executors_list.push(executor);

    return executor;

}

// Видалити виконавця з колекції
function remove_executor (id) {

    for (let z = 0; z < executors_list.length; z++) {

        let executor = executors_list[z];
        if (executor.id === id) { executors_list.splice(z, 1);
                                  return 1; }

    }

    return -1;

}

// ...............................................................................................

// Повертаємо список усіх виконавців
function get_executors_list () {
    return executors_list;
}

// Задаємо список усіх виконавців
function set_executors_list (data) {

    if (!data || data.length < 1) { return; }

    for (let element of data) {
        add_executor(element.name,
                     element.employee_count,
                     element.experience,
                     element.id);
    }
}

// Повертає виконавця по його id
function get_executor_by_id (id) {

    for (let z = 0; z < executors_list.length; z++) {

        let executor = executors_list[z];
        if (executor.id === id) { return executor; }

    }

    return -1;

}

// ...............................................................................................

// Редагувати лікаря в колекції
function edit_executor (id, new_name, new_employee_count, new_experience) {

    for (let z = 0; z < executors_list.length; z++) {

        let executor = executors_list[z];

        if (executor.id === id) { executor.employee_count = new_employee_count;
                                  executor.name = new_name;
                                  executor.experience = new_experience;
                                  return 1; }

    }

    return -1;

}

// ...............................................................................................

// Знайти лікаря в колекції
function find_executors (search) {
    
    let result = [];
    search = search.toLowerCase();

    for (let executor of executors_list) {

        let attributes = [ executor.name,
                           executor.employee_count,
                           executor.experience ];

        for (let attr of attributes) {

            if (attr.toLowerCase().includes(search)) { result.push(executor);
                                                       break;
            }
        }
    }

    return result;

}

// ...............................................................................................

// Вивести в консоль список виконавців
function print_executors_list () {

    console.log("\n" + "Список усіх виконавців:");

    for (let z = 0; z < executors_list.length; z++) {

        let item = executors_list[z];
        console.log("\t" + "Назва виконавця: "                 + item.name);
        console.log("\t" + "Кількість працівників виконавця: " + item.employee_count);
        console.log("\t" + "Досвід виконавця: "                + item.experience);
        console.log("\t" + "ID: "                              + item.id);

    }
}