import tippy from 'tippy.js';
import alpine from 'alpinejs';
import hljs from 'highlight.js/lib/core';
import php from 'highlight.js/lib/languages/php';

alpine.start();

hljs.registerLanguage('php', php);

function wrapLine(content, number, language) {
    return `<button type="button" class="rounded-full bg-white shadow p-1 border flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-amber-700"><path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" /></svg></button><span>${content}</span>`;
}

hljs.addPlugin({
    'after:highlight': (result) => {
        console.log(result)
        result.value = result.value
            .split(/\r?\n/)
            .map((content, index) => wrapLine(content, index + 1, result.language))
            .join('\n');
    }
});

window.hljs = hljs;

hljs.highlightElement(document.querySelector('.default-highlightable-code'));

document.querySelectorAll('.highlightable-code').forEach((block) => {
    if (block.dataset.highlighted !== 'yes') {
        hljs.highlightElement(block);
    }
});

tippy('[data-tippy-content]', {
    trigger: 'click',
    arrow: true,
    theme: 'material',
    animation: 'scale',
});
