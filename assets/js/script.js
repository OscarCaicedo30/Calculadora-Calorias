const form = document.getElementById('form');

form.addEventListener('submit', handleSubmit);

function handleSubmit (event) {
  event.preventDefault();

  const name = getInputTextValue('name');
  const doctyp =  getSelectedValue('document_type');
  const numdoc = getInputNumberValue('number_document');
  const gender = getSelectedValue('genero');
  const age = getInputNumberValue('edad');
  const weight = getInputNumberValue('peso');
  const height = getInputNumberValue('altura');
  const activityLevel = getSelectedValue('activity_level');

  // validar que los campos tengan valor
  if (!name || !doctyp || !numdoc || !gender || !age || !weight || !height || !activityLevel) {
    alert('Por favor complete todos los campos');
    return;
  }

  const tmb = Math.round(
    gender === 'female'
    ? (655 + (9.6 * weight) + (1.8 * height) - (4.7 *age)) //if 
    : (66 + (13.7 * weight) + (5 * height) - (6.8 *age)) //else
  );

  const maintenance = Math.round(tmb * Number(activityLevel));
  const loseWeight = maintenance - 450;
  const gainWeight = maintenance + 450;

  // mensaje con la información del paciente y sus necesidades calóricas, su grupo de edad y el peso que tiene que perder y ganar
  let message = `
    El paciente ${name} identificado con ${doctyp} Número: ${numdoc}, requiere un total de ${maintenance} Calorias para el sostenimiento de su TBM. 
  `;

  if (age >= 15 && age <= 29) {
    message += `Según su edad, pertenece al grupo poblacional de jóvenes.`;
  } else if (age >= 30 && age <= 59) {
    message += `Según su edad, pertenece al grupo poblacional de adultos.`;
  } else {
    message += `Según su edad, pertenece al grupo poblacional de <strong>adultos mayores.`;
  }

  message += `
    Si desea perder peso, debe consumir en promedio ${loseWeight} calorías diarias.
    Si desea ganar peso, debe consumir en promedio ${gainWeight} calorías diarias.
  `;

  const result = document.getElementById('result');

  result.textContent = message;
}

function getSelectedValue(id) {
  const select = document.getElementById(id);

  return select.options[select.selectedIndex].value;
}

function getInputNumberValue(id) {
  return Number(document.getElementById(id).value);
}

function getInputTextValue(id) {
  return document.getElementById(id).value;
}
