import { bootstrap } from './scripts/setup';
import { createPageState } from './scripts/create-page-state';


bootstrap();

window.addEventListener('load', async () => {
    await document.fonts.ready;

    requestAnimationFrame(() => {
        createPageState();
    })
})

