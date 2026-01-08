class CodeCopier extends HTMLElement {
    constructor() {
        super();

        this.copyButton = this.querySelector('[data-js-btn]');
        this.copyText = this.querySelector('[data-js-code]');

        this.successMessage = this.copyButton.getAttribute('data-success') || 'Copied!';
        this.defaultMessage = this.copyButton.getAttribute('data-default') || 'Copy';

        this.copyButton.innerHTML = this.defaultMessage;

        this.copyButton.addEventListener('click', this.copyCode.bind(this));
    }

    copyCode(event) {
        event.preventDefault();
        this.copyText.select();
        this.copyText.setSelectionRange(0, 99999);

        navigator.clipboard.writeText(this.copyText.value)
            .then(() => {
                this.showTooltip(this.successMessage);
            })
            .catch(() => {
                this.showTooltip(this.successMessage);
            });
    }

    showTooltip(message) {
        this.copyButton.innerHTML = message;
        setTimeout(() => {
            this.copyButton.innerHTML = this.defaultMessage;
        }, 2000);
    }
}

customElements.define('code-copier', CodeCopier);
