// Необхідні змінні
let last_project_id = 0;
let projects_list = new Array();

// Клас - лікарня
class Project {

    constructor (name, customer, executor, id) {
    
        this.id = id;
        this.name = name;
        this.customer = customer;
        this.executor = executor;
        
        if (id === "" ||
            typeof id       === 'undefined') { this.id       = ++last_project_id;  }
        if (name === "" ||
            typeof name     === 'undefined') { this.name     = "Невідомий проєкт"; }
        if (customer === "" ||
            typeof customer === 'undefined') { this.customer = "Не встановлено";   }
        if (executor === "" ||
            typeof executor === 'undefined') { this.executor = "Не встановлено";   }
   
    }
}

// ...............................................................................................

// Додавання нової лікарні
function add_project (name, customer, executor, id) {

    let project = new Project(name, customer, executor, id);
    projects_list.push(project);

    return project;

}

// Видалення лікарні з колекції
function remove_project (id) {

    for (let z = 0; z < projects_list.length; z++) {

        let project = projects_list[z];
        if (project.id === id) { projects_list.splice(z, 1);
                                  return 1; }

    }

    return -1;

}

// ...............................................................................................

// Повертаємо список усіх лікарень
function get_projects_list()
    { return projects_list; }

// Задаємо список усіх лікарень
function set_projects_list (data) {

    if (!data || data.length < 1) { return; }

    for (let element of data) {
        add_project(element.name,
                     element.customer,
                     element.executor,
                     element.id);
    }
}

// Повертає лікарню по її id
function get_project_by_id (id) {

    for (let z = 0; z < projects_list.length; z++) {

        let project = projects_list[z];
        if (project.id === id) { return project; }

    }

    return -1;

}

// ...............................................................................................

// Редагувати лікарню в колекції
function edit_project (id, new_name, new_customer, new_executor) {

    for (let z = 0; z < projects_list.length; z++) {

        let project = projects_list[z];

        if (project.id === id) { project.name = new_name;
                                  project.customer = new_customer;
                                  project.executor = new_executor;
                                  return 1; }

    }

    return -1;

}

// ...............................................................................................

// Знайти лікарню в колекції
function find_projects (search) {

    let result = [];
    search = search.toLowerCase();

    for (let project of projects_list) {

        let attributes = [ project.name,
                           project.customer,
                           project.executor ];

        for (let attr of attributes) {

            if (attr.toLowerCase().includes(search)) { result.push(project);
                                                       break;
            }
        }
    }

    return result;

}

// ...............................................................................................

// Вивести в консоль список лікарень
function print_projects_list() {

    console.log("\n" + "Список усіх проєктів:");

    for (let z = 0; z < projects_list.length; z++) {

        let project = projects_list[z];
        console.log("\t" + "Назва проєкта: "  + project.name);
        console.log("\t" + "Назва замовника: " + project.customer);
        console.log("\t" + "Назва виконавця: " + project.executor);
        console.log("\t" + "ID: "             + project.id);

    }
}