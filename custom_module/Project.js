class Project {
  constructor(name, customer, executor) {
    this.name = name;
    this.customer = customer;
    this.executor = executor;
    if (typeof name === "undefined") {
      this.name = "Невідомий проєкт";
    }
  }
}

global_projects_list = new Array();

exports.find_Project = (name, customer, executor) => {
  for (let project of global_projects_list) {
    if (
      project.name === name &&
      project.customer === customer &&
      project.executor === executor
    ) {
      return project;
    }
  }

  return -1;
};

exports.add_Project = (name, customer, executor) => {
  let project = new Project(name, customer, executor);
  global_projects_list.push(project);

  return project;
};

exports.remove_Project = (name, customer, executor) => {
  for (let i = 0; i < global_projects_list.length; i++) {
    let project = global_projects_list[i];
    if (
      project.name === name &&
      project.customer === customer &&
      project.executor === executor
    ) {
      global_projects_list.splice(i, 1);
      return 1;
    }
  }

  return -1;
};

exports.edit_Project = (
  name,
  customer,
  executor,
  new_name,
  new_customer,
  new_executor
) => {
  for (let i = 0; i < global_projects_list.length; i++) {
    let project = global_projects_list[i];
    if (
      project.name === name &&
      project.customer === customer &&
      project.executor === executor
    ) {
      global_projects_list[i].name = new_name;
      global_projects_list[i].customer = new_customer;
      global_projects_list[i].executor = new_executor;
      return 1;
    }
  }

  return -1;
};

exports.get_Projects_List = () => {
  console.log("\n" + "Список усіх проєктів:");

  for (let i = 0; i < global_projects_list.length; i++) {
    let project = global_projects_list[i];
    console.log(
      `Ім'я проєкта: ${project.name}, ім'я замовника: ${project.customer}, ім'я виконавця: ${project.executor}`
    );
  }

  return global_projects_list;
};

exports.get_User_Projects_List = (userName) => {
  console.log(`\nСписок усіх проєктів, які має ${userName}:`);

  for (let i = 0; i < global_projects_list.length; i++) {
    if (
      global_projects_list[i].customer === userName ||
      global_projects_list[i].executor === userName
    ) {
      let project = global_projects_list[i];
      console.log(
        `Ім'я проєкта: ${project.name}, ім'я замовника: ${project.customer}, ім'я виконавця: ${project.executor}`
      );
    }
  }

  return global_projects_list;
};
