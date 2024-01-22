function submitForm() {
    // Get form values
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var age = document.getElementById("age").value;
    var assignments = document.getElementById("assignments").value;
    var grades = document.getElementById("grades").value;

    // Display the result
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        <p>Nombre: ${firstName}</p>
        <p>Apellido: ${lastName}</p>
        <p>Edad: ${age}</p>
        <p>Materias: ${assignments}</p>
        <p>Calificaciones: ${grades}</p>
    `;
}
