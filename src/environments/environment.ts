// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  redirectUrl: 'http://localhost:4200/auth',
  google: {
    client_id: '867109575877-uaqtvq0rndj28qb6mjitel8o98euu3sm.apps.googleusercontent.com',
    project_id: 'quickstart-1588942886446',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: 'Qb2mpCa2CRAFALCC9wlIhNAA',
    javascript_origins: [
      'http://localhost:4200'
    ],
    api_key: 'AIzaSyAfef1LiilMak_VpI4FBFhdnyPMWhACyrQ',
    scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
    discovery_docs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest']
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
