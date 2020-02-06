// https://clipboardjs.com
const buttons = document.querySelectorAll('.btn');
const clipboard = new ClipboardJS('.btn');

const clearTooltip = e => {
    e.currentTarget.setAttribute('class', 'btn btn-primary btn-block');
    e.currentTarget.removeAttribute('aria-label');
    e.currentTarget.innerHTML = 'Copy';
};

const showTooltip = (elem, msg) => {
    elem.setAttribute('class', 'btn btn-success btn-block tooltipped tooltipped-s');
    elem.setAttribute('aria-label', msg);
    elem.innerHTML = 'Success';
};

// Simplistic detection (do not use in production).
const fallbackMessage = action => {
    let actionMsg = '';
    const actionKey = (action === 'cut' ? 'X' : 'C');

    if(/iPhone|iPad/i.test(navigator.userAgent)) {
        actionMsg = 'No support :(';
    } else if (/Mac/i.test(navigator.userAgent)) {
        actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
    } else {
        actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
    }

    return actionMsg;
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mouseleave', clearTooltip);
    buttons[i].addEventListener('blur', clearTooltip);
}

clipboard.on('success', function(e) {
    e.clearSelection();
    showTooltip(e.trigger, 'Copied!');
});

clipboard.on('error', function(e) {
    showTooltip(e.trigger, fallbackMessage(e.action));
});
