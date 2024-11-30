const habitList = document.getElementById('habit-list');
const addHabitButton = document.getElementById('add-habit');

addHabitButton.addEventListener('click', () => {
    const habitName = document.getElementById('habit-name').value;
    const habitFrequency = document.getElementById('habit-frequency').value;
    const habitDate = document.getElementById('habit-date').value;

    if (!habitName || !habitDate) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    // Crear el elemento del hábito
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <strong>${habitName}</strong><br>
        Frecuencia: ${habitFrequency}<br>
        Inicio: ${habitDate}
    `;

    // Agregar enlace manual a Google Calendar
    const calendarLink = document.createElement('a');
    calendarLink.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(habitName)}&dates=${habitDate.replace(/-/g, '')}/${habitDate.replace(/-/g, '')}`;
    calendarLink.target = '_blank';
    calendarLink.textContent = 'Agregar a Google Calendar';
    calendarLink.style.display = 'block';
    calendarLink.style.marginTop = '10px';

    listItem.appendChild(calendarLink);
    habitList.appendChild(listItem);

    // Limpiar formulario
    document.getElementById('habit-form').reset();
});
