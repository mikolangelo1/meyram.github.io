document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const togglePasswordButton = document.querySelector('.toggle-password');

    // Регулярные выражения для валидации
    const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
    const forbiddenChars = /[!@#$%^&*()+={}\[\]|\\:;"'<>,.?/~`]/;
    const consecutiveSymbols = /(.)\1{2,}/;
    const commonWords = ['admin', 'root', 'user', 'test'];

    // Переключение видимости пароля
    togglePasswordButton.addEventListener('click', function () {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        this.classList.toggle('active');
    });

    // Валидация имени пользователя
    usernameInput.addEventListener('input', function () {
        validateUsername();
    });

    // Валидация пароля
    passwordInput.addEventListener('input', function () {
        validatePassword();
    });

    function validateUsername() {
        const username = usernameInput.value.trim();
        let error = '';

        if (username.length === 0) {
            error = 'Введите имя пользователя';
        } else if (username.length < 3) {
            error = 'Имя пользователя должно содержать минимум 3 символа';
        } else if (username.length > 16) {
            error = 'Имя пользователя не должно превышать 16 символов';
        } else if (!usernameRegex.test(username)) {
            error = 'Имя пользователя может содержать только буквы, цифры, дефис и подчеркивание';
        } else if (forbiddenChars.test(username)) {
            error = 'Имя содержит недопустимые символы';
        } else if (consecutiveSymbols.test(username)) {
            error = 'Слишком много повторяющихся символов';
        } else if (commonWords.includes(username.toLowerCase())) {
            error = 'Это имя пользователя недоступно';
        }

        usernameError.textContent = error;
        usernameInput.classList.toggle('error', error !== '');
        return error === '';
    }

    function validatePassword() {
        const password = passwordInput.value;
        let error = '';

        if (password.length === 0) {
            error = 'Введите пароль';
        } else if (password.length < 8) {
            error = 'Пароль должен содержать минимум 8 символов';
        } else if (!/[A-Z]/.test(password)) {
            error = 'Пароль должен содержать хотя бы одну заглавную букву';
        } else if (!/[a-z]/.test(password)) {
            error = 'Пароль должен содержать хотя бы одну строчную букву';
        } else if (!/[0-9]/.test(password)) {
            error = 'Пароль должен содержать хотя бы одну цифру';
        } else if (!/[!@#$%^&*]/.test(password)) {
            error = 'Пароль должен содержать хотя бы один специальный символ (!@#$%^&*)';
        } else if (/(.)\1{2,}/.test(password)) {
            error = 'Пароль содержит слишком много повторяющихся символов';
        }

        passwordError.textContent = error;
        passwordInput.classList.toggle('error', error !== '');
        return error === '';
    }

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const isUsernameValid = validateUsername();
        const isPasswordValid = validatePassword();

        if (!isUsernameValid || !isPasswordValid) {
            const invalidInput = !isUsernameValid ? usernameInput : passwordInput;
            invalidInput.classList.add('shake');
            setTimeout(() => invalidInput.classList.remove('shake'), 500);
            return;
        }

        // Если валидация прошла успешно
        console.log('Форма отправлена', {
            username: usernameInput.value,
            password: passwordInput.value,
            remember: document.getElementById('remember').checked
        });

        // Здесь будет отправка на сервер
        alert('Форма успешно отправлена!');
    });
});