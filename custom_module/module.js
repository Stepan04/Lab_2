const customer = require("./Customer");
const executor = require("./Executor");
const project  = require("./Project");

exports.find_Customer      = customer.find_Customer;
exports.add_Customer       = customer.add_Customer;
exports.remove_Customer    = customer.remove_Customer;
exports.edit_Customer      = customer.edit_Customer;
exports.get_Customers_List = customer.get_Customers_List;

exports.find_Executor      = executor.find_Executor;
exports.add_Executor       = executor.add_Executor;
exports.remove_Executor    = executor.remove_Executor;
exports.edit_Executor      = executor.edit_Executor;
exports.get_Executors_List = executor.get_Executors_List;

exports.find_Project       = project.find_Project;
exports.add_Project        = project.add_Project;
exports.remove_Project     = project.remove_Project;
exports.edit_Project       = project.edit_Project;
exports.get_Projects_List  = project.get_Projects_List;
exports.get_User_Projects_List  = project.get_User_Projects_List;
