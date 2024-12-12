document.addEventListener('DOMContentLoaded', function() {
    const groupSelect = document.getElementById('group-select');
    const scheduleTable = document.getElementById('schedule-table');
    const sybbota = document.getElementById("sybbota");
    const editScheduleButton = document.getElementById('edit-schedule');
    const editForm = document.getElementById('edit-form');
    const daySelect = document.getElementById('day');
    const timeSelect = document.getElementById('time');
    const subjectInput = document.getElementById('subject');
    const scheduleForm = document.getElementById('schedule-form');

    // Function to update the schedule table based on the selected group
    function updateSchedule(group) {
        // Fetch the schedule data from the server
        fetch(`/schedule/${group}`)
            .then(response => response.json())
            .then(data => {
                // Update the table cells with the schedule data
                for (const [key, value] of Object.entries(data)) {
                    const cell = document.getElementById(key);
                    if (cell) {
                        cell.textContent = value;
                    }
                }
            })
            .catch(error => console.error('Error fetching schedule:', error));
    }

    // Event listener for group selection
    groupSelect.addEventListener('change', function() {
        const selectedGroup = groupSelect.value;
        updateSchedule(selectedGroup);
    });

    // Event listener for edit schedule button
    editScheduleButton.addEventListener('click', function() {
        editForm.style.display = 'block';
    });

    // Event listener for form submission
    scheduleForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const day = daySelect.value;
        const time = timeSelect.value;
        const subject = subjectInput.value;
        const cellId = `${day}-${time}`;
        const cell = document.getElementById(cellId);

        if (cell) {
            cell.textContent = subject;

            // Send the updated schedule to the server
            fetch('/schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    group: groupSelect.value,
                    day: day,
                    time: time,
                    subject: subject
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Schedule updated:', data);
            })
            .catch(error => console.error('Error updating schedule:', error));
        }

        editForm.style.display = 'none';
    });

    // Initial update of the schedule
    updateSchedule(groupSelect.value);
});
