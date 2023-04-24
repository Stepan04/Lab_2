class Executor {
  constructor(name, age) {
    this.name = name;
    this.age = age;
    if (typeof name === "undefined") {
      this.name = "Невідомий виконавець";
    }
  }
}

global_executors_list = new Array();

exports.find_Executor = (name, age) => {
  for (let executor of global_executors_list) {
    if (executor.name === name && executor.age === age) {
      return executor;
    }
  }

  return -1;
};

exports.add_Executor = (name, age) => {
  let executor = new Executor(name, age);
  global_executors_list.push(executor);

  return executor;
};

exports.remove_Executor = (name, age) => {
  for (let i = 0; i < global_executors_list.length; i++) {
    let executor = global_executors_list[i];
    if (executor.name === name && executor.age === age) {
      global_executors_list.splice(i, 1);
      return 1;
    }
  }

  return -1;
};

exports.edit_Executor = (name, age, new_name, new_age) => {
  for (let i = 0; i < global_executors_list.length; i++) {
    let executor = global_executors_list[i];
    if (executor.name === name && executor.age === age) {
      global_executors_list[i].name = new_name;
      global_executors_list[i].age = new_age;
      return 1;
    }
  }

  return -1;
};

exports.get_Executors_List = () => {
  console.log("\n" + "Список усіх виконавців:");

  for (let i = 0; i < global_executors_list.length; i++) {
    let executor = global_executors_list[i];
    console.log(
      `Ім'я виконавця: ${executor.name}, вік виконавця: ${executor.age}`
    );
  }

  return global_executors_list;
};
