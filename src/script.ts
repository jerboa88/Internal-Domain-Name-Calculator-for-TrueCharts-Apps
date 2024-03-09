document.addEventListener('DOMContentLoaded', () => {
	const notificationTimeout: number = 3000;
	const catalogAppNameInput: HTMLInputElement = getElementByIdOrThrow('catalogAppName') as HTMLInputElement;
	const customAppNameInput: HTMLInputElement = getElementByIdOrThrow('customAppName') as HTMLInputElement;
	const serviceNameInput: HTMLInputElement = getElementByIdOrThrow('serviceName') as HTMLInputElement;
	const portNumberInput: HTMLInputElement = getElementByIdOrThrow('portNumber') as HTMLInputElement;
	const output: HTMLElement = getElementByIdOrThrow('output');


	function getElementByIdOrThrow(id: string): HTMLElement {
		const element = document.getElementById(id);

		if (!element) {
			throw new Error(`Element with ID '${id}' not found in the DOM.`);
		}

		return element;
	}


	function buildDomainNamePrefix(catalogAppName: string, customAppName: string, serviceName: string | undefined): string {
		const customNameContainsCatalogName: boolean = customAppName.includes(catalogAppName);

		if (serviceName) {
			if (customNameContainsCatalogName) {
				return `${customAppName}-${serviceName}.ix-${customAppName}`;
			}

			return `${customAppName}-${catalogAppName}-${serviceName}.ix-${customAppName}`;
		} else {
			if (customNameContainsCatalogName) {
				return `${customAppName}.ix-${customAppName}`;
			}

			return `${customAppName}-${catalogAppName}.ix-${customAppName}`;
		}
	}


	function generateDomainName(): void {
		const catalogAppName: string = catalogAppNameInput.value.trim().toLowerCase();
		const customAppName: string = customAppNameInput.value.trim().toLowerCase() || catalogAppName;
		const serviceName: string = serviceNameInput.value.trim().toLowerCase();
		const portNumber: string = portNumberInput.value.trim();
		let domainName: string = '?';

		if (catalogAppName) {
			const prefix = buildDomainNamePrefix(catalogAppName, customAppName, serviceName);
			const suffix = (portNumber === '' || portNumber === '80') ? '' : `:${portNumber}`;

			domainName = `${prefix}.svc.cluster.local${suffix}`;
		}

		output.textContent = domainName;

		output.addEventListener('click', function () {
			copyToClipboard(domainName);
			notifyUser('Copied to clipboard!');
		});
	}


	function copyToClipboard(text: string): void {
		const el: HTMLTextAreaElement = document.createElement('textarea');

		el.value = text;

		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
	}


	function notifyUser(message: string): void {
		const notification: HTMLDivElement = document.createElement('div');

		notification.classList.add('notification');

		notification.textContent = message;

		document.body.appendChild(notification);

		setTimeout(function () {
			document.body.removeChild(notification);
		}, notificationTimeout);
	}


	catalogAppNameInput.addEventListener('input', generateDomainName);
	customAppNameInput.addEventListener('input', generateDomainName);
	serviceNameInput.addEventListener('input', generateDomainName);
	portNumberInput.addEventListener('input', generateDomainName);

	// Entry point
	generateDomainName();
});
