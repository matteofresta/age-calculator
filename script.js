document.addEventListener('DOMContentLoaded', () => {
    const arrow = document.querySelector('.arrow-section img');

    arrow.addEventListener('click', () => {
        const dayInput = document.getElementById('days');
        const monthInput = document.getElementById('month');
        const yearInput = document.getElementById('year');

        const dayTitle = document.getElementById('day-title');
        const monthTitle = document.getElementById('month-title');
        const yearTitle = document.getElementById('year-title');

        const dayValue = dayInput.value;
        const monthValue = monthInput.value;
        const yearValue = yearInput.value;

        clearErrors();

        let isValid = true;

        if (!isValidDay(dayValue)) {
            showError(dayInput, 'Must be a valid day');
            dayTitle.style.color = 'red';
            isValid = false;
        }

        if (!isValidMonth(monthValue)) {
            showError(monthInput, 'Must be a valid month');
            monthTitle.style.color = 'red';
            isValid = false;
        }

        if (!isValidYear(yearValue)) {
            showError(yearInput, 'Must be in the past');
            yearTitle.style.color = 'red';
            isValid = false;
        }

        if (isValid) {
            const inputDate = new Date(`${yearValue}-${monthValue}-${dayValue}`);
            const currentDate = new Date();

            if (inputDate > currentDate || isNaN(inputDate)) {
                showError(dayInput, 'Invalid date');
                showError(monthInput, 'Invalid date');
                showError(yearInput, 'Invalid date');
            } else {
                const diff = currentDate - inputDate;
                const diffDate = new Date(diff);

                const years = diffDate.getUTCFullYear() - 1970;
                const months = diffDate.getUTCMonth();
                const days = diffDate.getUTCDate() - 1;

                document.getElementById('years').innerText = years;
                document.getElementById('months').innerText = months;
                document.getElementById('days-output').innerText = days;
            }
        }
    });

    function isValidDay(day) {
        return day >= 1 && day <= 31;
    }

    function isValidMonth(month) {
        return month >= 1 && month <= 12;
    }

    function isValidYear(year) {
        const currentYear = new Date().getFullYear();
        return year >= 1900 && year <= currentYear;
    }

    function showError(input, message) {
        input.style.borderColor = 'red';
        const errorSpan = document.createElement('span');
        errorSpan.style.color = 'red';
        errorSpan.style.fontSize = '1rem';
        errorSpan.className = 'error-message';
        errorSpan.innerText = message;
        input.parentNode.appendChild(errorSpan);
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());

        const inputs = document.querySelectorAll('.input-section input');
        inputs.forEach(input => {
            input.style.borderColor = '';
            input.previousElementSibling.style.color = '';  // Reset title color
        });
    }
});
