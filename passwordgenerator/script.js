"use strict";
document.addEventListener('DOMContentLoaded', () => {
    class PasswordGenerator {
        constructor() {
            this.passwordDisplay = document.getElementById('password');
            this.lengthSlider = document.getElementById('length');
            this.lengthValue = document.getElementById('length-value');
            this.copyButton = document.getElementById('copy-btn');
            this.copyMessage = document.getElementById('copy-message');
            this.generateButton = document.getElementById('generate-btn');
            this.strengthText = document.getElementById('strength-text');
            this.strengthIndicator = document.getElementById('strength-indicator');
            this.checkboxes = document.querySelectorAll('input[type="checkbox"]');

            this.charset = {
                uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
                lowercase: 'abcdefghijklmnopqrstuvwxyz',
                numbers: '0123456789',
                symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
            };

            this.addEventListeners();
            this.updateSliderBackground(this.lengthSlider);
        }

        addEventListeners() {
            this.lengthSlider.addEventListener('input', () => {
                this.lengthValue.textContent = this.lengthSlider.value;
                this.updateSliderBackground(this.lengthSlider);
            });

            this.copyButton.addEventListener('click', () => {
                this.passwordDisplay.select();
                document.execCommand('copy');
                this.copyMessage.style.display = 'inline';
                setTimeout(() => {
                    this.copyMessage.style.display = 'none';
                }, 2000);
            });

            this.generateButton.addEventListener('click', () => {
                const length = parseInt(this.lengthSlider.value);
                const selectedCharsets = Array.from(this.checkboxes)
                    .filter(checkbox => checkbox.checked)
                    .map(checkbox => this.charset[checkbox.id]);

                if (selectedCharsets.length === 0) {
                    alert('Please select at least one character type.');
                    return;
                }

                const allChars = selectedCharsets.join('');
                let password = '';
                for (let i = 0; i < length; i++) {
                    password += allChars.charAt(Math.floor(Math.random() * allChars.length));
                }

                this.passwordDisplay.value = password;
                this.updateStrengthIndicator(password, selectedCharsets.length);
            });
        }

        updateStrengthIndicator(password, charsetsLength) {
            const length = password.length;
            let strength = 0;

            if (length >= 8 && charsetsLength >= 4) {
                strength = 5; 
            } else if (length >= 8 || (length >= 6 && charsetsLength >= 3)) {
                strength = 4; 
            } else if (length >= 6 || (length >= 4 && charsetsLength >= 2)) {
                strength = 3; 
            } else if (length >= 4 || (length >= 2 && charsetsLength >= 1)) {
                strength = 2; 
            } else {
                strength = 1; 
            }

            const indicators = this.strengthIndicator.querySelectorAll('span');
            indicators.forEach((span, index) => {
                if (index < strength) {
                    if (strength === 1) {
                        span.style.backgroundColor = '#F64A4A'; 
                    } else if (strength === 2) {
                        span.style.backgroundColor = '#F64A4A'; 
                    } else if (strength === 3) {
                        span.style.backgroundColor = '#F8CD65'; 
                    } else if (strength >= 4) {
                        span.style.backgroundColor = '#00cc66'; 
                    }
                } else {
                    span.style.backgroundColor = '#444';
                }
            });

            const strengthLabels = ['TOO WEAK', 'WEAK', 'MEDIUM', 'STRONG', 'VERY STRONG'];
            this.strengthText.textContent = strengthLabels[strength - 1] || 'TOO WEAK';
        }

        updateSliderBackground(slider) {
            const percentage = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
            slider.style.background = `linear-gradient(to right, #A4FFAF ${percentage}%, #18171F ${percentage}%)`;
        }
    }

    new PasswordGenerator();
});
