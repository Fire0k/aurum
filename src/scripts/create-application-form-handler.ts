import IMask from 'imask';


export function createApplicationFormHandler() {
    const phoneMask = IMask(
        document.getElementById('application-form-tel')!,
        {
            mask: '+{7} (000) 000-00-00',
            lazy: false,
            placeholderChar: '_'
        }
    )

    const form = document.getElementById('request-form') as HTMLFormElement;
    const summitElement = form.querySelector('[type="submit"]') as HTMLInputElement;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        if (!formData.get('name') || !formData.get('phone') || !phoneMask.masked.isComplete) {
            alert('Пожалуйста, заполните все поля')
            return;
        }

        formData.set('phone', phoneMask.unmaskedValue);

        summitElement.disabled = true;

        try {
            const response = await fetch('/local/ajax/form.php', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error()
            }

            const result = await response.json()

            if (result.success) {
                alert('Заявка успешно отправлена!')
                form.reset();
            } else {
                alert(result.message || 'Ошибка. Пожалуйста, повторите попытку позже')
            }

            summitElement.disabled = false;
        } catch {
            alert('Ошибка. Пожалуйста, повторите попытку позже');
            summitElement.disabled = false;
        }
    })
}