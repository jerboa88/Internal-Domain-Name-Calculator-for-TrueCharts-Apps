document.addEventListener('DOMContentLoaded', () => {
	const notificationTimeout = 3000;
	const catalogAppNameInput = document.getElementById('catalogAppName');
	const customAppNameInput = document.getElementById('customAppName');
	const serviceNameInput = document.getElementById('serviceName');
	const portNumberInput = document.getElementById('portNumber');
	const output = document.getElementById('output');


	function buildDomainNamePrefix(catalogAppName, customAppName, serviceName) {
		const customNameContainsCatalogName = customAppName.includes(catalogAppName);

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


	function generateDomainName() {
		const catalogAppName = catalogAppNameInput.value.trim().toLowerCase();
		const customAppName = customAppNameInput.value.trim().toLowerCase() || catalogAppName;
		const serviceName = serviceNameInput.value.trim().toLowerCase();
		const portNumber = portNumberInput.value.trim();
		let domainName = '?';

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


	function copyToClipboard(text) {
		const el = document.createElement('textarea');

		el.value = text;

		document.body.appendChild(el);
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
	}


	function notifyUser(message) {
		const notification = document.createElement('div');

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
