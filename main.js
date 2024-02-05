// TODO: Add your import statements here.
// import { getRoles, getCompanies} from "./modules/salaryData.js";
// import { getAverageSalaryByRole, getAverageSalaryByCompany, getSalaryAtCompany, getIndustryAverageSalary } from "./modules/workAroundModule.js";
// import { formatNumber } from "./modules/utilities.js";

// PROJECT EDIT--- Adding js directly from salaryData.js, workAroundModule.js, and utilities.js 
// Import/export not working running on local drive, will comment out import code 



//salaryData.js below 

const salaryData = [
  { role: 'CTO', company: 'Big Data Inc.', salary: 320000},
  { role: 'Technical Lead', company: 'Big Data Inc.', salary: 230000},
  { role: 'Software Engineer II', company: 'Big Data Inc.', salary: 180000},
  { role: 'Software Engineer I', company: 'Big Data Inc.', salary: 140000},
  { role: 'CTO', company: 'Medium Data Inc.', salary: 215000},
  { role: 'Technical Lead', company: 'Medium Data Inc.', salary: 165000},
  { role: 'Software Engineer II', company: 'Medium Data Inc.', salary: 140000},
  { role: 'Software Engineer I', company: 'Medium Data Inc.', salary: 115000},
  { role: 'CTO', company: 'Small Data Inc.', salary: 175000},
  { role: 'Technical Lead', company: 'Small Data Inc.', salary: 135000},
  { role: 'Software Engineer II', company: 'Small Data Inc.', salary: 115000},
  { role: 'Software Engineer I', company: 'Small Data Inc.', salary: 95000},
];

const getRoles = () => {
  return ['CTO', 'Technical Lead', 'Software Engineer II', 'Software Engineer I'];
}

const getCompanies = () => {
  return ['Big Data Inc.', 'Medium Data Inc.', 'Small Data Inc.'];
}

  const getDataByRole = role => {
    return salaryData.filter(obj => obj.role === role);
  }
  
  const getDataByCompany = company => {
    return salaryData.filter(obj => obj.company === company);
  }



  //workAroundModule.js below 


const getAverageSalaryByRole = role => {
  const roleData = getDataByRole(role);
  const salariesOfRole = roleData.map(obj => obj.salary);
  return calculateAverage(salariesOfRole);
}

const getAverageSalaryByCompany = company => {
  const companyData = getDataByCompany(company);
  const salariesAtCompany = companyData.map(obj => obj.salary);
  return calculateAverage(salariesAtCompany);
}

const getSalaryAtCompany = (role, company) => {
  const companyData = getDataByCompany(company);
  const roleAtCompany = companyData.find(obj => obj.role === role);
  return roleAtCompany.salary;
}

const getIndustryAverageSalary = () => {
  const allSalaries = salaryData.map(obj => obj.salary);
  return calculateAverage(allSalaries);
}

function calculateAverage(arrayOfNumbers) {
  let total = 0;
  arrayOfNumbers.forEach(number => total += number);
  return (total / arrayOfNumbers.length).toFixed(2);
}


  //utilities.js below 


const formatNumber = number => {
  const formattedNumber = number.toString().split('');
  
for (let i = formattedNumber.length - 3; i > 0; i -= 3) {
  if(formattedNumber[i] !== '.') {
    formattedNumber.splice(i, 0, ',');
    }
  }
  
return formattedNumber.join('');
}

// export { formatNumber };

// TODO: Get the companies and roles using the salaryData module.
const companies = getCompanies();
const roles = getRoles();

// Create input buttons for every company and role represented in the data.
renderInputButtons(companies, 'company');
renderInputButtons(roles, 'role');

// This function will create a new <section> with radio
// inputs based on the data provided in the labels array.
function renderInputButtons(labels, groupName) {
  const container = document.createElement('section');
  container.setAttribute('id', `${groupName}Inputs`);

  let header = document.createElement('h3');
  header.innerText = `Select a ${groupName}`;
  container.appendChild(header);

  labels.forEach(label => { // For each label...
    // Create the radio input element.
    let divElement = document.createElement('div');
    divElement.setAttribute('class', 'option');

    let inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'radio');
    inputElement.setAttribute('name', groupName);
    inputElement.setAttribute('value', label);
    divElement.appendChild(inputElement);

    // Create a label for that radio input element.
    let labelElement = document.createElement('label');
    labelElement.setAttribute('for', label);
    labelElement.innerText = label;
    divElement.appendChild(labelElement);

    // Update the results when the input is selected.
    inputElement.addEventListener('click', updateResults);

    container.appendChild(divElement);
  });

  document.querySelector('main').prepend(container);
}

function updateResults(){
  // Get the current selected company and role from the radio button inputs.
  const company = document.querySelector("input[name='company']:checked").value;
  const role = document.querySelector("input[name='role']:checked").value;

  // If either the company or role is unselected, return.
  if (!company || !role) { return; }

  // TODO: Use the workAroundModule functions to calculate the needed data.
  const averageSalaryByRole = formatNumber(getAverageSalaryByRole(role));
  const averageSalaryByCompany = formatNumber(getAverageSalaryByCompany(company));
  const salary = formatNumber (getSalaryAtCompany(role, company));
  const industryAverageSalary = formatNumber (getIndustryAverageSalary());

  // Render them to the screen.
  document.getElementById('salarySelected').innerText = `The salary for ${role}s at ${company} is \$${salary}`;
  document.getElementById('salaryAverageByRole').innerText = `The industry average salary for ${role} positions is \$${averageSalaryByRole}`;
  document.getElementById('salaryAverageByCompany').innerText = `The average salary at ${company} is \$${averageSalaryByCompany}`;
  document.getElementById('salaryAverageIndustry').innerText = `The average salary in the Tech industry is \$${industryAverageSalary}`;
}