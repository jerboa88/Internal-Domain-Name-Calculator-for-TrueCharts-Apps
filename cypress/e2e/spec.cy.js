// Check generated domain names against example output from HeavyScript to verify correctness
describe('Domain Name Generator', () => {
	const testCases = [
		// adguard-home.ix-adguard-home.svc.cluster.local                                     10232/TCP
		{
			catalogAppName: 'adguard-home',
			portNumber: 10232,
			expectedDomain: 'adguard-home.ix-adguard-home.svc.cluster.local:10232'
		},
		// adguard-home-dns-crypt.ix-adguard-home.svc.cluster.local                           5443/TCP
		{
			catalogAppName: 'adguard-home',
			serviceName: 'dns-crypt',
			portNumber: 5443,
			expectedDomain: 'adguard-home-dns-crypt.ix-adguard-home.svc.cluster.local:5443'
		},
		// adguard-home-dns-crypt-udp.ix-adguard-home.svc.cluster.local                       5443/UDP
		{
			catalogAppName: 'adguard-home',
			serviceName: 'dns-crypt-udp',
			portNumber: 5443,
			expectedDomain: 'adguard-home-dns-crypt-udp.ix-adguard-home.svc.cluster.local:5443'
		},
		// adguard-home-dns-https.ix-adguard-home.svc.cluster.local                           10234/TCP
		{
			catalogAppName: 'adguard-home',
			serviceName: 'dns-https',
			portNumber: 10234,
			expectedDomain: 'adguard-home-dns-https.ix-adguard-home.svc.cluster.local:10234'
		},
		// adguard-home-dns-https-udp.ix-adguard-home.svc.cluster.local                       10234/UDP
		{
			catalogAppName: 'adguard-home',
			serviceName: 'dns-https-udp',
			portNumber: 10234,
			expectedDomain: 'adguard-home-dns-https-udp.ix-adguard-home.svc.cluster.local:10234'
		},
		// adguard-home-dns-quic-udp-1.ix-adguard-home.svc.cluster.local                      784/UDP,853/UDP,8853/UDP
		{
			catalogAppName: 'adguard-home',
			serviceName: 'dns-quic-udp-1',
			portNumber: 784,
			expectedDomain: 'adguard-home-dns-quic-udp-1.ix-adguard-home.svc.cluster.local:784'
		},
		// adguard-home-dns-tcp.ix-adguard-home.svc.cluster.local                             53/TCP
		{
			catalogAppName: 'adguard-home',
			serviceName: 'dns-tcp',
			portNumber: 53,
			expectedDomain: 'adguard-home-dns-tcp.ix-adguard-home.svc.cluster.local:53'
		},
		// adguard-home-dns-udp.ix-adguard-home.svc.cluster.local                             53/UDP
		{
			catalogAppName: 'adguard-home',
			serviceName: 'dns-udp',
			portNumber: 53,
			expectedDomain: 'adguard-home-dns-udp.ix-adguard-home.svc.cluster.local:53'
		},
		// bazarr.ix-bazarr.svc.cluster.local                                                 6767/TCP
		{
			catalogAppName: 'bazarr',
			portNumber: 6767,
			expectedDomain: 'bazarr.ix-bazarr.svc.cluster.local:6767'
		},
		// bazarr-metrics.ix-bazarr.svc.cluster.local                                         7879/TCP
		{
			catalogAppName: 'bazarr',
			serviceName: 'metrics',
			portNumber: 7879,
			expectedDomain: 'bazarr-metrics.ix-bazarr.svc.cluster.local:7879'
		},
		// cert-manager-certmanager.ix-cert-manager.svc.cluster.local                         9402/TCP
		{
			catalogAppName: 'cert-manager',
			serviceName: 'certmanager',
			portNumber: 9402,
			expectedDomain: 'cert-manager-certmanager.ix-cert-manager.svc.cluster.local:9402'
		},
		// cert-manager-certmanager-webhook.ix-cert-manager.svc.cluster.local                 443/TCP
		{
			catalogAppName: 'cert-manager',
			serviceName: 'certmanager-webhook',
			portNumber: 443,
			expectedDomain: 'cert-manager-certmanager-webhook.ix-cert-manager.svc.cluster.local:443'
		},
		// TODO: The expected domain name for cloudnative-pg follows a different pattern. Figure out what is wrong with this test case
		// cnpg-webhook-service.ix-cloudnative-pg.svc.cluster.local                           443/TCP
		{
			catalogAppName: 'cloudnative-pg',
			serviceName: 'cnpg-webhook-service',
			portNumber: 443,
			expectedDomain: 'cnpg-webhook-service.ix-cloudnative-pg.svc.cluster.local:443'
		},
		// external-service.ix-external-service.svc.cluster.local                             444/TCP
		{
			catalogAppName: 'external-service',
			portNumber: 444,
			expectedDomain: 'external-service.ix-external-service.svc.cluster.local:444'
		},
		// fireflyiii.ix-fireflyiii.svc.cluster.local                                         10082/TCP
		{
			catalogAppName: 'fireflyiii',
			portNumber: 10082,
			expectedDomain: 'fireflyiii.ix-fireflyiii.svc.cluster.local:10082'
		},
		// fireflyiii-cnpg-main-pooler-rw.ix-fireflyiii.svc.cluster.local                     5432/TCP
		{
			catalogAppName: 'fireflyiii',
			serviceName: 'cnpg-main-pooler-rw',
			portNumber: 5432,
			expectedDomain: 'fireflyiii-cnpg-main-pooler-rw.ix-fireflyiii.svc.cluster.local:5432'
		},
		// fireflyiii-cnpg-main-r.ix-fireflyiii.svc.cluster.local                             5432/TCP
		{
			catalogAppName: 'fireflyiii',
			serviceName: 'cnpg-main-r',
			portNumber: 5432,
			expectedDomain: 'fireflyiii-cnpg-main-r.ix-fireflyiii.svc.cluster.local:5432'
		},
		// fireflyiii-cnpg-main-ro.ix-fireflyiii.svc.cluster.local                            5432/TCP
		{
			catalogAppName: 'fireflyiii',
			serviceName: 'cnpg-main-ro',
			portNumber: 5432,
			expectedDomain: 'fireflyiii-cnpg-main-ro.ix-fireflyiii.svc.cluster.local:5432'
		},
		// fireflyiii-cnpg-main-rw.ix-fireflyiii.svc.cluster.local                            5432/TCP
		{
			catalogAppName: 'fireflyiii',
			serviceName: 'cnpg-main-rw',
			portNumber: 5432,
			expectedDomain: 'fireflyiii-cnpg-main-rw.ix-fireflyiii.svc.cluster.local:5432'
		},
		// fireflyiii-redis.ix-fireflyiii.svc.cluster.local                                   6379/TCP
		{
			catalogAppName: 'fireflyiii',
			serviceName: 'redis',
			portNumber: 6379,
			expectedDomain: 'fireflyiii-redis.ix-fireflyiii.svc.cluster.local:6379'
		},
		// fireflyiii-data-importer-custom-app.ix-fireflyiii-data-importer.svc.cluster.local  10083/TCP
		{
			catalogAppName: 'custom-app',
			customAppName: 'fireflyiii-data-importer',
			portNumber: 10083,
			expectedDomain: 'fireflyiii-data-importer-custom-app.ix-fireflyiii-data-importer.svc.cluster.local:10083'
		},
		// homepage.ix-homepage.svc.cluster.local                                             10352/TCP
		{
			catalogAppName: 'homepage',
			portNumber: 10352,
			expectedDomain: 'homepage.ix-homepage.svc.cluster.local:10352'
		},
		// librespeed.ix-librespeed.svc.cluster.local                                         10016/TCP
		{
			catalogAppName: 'librespeed',
			portNumber: 10016,
			expectedDomain: 'librespeed.ix-librespeed.svc.cluster.local:10016'
		},
		// maintainerr-custom-app.ix-maintainerr.svc.cluster.local                            8154/TCP
		{
			catalogAppName: 'custom-app',
			customAppName: 'maintainerr',
			portNumber: 8154,
			expectedDomain: 'maintainerr-custom-app.ix-maintainerr.svc.cluster.local:8154'
		},
		// overseerr.ix-overseerr.svc.cluster.local                                           5055/TCP
		{
			catalogAppName: 'overseerr',
			portNumber: 5055,
			expectedDomain: 'overseerr.ix-overseerr.svc.cluster.local:5055'
		},
		// plex.ix-plex.svc.cluster.local                                                     32400/TCP
		{
			catalogAppName: 'plex',
			portNumber: 32400,
			expectedDomain: 'plex.ix-plex.svc.cluster.local:32400'
		},
		// prowlarr.ix-prowlarr.svc.cluster.local                                             9696/TCP
		{
			catalogAppName: 'prowlarr',
			portNumber: 9696,
			expectedDomain: 'prowlarr.ix-prowlarr.svc.cluster.local:9696'
		},
		// qbittorrent.ix-qbittorrent.svc.cluster.local                                       10095/TCP
		{
			catalogAppName: 'qbittorrent',
			portNumber: 10095,
			expectedDomain: 'qbittorrent.ix-qbittorrent.svc.cluster.local:10095'
		},
		// qbittorrent-gluetun.ix-qbittorrent.svc.cluster.local                               8000/TCP
		{
			catalogAppName: 'qbittorrent',
			serviceName: 'gluetun',
			portNumber: 8000,
			expectedDomain: 'qbittorrent-gluetun.ix-qbittorrent.svc.cluster.local:8000'
		},
		// qbittorrent-torrent.ix-qbittorrent.svc.cluster.local                               6881/TCP,6881/UDP
		{
			catalogAppName: 'qbittorrent',
			serviceName: 'torrent',
			portNumber: 6881,
			expectedDomain: 'qbittorrent-torrent.ix-qbittorrent.svc.cluster.local:6881'
		},
		// qbittorrent-2.ix-qbittorrent-2.svc.cluster.local                               10096/TCP
		{
			catalogAppName: 'qbittorrent-2',
			portNumber: 10096,
			expectedDomain: 'qbittorrent-2.ix-qbittorrent-2.svc.cluster.local:10096'
		},
		// qbittorrent-2-gluetun.ix-qbittorrent-2.svc.cluster.local                       8000/TCP
		{
			catalogAppName: 'qbittorrent-2',
			serviceName: 'gluetun',
			portNumber: 8000,
			expectedDomain: 'qbittorrent-2-gluetun.ix-qbittorrent-2.svc.cluster.local:8000'
		},
		// qbittorrent-2-torrent.ix-qbittorrent-2.svc.cluster.local                       6882/TCP,6882/UDP
		{
			catalogAppName: 'qbittorrent-2',
			serviceName: 'torrent',
			portNumber: 6882,
			expectedDomain: 'qbittorrent-2-torrent.ix-qbittorrent-2.svc.cluster.local:6882'
		},
		// radarr.ix-radarr.svc.cluster.local                                                 7878/TCP
		{
			catalogAppName: 'radarr',
			portNumber: 7878,
			expectedDomain: 'radarr.ix-radarr.svc.cluster.local:7878'
		},
		// sonarr.ix-sonarr.svc.cluster.local                                                 8989/TCP
		{
			catalogAppName: 'sonarr',
			portNumber: 8989,
			expectedDomain: 'sonarr.ix-sonarr.svc.cluster.local:8989'
		},
		// syncthing.ix-syncthing.svc.cluster.local                                           8384/TCP
		{
			catalogAppName: 'syncthing',
			portNumber: 8384,
			expectedDomain: 'syncthing.ix-syncthing.svc.cluster.local:8384'
		},
		// syncthing-discovery.ix-syncthing.svc.cluster.local                                 21027/UDP
		{
			catalogAppName: 'syncthing',
			serviceName: 'discovery',
			portNumber: 21027,
			expectedDomain: 'syncthing-discovery.ix-syncthing.svc.cluster.local:21027'
		},
		// syncthing-listeners.ix-syncthing.svc.cluster.local                                 22000/TCP
		{
			catalogAppName: 'syncthing',
			serviceName: 'listeners',
			portNumber: 22000,
			expectedDomain: 'syncthing-listeners.ix-syncthing.svc.cluster.local:22000'
		},
		// syncthing-listeners-udp.ix-syncthing.svc.cluster.local                             22000/UDP
		{
			catalogAppName: 'syncthing',
			serviceName: 'listeners-udp',
			portNumber: 22000,
			expectedDomain: 'syncthing-listeners-udp.ix-syncthing.svc.cluster.local:22000'
		},
		// tautulli.ix-tautulli.svc.cluster.local                                             8181/TCP
		{
			catalogAppName: 'tautulli',
			portNumber: 8181,
			expectedDomain: 'tautulli.ix-tautulli.svc.cluster.local:8181'
		},
		// traefik.ix-traefik.svc.cluster.local                                               9000/TCP
		{
			catalogAppName: 'traefik',
			portNumber: 9000,
			expectedDomain: 'traefik.ix-traefik.svc.cluster.local:9000'
		},
		// traefik-metrics.ix-traefik.svc.cluster.local                                       9180/TCP
		{
			catalogAppName: 'traefik',
			serviceName: 'metrics',
			portNumber: 9180,
			expectedDomain: 'traefik-metrics.ix-traefik.svc.cluster.local:9180'
		},
		// traefik-tcp.ix-traefik.svc.cluster.local                                           80/TCP,443/TCP
		{
			catalogAppName: 'traefik',
			serviceName: 'tcp',
			portNumber: 80,
			expectedDomain: 'traefik-tcp.ix-traefik.svc.cluster.local'
		},
	];

	testCases.forEach(testCase => {
		it(`Generates domain name correctly for a service with catalog app name '${testCase.catalogAppName}', custom app name '${testCase.customAppName}', service name '${testCase.serviceName}', and port number '${testCase.portNumber}'`, () => {
			cy.visit('/');

			// Enter input values
			cy.get('#catalogAppName').clear().type(testCase.catalogAppName);

			if (testCase.customAppName) {
				cy.get('#customAppName').clear().type(testCase.customAppName);
			}

			if (testCase.serviceName) {
				cy.get('#serviceName').clear().type(testCase.serviceName);
			}

			if (testCase.portNumber) {
				cy.get('#portNumber').clear().type(testCase.portNumber);
			}

			// Check the generated domain name
			cy.get('#output').should('exist').invoke('text').should('eq', testCase.expectedDomain);
		});
	});
});
