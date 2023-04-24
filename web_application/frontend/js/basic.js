// Необхідні змінні
let search = "";
let divider = `<li><hr class="dropdown-divider"></li>`;

// Створення нового елемента
async function create_element() {

   let target = location.pathname.substring(1);
   target = target.substring(0, target.length - 1);

   switch (target) {

      case "project":  $("#project_title").text("Додавання нового проєкту");
                       $("#project_yes").text("Додати");
                       prepare_customers_for_dropdown();
                       prepare_executors_for_dropdown();
                       break;
      case "customer": $("#customer_title").text("Додавання нового замовника");
                       $("#customer_yes").text("Додати");
                       break;
      case "executor": $("#executor_title").text("Додавання нового виконавця");
                       $("#executor_yes").text("Додати");
                       break;

   }

   $(`#${target}_yes`).attr("onclick", `modal_update_${target}s(true)`);
   $(`#modal_${target}s`).modal('show');

}

// ...............................................................................................

// Редагування існуючого елемента
async function edit_element (element) {

   let item;
   let target = location.pathname.substring(1);
   target = target.substring(0, target.length - 1);

   let id = parseInt($(element).closest("tr").children().first().text());

   $(`#${target}_title`).text("Редагування даних");
   $(`#${target}_yes`).text("Оновити дані");

   switch (target) {

      case "project":  item = get_project_by_id(id);
                       $("#project_name").val(item.name);
                       $("#project_address").val(item.address);
                       prepare_customers_for_dropdown();
                       prepare_executors_for_dropdown();
                       break;
      case "customer": item = get_customer_by_id(id);
                       $("#customer_budget").val(item.budget);
                       $("#customer_name").val(item.name);
                       break;
      case "executor": item = get_executor_by_id(id);
                       $("#executor_employee_count").val(item.employee_count);
                       $("#executor_name").val(item.name);
                       $("#executor_experience").val(item.experience);
                       break;

   }

   $(`#${target}_yes`).attr("onclick", `modal_update_${target}s(false, ${id})`);
   $(`#modal_${target}s`).modal('show');

}

// ...............................................................................................

// Пошук існуючого елемента
function find_element (element) {

   let search = $(element).val();
   let target = location.pathname.substring(1);
   let search_list = [];

   switch (target) {

      case "projects":  search_list = find_projects(search);  break;
      case "customers": search_list = find_customers(search); break;
      case "executors": search_list = find_executors(search); break;

   }

   display_data(search_list);

}

// ...............................................................................................

// Видалення існуючого елемента
function delete_element (item) {

   let button;
   let message;
   let target = location.pathname.substring(1);
   let id = parseInt($(item).closest("tr").children().first().text());

   switch (target) {

      case "projects":
         message = "Ви дійсно хочете видалити цей проєкт";
         button = "Видалити";
         break;

      case "customers":
         message = "Ви дійсно хочете видалити цього замовника";
         button = "Видалити";
         break;

      case "executors":
         message = "Ви дійсно хочете видалити цього виконавця";
         button = "видалити";
         break;

   }
   
   modal_confirm_create("Повідомлення",
                        `${message}?`,
                        `${button}`,
                        "Відміна",
                        "delete", id);

   $(`#modal_confirm`).modal('show');

}

// ...............................................................................................

// Відобразити дані у таблиці
function display_data (search_list) {

   let data;
   let additional_attr = "";
   let target = location.pathname.substring(1);

   switch (target) {

      case "projects": data = get_projects_list();
                        break;
      case "customers": data = get_customers_list();
                        break;
      case "executors": data = get_executors_list();
                        break;
   }

   // Якщо поле пошуку не порожнє - відображаємо результат
   if (search_list) { data = search_list; }

   // Очищення таблиць
   clear_table(data.length === 0);

   // Відображення загальної кількості елементів
   $("#total_count").text(`Загальна кількість: ${data.length}`);

   // Відобразити дані конкретної таблиці
   eval(`display_${target}_data(${additional_attr}data)`);

}

// ...............................................................................................

// Відобразити дані про усі лікарні
function display_projects_data (data) {

   for (let element of data) {
   
      let block = 
     `<tr>
         <td> <span class="m-2">${element.id}</span> </td>
         <td>${element.name}</td>
         <td>${element.customer}</td>
         <td>${element.executor}</td>
         <td>${get_icon_code()}</td>
      </tr>`;

      $("#table").append(block);

   }
}

// Відобразити дані про усіх лікарів
async function display_customers_data (data) {

   for (let element of data) {
      
      let block =
     `<tr>
         <td> <span class="m-2">${element.id}</span> </td>
         <td>${element.name}</td>
         <td> <span class="m-2">${element.budget}</span> </td>
         <td>${await prepare_related_projects_of("customer", element.name)}</td>
         <td>${get_icon_code()}</td>
      </tr>`;

      $("#table").append(block);

   }
}

// Відобразити дані про усіх пацієнтів
async function display_executors_data (data) {

   for (let element of data) {
      
      let block =
     `<tr>
         <td> <span class="m-2">${element.id}</span> </td>
         <td>${element.name}</td>
         <td class="fit"> <span class="m-2">${element.employee_count}</span> </td>
         <td class="fit"> <span class="m-2">${element.experience}</span> </td>
         <td>${await prepare_related_projects_of("executor", element.name)}</td>
         <td>${get_icon_code()}</td>
      </tr>`;

      $("#table").append(block);

   }
}

// ...............................................................................................

// Вибрана позитивна відповідь у модальному вікні
function modal_confirm() {

   let page = location.pathname.substring(1);

   let target = $("#modal_confirm").attr("target");
   let src = $("#modal_confirm").attr("src");

   switch (target) {

      // Видалення даних
      case "delete":
         let id = parseInt(src);
         page = page.substr(0, page.length - 1);
         eval(`remove_${page}(${id})`);
         display_data();
         save_data();
         break;

   }
}

// Задання елементів модального вікна підтвердження
function modal_confirm_create (title, message, yes, no, target, src) {

   $(`#modal_confirm_title`).text(title);
   $(`#modal_confirm_message`).text(message);
   $(`#modal_confirm_yes`).text(yes);
   $(`#modal_confirm_no`).text(no);
   $("#modal_confirm").attr("target", target);
   $("#modal_confirm").attr("src", src);

}

// ...............................................................................................

// Додавання нової лікарні або редагування існуючої
function modal_update_projects (added_new, id) {

   let name     = $("#project_name").val();
   let customer = $("#project_customer").text();
   let executor = $("#project_executor").text();

   customer = customer === "Виберіть замовника" ? "Не встановлено" : customer;
   executor = executor === "Виберіть виконавця" ? "Не встановлено" : executor;

   if (added_new) { add_project(name, customer, executor);      }
   else           { edit_project(id, name, customer, executor); }

   display_data();
   clear_input();
   save_data();

}

// Додавання нового замовника або редагування існуючого
function modal_update_customers (added_new, id) {

   let name    = $("#customer_name").val();
   let budget  = $("#customer_budget").val();

   if (added_new) { add_customer(name, budget);      }
   else           { edit_customer(id, name, budget); }

   display_data();
   clear_input();
   save_data();

}

// Додавання нового пацієнта або редагування існуючого
function modal_update_executors (added_new, id) {

   let name           = $("#executor_name").val();
   let employee_count = $("#executor_employee_count").val();
   let experience     = $("#executor_experience").val();

   if (added_new) { add_executor(name, employee_count, experience);      }
   else           { edit_executor(id, name, employee_count, experience); }

   display_data();
   clear_input();
   save_data();

}

// ...............................................................................................

// Вибір лікарні у випадаючому списку
function set_executor (element) {

   let executor = $(element).text();

   executor = executor === ". . ." ? "Виберіть виконавця" : executor;

   $("#project_executor").text(executor);

}

// Вибір лікаря у випадаючому списку
function set_customer (element) {

   let customer = $(element).text();

   customer = customer === ". . ." ? "Виберіть замовника" : customer;

   $("#project_customer").text(customer);

}

// ...............................................................................................

// Підготовуємо список доступних лікарень у випадаючому меню
function prepare_executors_for_dropdown() {

   let list = $("#project_executors_list");

   // Отримуємо інформацію про усіх лікарів
   get_data("executors").then((result) => {

      if (result.length != 0) {
         
         list.find("li:not(:first)").remove();
         list.append(divider);

         for (let item of result) {

               list.append(`<li><span class="dropdown-item" ` +
                           `onclick="set_executor(this)">${item.name}</span></li>`);
         }
      }

   });
}

// Підготовуємо список доступних лікарів у випадаючому меню
function prepare_customers_for_dropdown() {

   let list = $("#project_customers_list");

   // Отримуємо інформацію про усіх лікарів
   get_data("customers").then((result) => {

      if (result.length != 0) {
         
         list.find("li:not(:first)").remove();
         list.append(divider);

         for (let item of result) {

               list.append(`<li><span class="dropdown-item" ` +
                           `onclick="set_customer(this)">${item.name}</span></li>`);
         }
      }

   });
}

async function prepare_related_projects_of(target, name) {

   let list = "";

   // Отримуємо інформацію про усіх лікарів
   await get_data("projects").then((result) => {
      
      if (result !== null && result.length !== 0) {
         
         for (let item of result) {
            
            if (item[target] === name) {
               
               list += `<li style="margin-left: 10px">${item.name}</li>`;
            }
         }
      }

   });

   return list;
}

// ...............................................................................................

// Видалення усіх даних з таблиці 
// Додавання інформаційного повідомлення, якщо таблиця пуста
function clear_table (table_is_empty) {

   let target = location.pathname.substring(1);
   let span = (target === "projects") ? 5 :
              (target === "customers") ? 5 : 6;

   $("#table tbody").empty();

   let block =
  `<tr class="text-center text-secondary" id="table_empty">
      <td colspan="${span}"> <span class="mx-5 fs-4">Немає даних для відображення</span> </td>
   </tr>`;

   if (table_is_empty) { $("#table tbody").append(block); }
   else                { $("#table_empty").remove();      }

}

// Очищення полів вводу
function clear_input() {

   let target = location.pathname.substring(1);

   switch (target) {
      
      case "projects":  $("#project_name").val("");
                        $("#project_customer").text("Виберіть замовника");
                        $("#project_executor").text("Виберіть виконавця");
                        break;
      case "customers": $("#customer_name").val("");
                        $("#customer_budget").val("");
                        break;
      case "executors": $("#executor_name").val("");
                        $("#executor_employee_count").val("");
                        $("#executor_experience").val("");
                        break;
   }
}

// ...............................................................................................

// Метод повертає html код елементів керування таблицею
function get_icon_code (only_delete) {

   // Іконка редагування елемента
   const icon_edit = 
  `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" class="bi bi-pencil-square btn-control mx-1" viewBox="0 0 16 16" onclick="edit_element(this)">
     <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
     <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
   </svg>`;

   // Іконка видалення елемента
   const icon_delete = 
  `<svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" fill="currentColor" class="bi bi-trash btn-control mx-1" viewBox="0 0 16 16" onclick="delete_element(this)">
     <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
     <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
   </svg>`;

   // Блок з іконками
   const icons =
  `<span class="d-flex mx-2">
      ${!only_delete ? icon_edit : ""}${icon_delete}
   </span>`;

   return icons;

}

// ...............................................................................................

// Метод дозволяє реалізувати затримку
function delay (time) {
   return new Promise((resolve, reject) => {
      setTimeout(() => {
         resolve();
      }, time);
   });
}

// ...............................................................................................

// Очищення даних після закриття модальних вікон
$(document).on("hidden.bs.modal", () => { clear_input(); });

// Виконання коду після завантаження сторінки
jQuery(async () => {

   await load_data();
   display_data();

});