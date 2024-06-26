// document.addEventListener('DOMContentLoaded', () => {
//     const passwordDisplay = document.getElementById('password');
//     const lengthSlider = document.getElementById('length');
//     const lengthValue = document.getElementById('length-value');
//     const copyButton = document.getElementById('copy-btn');
//     const generateButton = document.getElementById('generate-btn');
//     const strengthText = document.getElementById('strength-text');
//     const strengthIndicator = document.getElementById('strength-indicator');
//     const checkboxes = document.querySelectorAll('input[type="checkbox"]');

//     const charset = {
//         uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
//         lowercase: 'abcdefghijklmnopqrstuvwxyz',
//         numbers: '0123456789',
//         symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
//     };

//     lengthSlider.addEventListener('input', () => {
//         lengthValue.textContent = lengthSlider.value;
//         updateSliderBackground(lengthSlider);
//     });

//     copyButton.addEventListener('click', () => {
//         passwordDisplay.select();
//         document.execCommand('copy');
//         alert('Password copied to clipboard!');
//     });

//     generateButton.addEventListener('click', () => {
//         const length = parseInt(lengthSlider.value);
//         const selectedCharsets = Array.from(checkboxes)
//             .filter(checkbox => checkbox.checked)
//             .map(checkbox => charset[checkbox.id]);

//         if (selectedCharsets.length === 0) {
//             alert('Please select at least one character type.');
//             return;
//         }

//         const allChars = selectedCharsets.join('');
//         let password = '';
//         for (let i = 0; i < length; i++) {
//             password += allChars.charAt(Math.floor(Math.random() * allChars.length));
//         }

//         passwordDisplay.value = password;
//         updateStrengthIndicator(password);
//     });

//     function updateStrengthIndicator(password) {
//         let strength = 0;
//         if (password.length >= 8) strength++;
//         if (/[A-Z]/.test(password)) strength++;
//         if (/[a-z]/.test(password)) strength++;
//         if (/[0-9]/.test(password)) strength++;
//         if (/[\W]/.test(password)) strength++;

//         const indicators = strengthIndicator.querySelectorAll('span');
//         indicators.forEach((span, index) => {
//             if (index < strength) {
//                 if (strength < 2 && strength < 4) {
//                     span.style.backgroundColor = '#F64A4A'; // Red color for weak passwords
//                 } else if (strength < 6) {
//                     span.style.backgroundColor = '#F8CD65'; // Yellow color for medium passwords
//                 } else {
//                     span.style.backgroundColor = '#00cc66'; // Green color for strong passwords
//                 }
//             } else {
//                 span.style.backgroundColor = '#444';
//             }
//         });

//         const strengthLabels = ['TOO WEAK!', 'WEAK', 'MEDIUM', 'STRONG', 'VERY STRONG'];
//         strengthText.textContent = strengthLabels[strength - 1] || 'TOO WEAK!';
//     }

//     function updateSliderBackground(slider) {
//         const percentage = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
//         slider.style.background = `linear-gradient(to right, #A4FFAF ${percentage}%, #18171F ${percentage}%)`;
//     }

//     // Initialize the slider background size on page load
//     updateSliderBackground(lengthSlider);
// });

document.addEventListener('DOMContentLoaded', () => {
    const passwordDisplay = document.getElementById('password');
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('length-value');
    const copyButton = document.getElementById('copy-btn');
    const copyMessage = document.getElementById('copy-message');
    const generateButton = document.getElementById('generate-btn');
    const strengthText = document.getElementById('strength-text');
    const strengthIndicator = document.getElementById('strength-indicator');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    const charset = {
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz',
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    };

    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
        updateSliderBackground(lengthSlider);
    });

    copyButton.addEventListener('click', () => {
        passwordDisplay.select();
        document.execCommand('copy');
        copyMessage.style.display = 'inline';
        setTimeout(() => {
            copyMessage.style.display = 'none';
        }, 2000);
    });

    generateButton.addEventListener('click', () => {
        const length = parseInt(lengthSlider.value);
        const selectedCharsets = Array.from(checkboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => charset[checkbox.id]);

        if (selectedCharsets.length === 0) {
            alert('Please select at least one character type.');
            return;
        }

        const allChars = selectedCharsets.join('');
        let password = '';
        for (let i = 0; i < length; i++) {
            password += allChars.charAt(Math.floor(Math.random() * allChars.length));
        }

        passwordDisplay.value = password;
        updateStrengthIndicator(password, selectedCharsets.length);
    });

    function updateStrengthIndicator(password, charsetsLength) {
        const length = password.length;
        let strength = 0;

        if (length >= 8 && charsetsLength >= 4) {
            strength = 5; // VERY STRONG
        } else if (length >= 8 || (length >= 6 && charsetsLength >= 3)) {
            strength = 4; // STRONG
        } else if (length >= 6 || (length >= 4 && charsetsLength >= 2)) {
            strength = 3; // MEDIUM
        } else if (length >= 4 || (length >= 2 && charsetsLength >= 1)) {
            strength = 2; // WEAK
        } else {
            strength = 1; // TOO WEAK
        }

        const indicators = strengthIndicator.querySelectorAll('span');
        indicators.forEach((span, index) => {
            if (index < strength) {
                if (strength === 1) {
                    span.style.backgroundColor = '#F64A4A'; // Red color for "TOO WEAK"
                } else if (strength === 2) {
                    span.style.backgroundColor = '#F64A4A'; // Red color for "WEAK"
                } else if (strength === 3) {
                    span.style.backgroundColor = '#F8CD65'; // Yellow color for "MEDIUM"
                } else if (strength >= 4) {
                    span.style.backgroundColor = '#00cc66'; // Green color for "STRONG" or "VERY STRONG"
                }
            } else {
                span.style.backgroundColor = '#444';
            }
        });

        const strengthLabels = ['TOO WEAK!', 'WEAK', 'MEDIUM', 'STRONG', 'VERY STRONG'];
        strengthText.textContent = strengthLabels[strength - 1] || 'TOO WEAK!';
    }

    function updateSliderBackground(slider) {
        const percentage = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.background = `linear-gradient(to right, #A4FFAF ${percentage}%, #18171F ${percentage}%)`;
    }

    // Initialize the slider background size on page load
    updateSliderBackground(lengthSlider);
});
